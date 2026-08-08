import { Monitor, Smartphone, PenTool, Video, Zap, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Every entry resolves to a real mark in /public/stack.
 * Brand logos come from the vendors' own marks; the handful of entries that
 * are techniques rather than products (REST APIs, RAG, Offline-first …) get a
 * monoline glyph drawn to match the rest of the interface.
 * `wide` is for wordmark logos that would be illegible squeezed into a square.
 */
export interface StackItem {
  name: string;
  icon: string;
  wide?: boolean;
}

const stack = (name: string, file: string, wide = false): StackItem => ({
  name,
  icon: `/stack/${file}`,
  ...(wide ? { wide } : {})
});

export interface Service {
  title: string;
  icon: LucideIcon;
  desc: string;
  /** The problems this capability exists to remove. */
  solves: string[];
  stack: StackItem[];
}

export const services: Service[] = [
  {
    title: 'Web Development',
    icon: Monitor,
    desc: 'Custom websites and web applications built to attract, convert, and support real business growth. Fast, scalable, and tailored to how your business operates.',
    solves: ['Invisible online', 'Low conversions', 'Slow & outdated platforms'],
    stack: [
      stack('React', 'react.svg'),
      stack('Next.js', 'nextjs.svg'),
      stack('TypeScript', 'typescript.svg'),
      stack('JavaScript', 'javascript.svg'),
      stack('PHP', 'php.svg'),
      stack('Laravel', 'laravel.svg'),
      stack('Node.js', 'nodejs.svg'),
      stack('Express', 'express.svg'),
      stack('HTML', 'html.svg'),
      stack('CSS', 'css.svg'),
      stack('Tailwind CSS', 'tailwind.svg'),
      stack('SQL', 'sql.svg'),
      stack('PostgreSQL', 'postgresql.svg'),
      stack('MySQL', 'mysql.svg'),
      stack('Supabase', 'supabase.svg'),
      stack('Firebase', 'firebase.svg'),
      stack('REST APIs', 'rest-api.svg'),
      stack('Git', 'git.svg')
    ]
  },
  {
    title: 'Software Development',
    icon: Smartphone,
    desc: 'Custom mobile and desktop applications that simplify operations, improve productivity, and scale with your business.',
    solves: ['Manual processes', 'Disconnected workflows', 'Generic software'],
    stack: [
      stack('Flutter', 'flutter.svg'),
      stack('Dart', 'dart.svg'),
      stack('Android', 'android.svg'),
      stack('Kotlin', 'kotlin.svg'),
      stack('Java', 'java.svg'),
      stack('Firebase', 'firebase.svg'),
      stack('SQLite', 'sqlite.svg'),
      stack('Supabase', 'supabase.svg'),
      stack('REST APIs', 'rest-api.svg'),
      stack('Offline-first', 'offline-first.svg'),
      stack('Push Notifications', 'push-notifications.svg'),
      stack('Play Store', 'playstore.svg')
    ]
  },
  {
    title: 'Visual Design',
    icon: PenTool,
    desc: 'Brand identities and marketing assets designed to communicate clearly, build trust, and leave lasting impressions.',
    solves: ['Weak branding', 'Poor first impressions', 'Inconsistent visual identity'],
    stack: [
      stack('Illustrator', 'illustrator.svg'),
      stack('Photoshop', 'photoshop.svg'),
      stack('CorelDRAW', 'coreldraw.svg'),
      stack('Canva', 'canva.svg'),
      stack('Affinity Designer', 'affinity-designer.svg'),
      stack('Figma', 'figma.svg'),
      stack('PixelLab', 'pixellab.png')
    ]
  },
  {
    title: 'Video Production',
    icon: Video,
    desc: 'Purpose-driven video editing that captures attention, tells your story, and keeps audiences engaged.',
    solves: ['Low engagement', 'Weak storytelling', 'Content that gets ignored'],
    stack: [
      stack('Premiere Pro', 'premiere-pro.svg'),
      stack('DaVinci Resolve', 'davinci-resolve.svg'),
      stack('After Effects', 'after-effects.svg'),
      stack('CapCut', 'capcut.svg'),
      stack('Filmora', 'filmora.svg'),
      stack('Audition', 'audition.svg'),
      stack('Kdenlive', 'kdenlive.svg')
    ]
  },
  {
    title: 'Intelligent Automation',
    icon: Zap,
    desc: 'Connected systems that automate repetitive work, reduce errors, and keep your business running efficiently.',
    solves: ['Repetitive tasks', 'Human error', 'Time-consuming workflows'],
    stack: [
      stack('n8n', 'n8n.svg'),
      stack('Make', 'make.svg'),
      stack('Zapier', 'zapier.svg'),
      stack('Webhooks', 'webhooks.svg'),
      stack('M-Pesa API', 'mpesa.svg', true),
      stack('WhatsApp API', 'whatsapp.svg'),
      stack('Meta API', 'meta.svg'),
      stack('Google Workspace', 'google-workspace.svg'),
      stack('Airtable', 'airtable.svg'),
      stack('Supabase', 'supabase.svg')
    ]
  },
  {
    title: 'Applied AI',
    icon: Brain,
    desc: 'Practical AI solutions that enhance products, automate workflows, and solve real business problems.',
    solves: [
      'Repetitive knowledge work',
      'Slow decision-making',
      'AI ideas that never ship'
    ],
    stack: [
      stack('OpenAI', 'openai.svg'),
      stack('Claude', 'claude.svg'),
      stack('Gemini', 'gemini.svg'),
      stack('DeepSeek', 'deepseek.svg'),
      stack('OpenRouter', 'openrouter.svg'),
      stack('LangChain', 'langchain.svg'),
      stack('MCP', 'mcp.svg'),
      stack('Prompt Engineering', 'prompt-engineering.svg'),
      stack('AI Agents', 'ai-agents.svg'),
      stack('RAG', 'rag.svg'),
      stack('Function Calling', 'function-calling.svg'),
      stack('APIs', 'apis.svg')
    ]
  }
];
