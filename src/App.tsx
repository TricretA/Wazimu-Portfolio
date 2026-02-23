import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Mail, Send, CheckCircle2, Monitor, Smartphone, PenTool, Video, Zap, Brain, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const solvedProblems = [
  {
    title: "1. KUCCPS Course Checker",
    problem: "Students struggled to understand KUCCPS placement options. The official information was complex, static, and overwhelming. Many made blind course decisions without clarity on qualifications, competitiveness, or real-world implications.",
    solution: "Built an intelligent course-checking system that analyzes grades, explains eligibility clearly, and provides structured, simplified feedback. Added guided explanations and downloadable results to reduce confusion and improve decision-making.",
    link: "https://kuccpscoursechecker.co.ke",
    linkText: "KUCCPS Course Checker"
  },
  {
    title: "2. Bingwa Posters",
    problem: "Agents and small businesses needed promotional posters constantly, but design was slow, inconsistent, and dependent on designers. This delayed marketing and reduced agility.",
    solution: "Built an automated poster-generation system where agents can instantly generate branded promotional posters using structured templates. The system removes dependency, ensures brand consistency, and speeds up marketing execution.",
    link: "https://bingwaposters.vercel.app",
    linkText: "Bingwa Posters"
  },
  {
    title: "3. SciDraft",
    problem: "Students and institutions struggled to structure scientific lab reports properly. Manual formatting caused inconsistency, time waste, and academic errors.",
    solution: "Developed an AI-powered lab report system that converts structured input into academically formatted drafts. It enforces logical structure, standard formatting, and reduces repetitive academic writing friction.",
    link: "https://scidraft.vercel.app",
    linkText: "SciDraft"
  },
  {
    title: "4. Compassion PDF System",
    problem: "Child Development Centers manually tracked weekly contributions. Balances were inaccurate, notifications were inconsistent, and administrators spent excessive time managing records.",
    solution: "Built a structured digital contribution system that automates balance tracking, records payments accurately, and enables structured notifications. The system reduces manual errors and improves financial transparency.",
    link: null,
    linkText: null
  },
  {
    title: "5. White Barn (Luxury Scents & Home Accents – New York)",
    problem: "A premium physical store selling luxurious scents and curated home accents had zero online presence. Customers searching online couldn’t find them. High-end branding existed offline, but digitally they were invisible — quietly losing potential buyers.",
    solution: "Built a refined, conversion-focused website that reflects the brand’s elegance and allows customers to discover products, explore collections, and connect directly. The system ensured they no longer lost online traffic and could convert interest into sales beyond foot traffic.",
    link: "https://white-barn.netlify.app",
    linkText: "White Barn"
  },
  {
    title: "6. Bangin Hair BK (Salon – New York)",
    problem: "A salon known for masterful cuts and transformative color had strong word-of-mouth reputation but no digital presence. New clients couldn’t preview services or validate credibility online.",
    solution: "Created a clean, visually expressive website showcasing services, style quality, and brand personality. The system positioned the salon professionally online, making discovery, trust-building, and client conversion seamless.",
    link: "https://banginhairbk.netlify.app",
    linkText: "Bangin Hair BK"
  },
  {
    title: "7. Morning Glory Restaurant (Australia)",
    problem: "A restaurant with strong local reputation and unforgettable cuisine had no website. Visitors and tourists searching online had no official reference point — losing reservation and walk-in opportunities.",
    solution: "Developed a modern, mobile-first website presenting the menu, ambiance, and contact details clearly. The system ensures customers can discover, evaluate, and plan visits without friction.",
    link: "https://morninggloryrestaurant.netlify.app",
    linkText: "Morning Glory Restaurant"
  },
  {
    title: "8. Polyclinique (Hospital – Tunisia)",
    problem: "A large hospital serving Hammam-Lif since 2012 lacked a structured digital interface. Patients needed reliable access to information about services, departments, and care without inconvenience.",
    solution: "Built a structured medical website prioritizing clarity, trust, and accessibility. The system organizes medical services and essential information clearly, ensuring patients can navigate care confidently.",
    link: "https://polyclinique.netlify.app",
    linkText: "Polyclinique"
  },
  {
    title: "9. Garden Specialist Hospital (Nairobi)",
    problem: "A specialized healthcare provider required a digital platform reflecting excellence and professionalism. Without a structured website, patients lacked a centralized source of medical information.",
    solution: "Designed and implemented a clear, professional healthcare website that communicates specialization, trust, and authority while guiding patients efficiently to relevant services.",
    link: "https://gardenspecialist.netlify.app",
    linkText: "Garden Specialist Hospital"
  },
  {
    title: "10. Lee Funeral Home (Nairobi)",
    problem: "A long-established, premium funeral home had a non-functional WordPress website. In moments when families needed immediate guidance, the digital system failed them.",
    solution: "Rebuilt and stabilized the website infrastructure, adding structured service pathways such as Immediate Support, Plan Ahead, Repatriation, and Cremation. The new system ensures families can access help quickly and clearly during critical moments.",
    link: "https://leefuneralhome.netlify.app",
    linkText: "Lee Funeral Home"
  },
  {
    title: "11. TriCre8 Workflow (Email Automation System)",
    problem: "Daily unread emails required manual review, consuming time and causing important messages to be overlooked.",
    solution: "Engineered an automated workflow that scans unread emails daily, summarizes key points, and delivers prioritized insights directly to WhatsApp. The system eliminates manual sorting and ensures no critical information is missed.",
    link: "https://wa.me/254727921038",
    linkText: "TriCre8 Workflow"
  },
  {
    title: "12. Lorem Productions (Film Production Company)",
    problem: "A filming company experienced low social media engagement due to weak editing structure and inconsistent video quality.",
    solution: "Re-edited and restructured their visual content professionally, enhancing pacing, clarity, and storytelling. The improved production quality increased audience engagement and strengthened brand perception online.",
    link: "https://youtu.be/lGw6ix1Mydk?si=uzJjdWEUs8vOoqtf",
    linkText: "Lorem Productions"
  },
    {
    title: "13. Tech Haven",
    problem: "A professional high-end cyber cafe lacked professionalism because of lack of brand visibility and customer service.",
    solution: "Enhanced brand visibility through designing a uniques remarkable logo. This improved their brand awareness and strengthened customer loyalty.",
    link: "https://drive.google.com/file/d/1GdAphvWmDZHAMyx5yJn13YKZ8NyE73pT/",
    linkText: "Tech Haven"
  },
      {
    title: "14. Skylink Hotel",
    problem: "A well known remarkable Hotel in Kisii, lacked a well designed Menu to showcase their food and services.",
    solution: "Designed a visually appealing and user-friendly menu that highlights the hotel's unique offerings. This made their customers well satisfied, allowing guests to quickly find the items they are interested in.",
    link: "https://drive.google.com/file/d/1qAhlf3zXhbb40ijD45fiTJrHvUs8nEuk/",
    linkText: "Skylink Hotel"
  }
];

export default function App() {
  const [businessChat, setBusinessChat] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [businessInput, setBusinessInput] = useState('');
  const [isBusinessLoading, setIsBusinessLoading] = useState(false);
  const [chatStage, setChatStage] = useState<'initial' | 'chatting'>('initial');
  const [isProblemsModalOpen, setIsProblemsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [clientId, setClientId] = useState('');
  const [proposalVersion, setProposalVersion] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState<'idle' | 'approved' | 'rejected'>('idle');
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [webhookMessage, setWebhookMessage] = useState('');
  const [lastAiStatus, setLastAiStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const businessMessagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    businessMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [businessChat, isBusinessLoading]);

  useEffect(() => {
    const storedClientId = localStorage.getItem('wazimu_client_id');
    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      const generatedId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem('wazimu_client_id', generatedId);
      setClientId(generatedId);
    }

    const storedVersion = Number(localStorage.getItem('wazimu_proposal_version') || '1');
    setProposalVersion(Number.isFinite(storedVersion) && storedVersion > 0 ? storedVersion : 1);
  }, []);

  const handleBusinessSubmit = async () => {
    if (!businessInput.trim()) return;
    
    let activeClientId = clientId;
    if (!activeClientId) {
      activeClientId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem('wazimu_client_id', activeClientId);
      setClientId(activeClientId);
    }

    const userMsg = businessInput;
    setBusinessInput('');
    setApprovalStatus('idle');
    setWebhookStatus('idle');
    setWebhookMessage('');
    setLastAiStatus('idle');
    const newMessages = [...businessChat, { role: 'user' as const, text: userMsg }];
    setBusinessChat(newMessages);
    setIsBusinessLoading(true);

    if (chatStage === 'initial') {
      setChatStage('chatting');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: activeClientId,
          messages: newMessages
        })
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data?.error || "Sorry, I'm having trouble connecting right now.";
        setBusinessChat(prev => [...prev, { role: 'ai', text: errorMessage }]);
        setLastAiStatus('error');
      } else {
        const responseText = data?.text || "";
        setBusinessChat(prev => [...prev, { role: 'ai', text: responseText }]);
        setLastAiStatus('success');
      }
    } catch (error) {
      setBusinessChat(prev => [...prev, { role: 'ai', text: "Server unreachable. Start npm run server and try again." }]);
      setLastAiStatus('error');
    } finally {
      setIsBusinessLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('wazimucreations@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const latestAiMessage = [...businessChat].reverse().find(msg => msg.role === 'ai')?.text || '';
  const approvalLabel = approvalStatus === 'approved' ? 'Approved' : approvalStatus === 'rejected' ? 'Rejected' : 'Pending';
  const approvalClass = approvalStatus === 'approved'
    ? 'bg-green-100 text-green-700'
    : approvalStatus === 'rejected'
    ? 'bg-red-100 text-red-700'
    : 'bg-gray-100 text-gray-600';
  const finalProposalSections = [
    'Your Core Problem',
    'How This Is Affecting You',
    'What Needs to Be Built or Fixed',
    'Proposed Plan',
    'Timeline',
    'Estimated Investment',
    'What I Would Need From You',
    'Next Step'
  ];
  const finalSectionMatches = finalProposalSections.filter(section => latestAiMessage.includes(section)).length;
  const isFinalProposal = latestAiMessage.trim().length > 0 && finalSectionMatches >= 5;
  const shouldShowApproval = lastAiStatus === 'success' && isFinalProposal;

  const handleApproveProposal = async () => {
    if (!latestAiMessage.trim() || approvalStatus === 'approved') return;
    const confirmed = window.confirm('Approve this proposal and send it to Wazimu Creator?');
    if (!confirmed) return;

    setWebhookStatus('sending');
    setWebhookMessage('');

    try {
      const response = await fetch('/api/proposal/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          proposalText: latestAiMessage,
          proposalVersion
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setWebhookStatus('error');
      setWebhookMessage(data?.error || 'We could not finalize the approval. Please try again.');
        return;
      }

      setApprovalStatus('approved');
      setWebhookStatus('success');
    setWebhookMessage('Proposal sent successfully. You will be reached in a few.');
      const nextVersion = proposalVersion + 1;
      setProposalVersion(nextVersion);
      localStorage.setItem('wazimu_proposal_version', String(nextVersion));
    } catch (error) {
      setWebhookStatus('error');
    setWebhookMessage('We could not finalize the approval. Please try again.');
    }
  };

  const handleRejectProposal = () => {
    if (!latestAiMessage.trim()) return;
    const confirmed = window.confirm('Reject this proposal?');
    if (!confirmed) return;
    setApprovalStatus('rejected');
    setWebhookStatus('idle');
    setWebhookMessage('');
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] p-4 md:p-8 font-sans text-[#1a1a1a] relative">
      <div className="max-w-[1200px] mx-auto rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
        
        {/* 1. Hero Section */}
        <div className="bg-white">
          <div className="bg-[#F4F4F5] rounded-b-[2.5rem] md:rounded-b-[3rem] pt-8 pb-20 px-6 md:px-16">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-16 md:mb-24 w-full">
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
                <span className="text-[11px] sm:text-xs md:text-sm font-medium truncate max-w-[150px] sm:max-w-none">wazimucreations@gmail.com</span>
                <div className="flex gap-2">
                  <button onClick={handleCopyEmail} className="px-3 md:px-4 py-1.5 bg-white rounded-full text-[10px] sm:text-xs font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer w-[60px] md:w-[68px]">
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href="https://flowcv.com/resume/7fwcwmo01w70"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 md:px-4 py-1.5 bg-white rounded-full text-[10px] sm:text-xs font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    CV
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-medium">
                <a href="https://www.linkedin.com/in/tricreta" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">LinkedIn</a>
                <span className="text-gray-300">/</span>
                <a href="https://x.com/tricreta" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">X</a>
                <span className="text-gray-300">/</span>
                <a href="https://instagram.com/tricreta" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Instagram</a>
              </div>
            </header>

            {/* Hero Content */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="relative mb-10">
                <img 
                  src="/wzm.gif" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#F4F4F5]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 -right-28 bg-white px-4 py-2 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                  Wazimu Creator <span className="text-sm">👋</span>
                </div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.05] mb-12"
              >
                Building systems<br className="hidden sm:block" />that quietly make businesses <br className="hidden sm:block" />work.
              </motion.h1>
              <button 
                onClick={() => setIsProblemsModalOpen(true)}
                className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors cursor-pointer"
              >
                Problems Solved <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. What's Broken Section */}
        <div className="bg-[#F4F4F5]">
          <div className="bg-white rounded-b-[2.5rem] md:rounded-b-[3rem] py-16 md:py-24 px-6 md:px-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 text-center">What's broken in your business?</h2>
              
              <div className="bg-[#F4F4F5] rounded-3xl p-6 md:p-8 shadow-inner">
                {chatStage === 'initial' ? (
                  <div className="flex flex-col gap-4">
                    <textarea 
                      value={businessInput}
                      onChange={(e) => setBusinessInput(e.target.value)}
                      placeholder="Tell me what's not working, what's slowing you down, or what you wish was automated..."
                      className="w-full bg-white border-none rounded-2xl p-4 min-h-[120px] resize-none focus:ring-2 focus:ring-black outline-none text-sm"
                    />
                    <button 
                      onClick={handleBusinessSubmit}
                      disabled={!businessInput.trim() || isBusinessLoading}
                      className="self-end bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isBusinessLoading ? 'Thinking...' : 'Start Fixing'} <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-4">
                      {businessChat.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#1a1a1a] text-white rounded-tr-sm' : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isBusinessLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white text-gray-500 p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      )}
                      <div ref={businessMessagesEndRef} />
                    </div>

                    {chatStage === 'chatting' && (
                      <div className="flex flex-col gap-4 mt-2">
                        <div className="flex gap-2">
                          <textarea 
                            value={businessInput}
                            onChange={(e) => setBusinessInput(e.target.value)}
                            placeholder="Type your answer..."
                            rows={2}
                            className="flex-1 bg-white border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-black outline-none resize-none"
                          />
                          <button 
                            onClick={handleBusinessSubmit}
                            disabled={isBusinessLoading || !businessInput.trim()}
                            className="bg-[#1a1a1a] text-white p-3 rounded-full disabled:opacity-50 hover:bg-black transition-colors cursor-pointer flex items-center justify-center w-12 h-12"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                        {shouldShowApproval && (
                          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                              <h3 className="text-sm font-semibold text-gray-900">Final Proposal</h3>
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${approvalClass}`}>{approvalLabel}</span>
                            </div>
                            <div className="bg-[#F4F4F5] rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap">
                              {latestAiMessage}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                              <button
                                onClick={handleApproveProposal}
                                disabled={approvalStatus === 'approved' || webhookStatus === 'sending'}
                                className="flex-1 bg-[#1a1a1a] text-white px-4 py-3 rounded-full text-sm font-medium disabled:opacity-50 hover:bg-black transition-colors"
                              >
                                {webhookStatus === 'sending' ? 'Sending...' : 'Approve Proposal'}
                              </button>
                              <button
                                onClick={handleRejectProposal}
                                disabled={approvalStatus === 'rejected' || webhookStatus === 'sending'}
                                className="flex-1 bg-white text-gray-700 px-4 py-3 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                              >
                                Reject Proposal
                              </button>
                            </div>
                            {webhookStatus !== 'idle' && (
                              <div className={`mt-3 text-xs font-medium ${webhookStatus === 'success' ? 'text-green-700' : webhookStatus === 'error' ? 'text-red-700' : 'text-gray-600'}`}>
                                {webhookMessage || (webhookStatus === 'sending' ? 'Finalizing your approval...' : '')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Services Section */}
        <div className="bg-[#F4F4F5]">
          <div className="bg-[#F4F4F5] py-20 md:py-24 px-6 md:px-16">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-2xl md:text-[1.75rem] font-medium mb-12 md:mb-16 text-[#1a1a1a] leading-snug">
                Designing and implementing systems<br className="hidden md:block" />that make businesses work better.
              </h2>
              <div className="relative flex justify-center items-center max-w-3xl mx-auto">
                <div className="absolute w-full h-px bg-gray-200"></div>
                <span className="bg-white px-5 py-2 rounded-full text-xs font-medium relative z-10 shadow-sm text-gray-600">Services</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {/* Service 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <Monitor strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Web Systems</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Building trust-first digital platforms that convert attention into action. Websites that clarify, guide, and quietly turn visitors into clients.</p>
              </motion.div>
              {/* Service 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <Smartphone strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Application Systems</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Designing focused mobile applications that simplify how businesses operate. Tools that reduce manual effort and centralize operations.</p>
              </motion.div>
              {/* Service 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <PenTool strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Strategic Design</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Creating visual systems that remove confusion and build credibility. Design that communicates authority, not decoration.</p>
              </motion.div>
              {/* Service 4 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <Video strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Communication Editing</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Crafting content that speaks clearly and moves people to act. Video and media that sharpen your message, not dilute it.</p>
              </motion.div>
              {/* Service 5 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <Zap strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Intelligent Automation</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Eliminating repetitive tasks with structured, self-running systems. Automation that saves time, reduces error, and scales effortlessly.</p>
              </motion.div>
              {/* Service 6 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-5 text-gray-700">
                  <Brain strokeWidth={1.5} className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-3 text-sm">Applied Artificial Intelligence</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Turning AI into practical business systems, not just conversations. Designing AI-driven workflows, assistants, and automations that solve real operational problems and increase efficiency.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 4. Past Clients Section */}
        <div className="bg-[#F4F4F5]">
          <div className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] pt-16 md:pt-20 pb-8 px-6 md:px-16 overflow-hidden">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8 md:mb-10">
                Past Clients
              </h2>
            </div>

            {/* Marquee */}
            <div className="relative flex overflow-x-hidden mb-20 md:mb-24 group">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-4 md:gap-6 py-4">
                {[
                  "Kuccps Course checker",
                  "Skywaves Scope",
                  "Tech Haven",
                  "Lorem Prints",
                  "Omosh 1 Hour",
                  "Lwanda CDC",
                  "Erika Scott NYC",
                  "Bingwa Agents"
                ].map((client, idx) => (
                  <div 
                    key={idx} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-800 shadow-sm whitespace-nowrap"
                  >
                    {client}
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-4 md:gap-6 py-4 ml-4 md:ml-6">
                {[
                  "Kuccps Course checker",
                  "Skywaves Scope",
                  "Tech Haven",
                  "Lorem Prints",
                  "Omosh 1 Hour",
                  "Lwanda CDC",
                  "Erika Scott NYC",
                  "Bingwa Agents"
                ].map((client, idx) => (
                  <div 
                    key={`dup-${idx}`} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-800 shadow-sm whitespace-nowrap"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>

            {/* Reverse Marquee */}
            <div className="relative flex overflow-x-hidden mb-20 md:mb-24 group">
              <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-4 md:gap-6 py-4">
                {[
                  "Tricret",
                  "Lorem Productions",
                  "White Barn",
                  "Bangin Hair",
                  "Polyclinique",
                  "Lee Funeral Home"
                ].map((client, idx) => (
                  <div 
                    key={idx} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-800 shadow-sm whitespace-nowrap"
                  >
                    {client}
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 animate-marquee2-reverse whitespace-nowrap flex items-center gap-4 md:gap-6 py-4 ml-4 md:ml-6">
                {[
                  "Tricret",
                  "Lorem Productions",
                  "White Barn",
                  "Bangin Hair",
                  "Polyclinique",
                  "Lee Funeral Home"
                ].map((client, idx) => (
                  <div 
                    key={`dup-rev-${idx}`} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-800 shadow-sm whitespace-nowrap"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">© 2026 All rights reserved.</p>
              <div className="flex items-center gap-3 md:gap-4 text-xs font-medium text-gray-500">
                <a href="https://wa.me/254790295408?text=Hello%2C%20I%27m%20reaching%20out%20because%20my%20business%20is%20experiencing%20digital%20challenges%20and%20I%20would%20like%20to%20discuss%20how%20we%20can%20fix%20them.%20I%27m%20ready%20to%20implement%20a%20proper%20solution." target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Whatsapp</a>
                <span className="text-gray-300">/</span>
                <a href="https://discord.gg/2ayU7ZdR" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Discord</a>
                <span className="text-gray-300">/</span>
                <a href="https://github.com/TricretA" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
              </div>
            </footer>
          </div>
        </div>

        {/* Problems Solved Modal */}
        <AnimatePresence>
          {isProblemsModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsProblemsModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F4F4F5] w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="bg-white p-6 flex justify-between items-center border-b border-gray-100">
                  <h2 className="text-2xl font-semibold tracking-tight">Problems Solved</h2>
                  <button 
                    onClick={() => setIsProblemsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solvedProblems.map((project, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">{project.title}</h3>
                        
                        <div className="mb-4 flex-1">
                          <div className="bg-red-50/50 p-4 rounded-xl mb-3 border border-red-100/50">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5 block">Problem</span>
                            <p className="text-sm text-red-900/80 leading-relaxed">{project.problem}</p>
                          </div>
                          
                          <div className="bg-green-50/50 p-4 rounded-xl border border-green-100/50">
                            <span className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1.5 block">Solution</span>
                            <p className="text-sm text-green-900/80 leading-relaxed">{project.solution}</p>
                          </div>
                        </div>

                        {project.link && (
                          <div className="mt-auto pt-4 border-t border-gray-50">
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            >
                              {project.linkText} <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
