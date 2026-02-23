import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is required');
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: '2mb' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.join(__dirname, 'local-storage.json');

const USER_LIMIT = 10;
const GLOBAL_LIMIT = 40;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `You are a calm, highly competent digital problem-solver who thinks in systems, not services.

Be professional and concise. Avoid small talk. Do not be overly conversational.

Your goal is to gather just enough information and then deliver a structured proposal.
Ask exactly 5 clarifying questions, grouped in a single message.
Your 5 questions must include the client location (city/country) so you will know preferred currency.
After the user answers those questions, generate the final proposal immediately in the required format.
Do not exceed 5 AI messages before the final proposal.

Final structured output
When you generate the proposal, use these sections:

Your Core Problem
A clear, concise description of what is not working.

How This Is Affecting You
Practical impact on revenue, growth, trust, or efficiency.

What Needs to Be Built or Fixed
Description of the digital system required (no tools mentioned).

Proposed Plan
Step-by-step approach in plain language.

Timeline
Realistic timeframe (e.g., 2–3 weeks, 4–6 weeks) or based on the client's needs.

Estimated Investment
Give one exact price with currency based on the client location. No ranges. No estimates.

Next Step
Calmly state:
“This is exactly the type of work I implement properly.”

Tone & limits
Never be salesy.
Never exaggerate.
Never pressure.
Speak like a human on a serious strategy call.
Keep each response concise and thoughtful.
Do not exceed 150 words per turn unless generating the final structured summary.

Before sending the summary, the user must enter their email and or phone number, to be contacted later. Then the summary and their contact details to be sent to me via email.`;

const getUtcDateKey = () => new Date().toISOString().slice(0, 10);

const getResetTimestamp = () => {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.floor(next.getTime() / 1000);
};

type StorageState = {
  rateLimits: Record<string, { user: Record<string, number>; global: number }>;
  webhookLogs: Array<{
    timestamp: string;
    clientId: string;
    proposalVersion: number;
    status: string;
    attempt: number;
    responseCode: number | null;
    errorMessage: string | null;
    payload: object;
  }>;
};

const loadStorage = (): StorageState => {
  if (!fs.existsSync(storagePath)) {
    return { rateLimits: {}, webhookLogs: [] };
  }
  try {
    const raw = fs.readFileSync(storagePath, 'utf-8');
    const parsed = JSON.parse(raw) as StorageState;
    return {
      rateLimits: parsed.rateLimits || {},
      webhookLogs: parsed.webhookLogs || []
    };
  } catch {
    return { rateLimits: {}, webhookLogs: [] };
  }
};

const saveStorage = (state: StorageState) => {
  fs.writeFileSync(storagePath, JSON.stringify(state, null, 2));
};

const getCount = (dateKey: string, scope: 'user' | 'global', key: string) => {
  const state = loadStorage();
  const dateBucket = state.rateLimits[dateKey] || { user: {}, global: 0 };
  if (scope === 'global') {
    return dateBucket.global || 0;
  }
  return dateBucket.user[key] || 0;
};

const setCount = (dateKey: string, scope: 'user' | 'global', key: string, count: number) => {
  const state = loadStorage();
  const dateBucket = state.rateLimits[dateKey] || { user: {}, global: 0 };
  if (scope === 'global') {
    dateBucket.global = count;
  } else {
    dateBucket.user[key] = count;
  }
  state.rateLimits[dateKey] = dateBucket;
  saveStorage(state);
};

const checkAndIncrement = (clientId: string) => {
  const dateKey = getUtcDateKey();
  const resetTimestamp = getResetTimestamp();
  const userCount = getCount(dateKey, 'user', clientId);
  const globalCount = getCount(dateKey, 'global', 'all');
  const userRemaining = USER_LIMIT - userCount;
  const globalRemaining = GLOBAL_LIMIT - globalCount;
  const remainingBefore = Math.max(0, Math.min(userRemaining, globalRemaining));

  if (userRemaining <= 0 || globalRemaining <= 0) {
    return { allowed: false, remaining: remainingBefore, resetTimestamp };
  }

  const nextUserCount = userCount + 1;
  const nextGlobalCount = globalCount + 1;
  setCount(dateKey, 'user', clientId, nextUserCount);
  setCount(dateKey, 'global', 'all', nextGlobalCount);
  const remainingAfter = Math.max(0, Math.min(USER_LIMIT - nextUserCount, GLOBAL_LIMIT - nextGlobalCount));

  return { allowed: true, remaining: remainingAfter, resetTimestamp };
};

const setRateHeaders = (res: express.Response, remaining: number, resetTimestamp: number) => {
  res.set('X-RateLimit-Limit', String(USER_LIMIT));
  res.set('X-RateLimit-Remaining', String(remaining));
  res.set('X-RateLimit-Reset', String(resetTimestamp));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const logWebhookAttempt = (payload: object, clientId: string, proposalVersion: number, status: string, attempt: number, responseCode: number | null, errorMessage: string | null) => {
  const state = loadStorage();
  state.webhookLogs.push({
    timestamp: new Date().toISOString(),
    clientId,
    proposalVersion,
    status,
    attempt,
    responseCode,
    errorMessage,
    payload
  });
  saveStorage(state);
};

const sendWebhookWithRetry = async (url: string, payload: object, clientId: string, proposalVersion: number) => {
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        logWebhookAttempt(payload, clientId, proposalVersion, 'success', attempt, response.status, null);
        return;
      }

      lastError = `Webhook responded with status ${response.status}`;
      logWebhookAttempt(payload, clientId, proposalVersion, 'failure', attempt, response.status, lastError);
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Webhook request failed';
      logWebhookAttempt(payload, clientId, proposalVersion, 'failure', attempt, null, lastError);
    }

    if (attempt < 3) {
      await delay(500 * attempt);
    }
  }

  throw new Error(lastError || 'Webhook delivery failed');
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatProposalHtml = (text: string) => {
  const sections = [
    'Your Core Problem',
    'How This Is Affecting You',
    'What Needs to Be Built or Fixed',
    'Proposed Plan',
    'Timeline',
    'Estimated Investment',
    'Next Step'
  ];
  const content: Record<string, string[]> = {};
  let currentSection = '';
  text.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }
    const matchedSection = sections.find(section => section.toLowerCase() === trimmed.toLowerCase());
    if (matchedSection) {
      currentSection = matchedSection;
      if (!content[currentSection]) {
        content[currentSection] = [];
      }
      return;
    }
    const target = currentSection || 'Summary';
    if (!content[target]) {
      content[target] = [];
    }
    content[target].push(trimmed);
  });

  const sectionHtml = sections
    .filter(section => content[section]?.length)
    .map(section => {
      const body = escapeHtml(content[section].join('\n')).replace(/\n/g, '<br />');
      return `<section><h2>${escapeHtml(section)}</h2><p>${body}</p></section>`;
    })
    .join('');

  const summaryHtml = content['Summary']
    ? `<section><h2>Summary</h2><p>${escapeHtml(content['Summary'].join('\n')).replace(/\n/g, '<br />')}</p></section>`
    : '';

  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Wazimu Proposal</title><style>body{font-family:Inter,Arial,sans-serif;background:#f5f5f5;color:#111;margin:0;padding:24px}main{max-width:760px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 8px 24px rgba(0,0,0,0.06)}h1{font-size:24px;margin:0 0 16px}h2{font-size:16px;margin:20px 0 8px}p{line-height:1.6;margin:0}</style></head><body><main><h1>Client Proposal</h1>${summaryHtml}${sectionHtml}</main></body></html>`;
};

app.post('/api/chat', async (req, res) => {
  const { clientId, messages } = req.body as { clientId?: string; messages?: { role: 'user' | 'ai'; text: string }[] };

   if (!clientId || !Array.isArray(messages) || messages.length === 0) {
     setRateHeaders(res, 0, getResetTimestamp());
     return res.status(400).json({ error: 'Invalid request payload.' });
   }
  
   const { allowed, remaining, resetTimestamp } = checkAndIncrement(clientId);
   setRateHeaders(res, remaining, resetTimestamp);
  
   if (!allowed) {
     return res.status(429).json({ error: 'Rate limit exceeded. Try again after reset.' });
   }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server missing Gemini API key.' });
  }

  try {
    const contents = messages.map(message => ({
      role: message.role === 'ai' ? 'model' : 'user',
      parts: [{ text: message.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT
      }
    });

    return res.json({ text: response.text || '' });
  } catch (error) {
    return res.status(500).json({ error: 'AI response failed. Please try again.' });
  }
});

app.post('/api/proposal/approve', async (req, res) => {
  const { clientId, proposalText, proposalVersion } = req.body as {
    clientId?: string;
    proposalText?: string;
    proposalVersion?: number;
  };

  if (!clientId || !proposalText || !proposalVersion) {
    return res.status(400).json({ error: 'Invalid proposal payload.' });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK || process.env.WEBHOOK_URL || process.env.WEBHOOK;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook URL is not configured.' });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    clientId,
    proposalVersion,
    proposal: proposalText,
    proposalHtml: formatProposalHtml(proposalText)
  };

  try {
    await sendWebhookWithRetry(webhookUrl, payload, clientId, proposalVersion);
    return res.json({ status: 'ok' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Webhook delivery failed';
    return res.status(502).json({ error: errorMessage });
  }
});

const port = Number(process.env.PORT) || 3001;
app.listen(port);
