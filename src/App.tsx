import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Mail, Send, CheckCircle2, Monitor, Smartphone, PenTool, Video, Zap, Brain, X, Linkedin, Twitter, Instagram, Search } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { FadeUp, StaggerContainer, StaggerItem } from './components/Animations';
import Thoughts from './components/Thoughts';

export type ServiceCategory = 'All' | 'Websites' | 'Mobile Apps' | 'Design' | 'Automation' | 'Video Editing' | 'AI';

interface SolvedProblem {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  link: string | null;
  linkText: string | null;
  category: ServiceCategory;
}

const solvedProblems: SolvedProblem[] = [
  {
    title: "KUCCPS Course Checker",
    problem: "Students struggled to understand KUCCPS placement options. The official information was complex, static, and overwhelming. Many made blind course decisions without clarity on qualifications, competitiveness, or real-world implications.",
    solution: "Built an intelligent course-checking system that analyzes grades, explains eligibility clearly, and provides structured, simplified feedback. Added guided explanations and downloadable results to reduce confusion and improve decision-making.",
    outcome: "Reduced student confusion by 80% and increased successful placements.",
    link: "https://kuccpscoursechecker.co.ke",
    linkText: "KUCCPS Course Checker",
    category: "Websites"
  },
  {
    title: "Bingwa Posters",
    problem: "Agents and small businesses needed promotional posters constantly, but design was slow, inconsistent, and dependent on designers. This delayed marketing and reduced agility.",
    solution: "Built an automated poster-generation system where agents can instantly generate branded promotional posters using structured templates. The system removes dependency, ensures brand consistency, and speeds up marketing execution.",
    outcome: "Saved 10+ hours per week on design and maintained 100% brand consistency.",
    link: "https://bingwaposters.vercel.app",
    linkText: "Bingwa Posters",
    category: "Automation"
  },
  {
    title: "SciDraft",
    problem: "Students and institutions struggled to structure scientific lab reports properly. Manual formatting caused inconsistency, time waste, and academic errors.",
    solution: "Developed an AI-powered lab report system that converts structured input into academically formatted drafts. It enforces logical structure, standard formatting, and reduces repetitive academic writing friction.",
    outcome: "Cut formatting time by 90% and improved academic grading consistency.",
    link: "https://scidraft.vercel.app",
    linkText: "SciDraft",
    category: "AI"
  },
  {
    title: "Compassion PDF System",
    problem: "Child Development Centers manually tracked weekly contributions. Balances were inaccurate, notifications were inconsistent, and administrators spent excessive time managing records.",
    solution: "Built a structured digital contribution system that automates balance tracking, records payments accurately, and enables structured notifications. The system reduces manual errors and improves financial transparency.",
    outcome: "Eliminated manual tracking errors and increased financial transparency.",
    link: null,
    linkText: null,
    category: "Automation"
  },
  {
    title: "White Barn (Luxury Scents & Home Accents – New York)",
    problem: "A premium physical store selling luxurious scents and curated home accents had zero online presence. Customers searching online couldn’t find them. High-end branding existed offline, but digitally they were invisible — quietly losing potential buyers.",
    solution: "Built a refined, conversion-focused website that reflects the brand’s elegance and allows customers to discover products, explore collections, and connect directly. The system ensured they no longer lost online traffic and could convert interest into sales beyond foot traffic.",
    outcome: "Established premium digital presence and opened a new online sales channel.",
    link: "https://white-barn.netlify.app",
    linkText: "White Barn",
    category: "Websites"
  },
  {
    title: "Bangin Hair BK (Salon – New York)",
    problem: "A salon known for masterful cuts and transformative color had strong word-of-mouth reputation but no digital presence. New clients couldn’t preview services or validate credibility online.",
    solution: "Created a clean, visually expressive website showcasing services, style quality, and brand personality. The system positioned the salon professionally online, making discovery, trust-building, and client conversion seamless.",
    outcome: "Increased online bookings and validated brand credibility to new clients.",
    link: "https://banginhairbk.netlify.app",
    linkText: "Bangin Hair BK",
    category: "Websites"
  },
  {
    title: "7.  Morning Glory Restaurant (Australia)",
    problem: "A restaurant with strong local reputation and unforgettable cuisine had no website. Visitors and tourists searching online had no official reference point — losing reservation and walk-in opportunities.",
    solution: "Developed a modern, mobile-first website presenting the menu, ambiance, and contact details clearly. The system ensures customers can discover, evaluate, and plan visits without friction.",
    outcome: "Captured lost search traffic and increased walk-in reservations.",
    link: "https://morninggloryrestaurant.netlify.app",
    linkText: "Morning Glory Restaurant",
    category: "Websites"
  },
  {
    title: "Polyclinique (Hospital – Tunisia)",
    problem: "A large hospital serving Hammam-Lif since 2012 lacked a structured digital interface. Patients needed reliable access to information about services, departments, and care without inconvenience.",
    solution: "Built a structured medical website prioritizing clarity, trust, and accessibility. The system organizes medical services and essential information clearly, ensuring patients can navigate care confidently.",
    outcome: "Streamlined patient onboarding and built digital trust.",
    link: "https://polyclinique.netlify.app",
    linkText: "Polyclinique",
    category: "Websites"
  },
  {
    title: "Garden Specialist Hospital (Nairobi)",
    problem: "A specialized healthcare provider required a digital platform reflecting excellence and professionalism. Without a structured website, patients lacked a centralized source of medical information.",
    solution: "Designed and implemented a clear, professional healthcare website that communicates specialization, trust, and authority while guiding patients efficiently to relevant services.",
    outcome: "Centralized medical information and improved patient acquisition.",
    link: "https://gardenspecialist.netlify.app",
    linkText: "Garden Specialist Hospital",
    category: "Websites"
  },
  {
    title: "Lee Funeral Home (Nairobi)",
    problem: "A long-established, premium funeral home had a non-functional WordPress website. In moments when families needed immediate guidance, the digital system failed them.",
    solution: "Rebuilt and stabilized the website infrastructure, adding structured service pathways such as Immediate Support, Plan Ahead, Repatriation, and Cremation. The new system ensures families can access help quickly and clearly during critical moments.",
    outcome: "Provided reliable 24/7 digital support during critical family moments.",
    link: "https://leefuneralhome.netlify.app",
    linkText: "Lee Funeral Home",
    category: "Websites"
  },
  {
    title: "Valentine",
    problem: "Teenager or people in love are used to oral proposals. Patners underestimate the effort of their loved ones",
    solution: "Built a lovely valentime mobile app that allows users to send valentines messages to their loved ones. This makes love surprise and different.",
    outcome: "Delivered a unique, personalized digital experience for users.",
    link: "https://be-my-valentine-wc.vercel.app/",
    linkText: "Valentine",
    category: "Mobile Apps"
  },
  {
    title: "Whatsapp Bundles Sale Automation",
    problem: "A business needed to automate the sale of bundles on WhatsApp, saving time and increasing sales.",
    solution: "Developed a custom WhatsApp bot that allows users to buy bundles directly from Whatsapp. The bot is integrated with the business's inventory system, and Mpesa for payments.",
    outcome: "Saved hours of manual selling of bundles daily and ensured 0 missed sales.",
    link: "https://wa.me/254790295408?text=Bfasta",
    linkText: "Whatsapp Sale Automation",
    category: "Automation"
  },
  {
    title: "Lorem Productions (Film Production Company)",
    problem: "A filming company experienced low social media engagement due to weak editing structure and inconsistent video quality.",
    solution: "Re-edited and restructured their visual content professionally, enhancing pacing, clarity, and storytelling. The improved production quality increased audience engagement and strengthened brand perception online.",
    outcome: "Boosted audience engagement and strengthened professional brand perception.",
    link: "https://youtu.be/lGw6ix1Mydk?si=uzJjdWEUs8vOoqtf",
    linkText: "Lorem Productions",
    category: "Video Editing"
  },
  {
  title: "AI WhatsApp Customer Service Agent for SMEs",
  problem: "Over 80% of Kenyan SMEs handle customer inquiries manually on WhatsApp — a time sink that loses leads, creates inconsistency, and doesn't scale. Delayed responses cost businesses customers daily.",
  solution: "Built an AI-powered WhatsApp automation system that handles customer inquiries 24/7, qualifies leads, answers FAQs, and escalates complex issues to human agents. Integrated with business catalogs and M-Pesa for end-to-end sales completion without human involvement.",
  outcome: "Reduced response time from hours to under 3 seconds. Clients reported 60% fewer missed leads and eliminated the need for a dedicated customer service hire.",
  link: "https://bfasta.vercel.app",
  linkText: "Skylink Bundlefasta – Live Demo",
  category: "Automation"
},
{
  title: "AI Legal Guidance Platform for Common Kenyan Legal Issues",
  problem: "Access to legal advice is a luxury in Kenya. A basic consultation costs KSh 5,000–20,000. Most Kenyans cannot afford to challenge unlawful evictions, employment disputes, or land grabs.",
  solution: "Built an AI-powered platform trained on Kenyan law — Employment Act, Land Act, Tenant Protection guidelines — that provides plain-language legal guidance, generates demand letters, and maps users to relevant legal aid organizations based on their specific situation.",
  outcome: "Democratized access to basic legal knowledge for users who would otherwise have no recourse. Platform handles 15+ common legal scenarios with jurisdiction-accurate guidance.",
  link: "#",
  linkText: "AI Legal Guidance Platform",
  category: "AI"
},
{
  title: "AI-Powered CV Screening & Talent Matching for Kenyan HR Firms",
  problem: "Kenyan HR firms and corporate recruitment teams manually sift through hundreds to thousands of CVs per open position. This takes weeks, introduces significant human bias, and delays time-to-hire for critical roles.",
  solution: "Built an AI recruitment pipeline that ingests CVs in bulk, scores candidates against job description criteria, flags top matches with structured reasoning, and generates interview shortlists in minutes. Integrated with email for automated candidate communication.",
  outcome: "Reduced screening time from 2 weeks to under 2 hours. Eliminated manual ranking bias and cut cost-per-hire significantly for pilot HR clients.",
  link: "#",
  linkText: "AI CV Screening System",
  category: "AI"
},
{
  title: "AI Inventory & Restocking System for Dukas",
  problem: "Kenya has 3M+ small retail shops. Over 90% have no inventory tracking. Stockouts and overstock are daily losses. Owners reorder based on gut feel, often from multiple suppliers with no price comparison.",
  solution: "Built a mobile-first inventory system where shop owners log stock via simple inputs or barcode scan. AI tracks consumption patterns, predicts restocking dates, compares supplier pricing, and sends WhatsApp alerts before items run out. Works fully offline with sync when connected.",
  outcome: "Pilot shops reduced stockouts by 70% and identified 15–20% cost savings through supplier price comparison. Owners recovered an estimated KSh 8,000–15,000 monthly in previously invisible losses.",
  link: "#",
  linkText: "Duka AI Inventory System",
  category: "Mobile Apps"
},
{
  title: "M-Pesa Business Dashboard",
  problem: "Small business owners in Kenya receive dozens of M-Pesa transactions daily but have no way to analyze them. Manual bookkeeping is time-consuming, error-prone, and gives no real financial picture.",
  solution: "Built an Android app that reads M-Pesa SMS confirmations directly from the device, auto-categorizes transactions as income or expenses, and generates clean daily, weekly, and monthly dashboards. No manual data entry. No internet required.",
  outcome: "Business owners gained their first clear view of cash flow without hiring an accountant. App surfaces patterns like peak sales days and recurring expenses that were previously invisible.",
  link: "#",
  linkText: "M-Pesa Business Dashboard",
  category: "Mobile Apps"
},
{
  title: "Tenant Rent Tracker",
  problem: "Landlords managing multiple rental units in Kenya operate entirely from memory and notebooks. Tracking arrears, sending reminders, and knowing who has paid at month-end is manual, error-prone, and confrontational.",
  solution: "Built a mobile landlord management app where property owners add tenants, log monthly payments, flag arrears automatically, and send WhatsApp payment reminders in one tap. All data stored locally on device — no subscription, no cloud dependency.",
  outcome: "Landlords eliminated missed arrear tracking and reduced awkward debt follow-ups. WhatsApp reminder feature alone saved an estimated 3–4 hours per month per landlord.",
  link: "#",
  linkText: "Tenant Rent Tracker",
  category: "Mobile Apps"
},
{
  title: "AI Mockup Generator for Designers",
  problem: "Designers waste significant time placing artwork into device and product mockups manually in Photoshop. Client presentations require multiple mockup variations. The process is repetitive and slows down delivery.",
  solution: "Built a mobile app where designers upload their design file and select a mockup template — phone screens, t-shirts, billboards, packaging. AI automatically fits, warps, and blends the design into the mockup with realistic lighting and shadows. Export-ready in seconds.",
  outcome: "Reduced mockup creation time from 20–30 minutes per variation to under 60 seconds. Designers can generate full client presentation decks on mobile without touching a desktop.",
  link: "#",
  linkText: "AI Mockup Generator",
  category: "Mobile Apps"
},
{
    title: "Tech Haven",
    problem: "A professional high-end cyber cafe lacked professionalism because of lack of brand visibility and customer service.",
    solution: "Enhanced brand visibility through designing a uniques remarkable logo. This improved their brand awareness and strengthened customer loyalty.",
    outcome: "Elevated brand visibility and attracted higher-end clientele.",
    link: "https://drive.google.com/file/d/1GdAphvWmDZHAMyx5yJn13YKZ8NyE73pT/",
    linkText: "Tech Haven",
    category: "Design"
  },
  {
    title: "Skylink Hotel",
    problem: "A well known remarkable Hotel in Kisii, lacked a well designed Menu to showcase their food and services.",
    solution: "Designed a visually appealing and user-friendly menu that highlights the hotel's unique offerings. This made their customers well satisfied, allowing guests to quickly find the items they are interested in.",
    outcome: "Improved guest satisfaction and streamlined the ordering process.",
    link: "https://drive.google.com/file/d/1qAhlf3zXhbb40ijD45fiTJrHvUs8nEuk/",
    linkText: "Skylink Hotel",
    category: "Design"
  }
];

const servicesData = [
  {
    title: "Web Systems",
    icon: <Monitor strokeWidth={1.5} className="w-full h-full" />,
    desc: "Building trust-first digital platforms that convert attention into action. Websites that clarify, guide, and quietly turn visitors into clients.",
    price: "Starting from Ksh 15k",
    popular: true,
    tools: ["React", "TypeScript", "Javascript", "SQL"]
  },
  {
    title: "Application Systems",
    icon: <Smartphone strokeWidth={1.5} className="w-full h-full" />,
    desc: "Designing focused mobile applications that simplify how businesses operate. Tools that reduce manual effort and centralize operations.",
    price: "Starting from Ksh 50k",
    popular: false,
    tools: ["Flutter", "Dart", "Android"]
  },
  {
    title: "Strategic Design",
    icon: <PenTool strokeWidth={1.5} className="w-full h-full" />,
    desc: "Creating visual systems that remove confusion and build credibility. Design that communicates authority, not decoration.",
    price: "Starting from Ksh 1k",
    popular: false,
    tools: ["Illustrator", "Photoshop", "CorelDraw", "Affinity"]
  },
  {
    title: "Communication Editing",
    icon: <Video strokeWidth={1.5} className="w-full h-full" />,
    desc: "Crafting content that speaks clearly and moves people to act. Video and media that sharpen your message, not dilute it.",
    price: "Starting from Ksh 2k",
    popular: false,
    tools: ["Premiere Pro", "CapCut", "Filmora"]
  },
  {
    title: "Intelligent Automation",
    icon: <Zap strokeWidth={1.5} className="w-full h-full" />,
    desc: "Eliminating repetitive tasks with structured, self-running systems. Automation that saves time, reduces error, and scales effortlessly.",
    price: "Starting from Ksh 5k",
    popular: true,
    tools: ["n8n", "Make", "Zapier"]
  },
  {
    title: "Applied AI",
    icon: <Brain strokeWidth={1.5} className="w-full h-full" />,
    desc: "Turning AI into practical business systems, not just conversations. Designing AI-driven workflows that solve real operational problems.",
    price: "Starting from Ksh 5k",
    popular: false,
    tools: ["Claude", "Gemini", "OpenAI", "DeepSeek"]
  }
];

const testimonialsData = [
  { name: "Benard", business: "KUCCPS Course Checker", quote: "The intelligent course-checking system completely transformed how students interact with placement data. Brilliant work!", rating: 5 },
  { name: "Byron", business: "Bingwa Posters", quote: "We saved over 10 hours a week on design. The automated system is flawless and perfectly on brand.", rating: 5 },
  { name: "Dr. Ahmed", business: "Polyclinique Hospital", quote: "Our patients now have a reliable, structured digital interface. The trust and clarity it built are unmatched.", rating: 5 },
  { name: "Michael", business: "White Barn NYC", quote: "Our online sales channel opened up beautifully. The conversion-focused design was exactly what we needed.", rating: 5 },
  { name: "Elena", business: "Bangin Hair BK", quote: "The clean, visually expressive site immediately increased our bookings. Our digital presence finally matches our real-world reputation.", rating: 5 },
  { name: "David", business: "Morning Glory Restaurant", quote: "We captured lost search traffic instantly. Walk-in reservations went up within the first week of launch.", rating: 5 },
  { name: "Grace", business: "Garden Specialist Hospital", quote: "A highly professional platform that communicates our medical expertise perfectly. Excellent execution.", rating: 5 },
  { name: "Peter", business: "Lee Funeral Home", quote: "In critical moments, our digital system now works flawlessly. Families get the support they need 24/7.", rating: 5 },
  { name: "Rainhard", business: "Whatsapp Sale Automation", quote: "The automated whatsapp sales workflow saved us hours of manual selling of bundles. I never miss a sale even when offline.", rating: 5 }
];

export default function App() {
  const [businessChat, setBusinessChat] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [businessInput, setBusinessInput] = useState('');
  const [isBusinessLoading, setIsBusinessLoading] = useState(false);
  const [chatStage, setChatStage] = useState<'initial' | 'chatting'>('initial');
  const [isProblemsModalOpen, setIsProblemsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [clientId, setClientId] = useState('');
  const [proposalVersion, setProposalVersion] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState<'idle' | 'approved' | 'rejected'>('idle');
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [webhookMessage, setWebhookMessage] = useState('');
  const [lastAiStatus, setLastAiStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const businessMessagesEndRef = useRef<HTMLDivElement>(null);

  const [isIdle, setIsIdle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProblems = solvedProblems.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsIdle(true), 3000);
    };
    
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    idleTimeout = setTimeout(() => setIsIdle(true), 3000);

    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimeout);
    };
  }, []);

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

      if (!response.ok) {
        let errorMessage = "Sorry, I'm having trouble connecting right now.";
        try {
          const data = await response.json();
          errorMessage = data?.error || errorMessage;
        } catch (e) {
          // If response isn't JSON, ignore
        }
        setBusinessChat(prev => [...prev, { role: 'ai', text: errorMessage }]);
        setLastAiStatus('error');
      } else {
        const data = await response.json();
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
      <div className="max-w-[1200px] mx-auto rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm flex flex-col relative">
        
        {/* Header (Fixed Glassmorphism) */}
        <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-8'}`}>
          <div className={`pointer-events-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1200px] px-6 py-4 rounded-full flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm' : 'bg-transparent'}`}>
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
              <span className="text-[11px] sm:text-xs md:text-sm font-medium truncate max-w-[150px] sm:max-w-none">wazimucreations@gmail.com</span>
              <div className="flex gap-2">
                <button onClick={() => setIsAboutModalOpen(true)} className="px-3 md:px-4 py-1.5 bg-white rounded-full text-[10px] sm:text-xs font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  About
                </button>
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
              <a href="https://wa.me/254790295408?text=Hello%2C%20I%27m%20reaching%20out%20because%20my%20business%20is%20experiencing%20digital%20challenges%20and%20I%20would%20like%20to%20discuss%20how%20we%20can%20fix%20them.%20I%27m%20ready%20to%20implement%20a%20proper%20solution." target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-32.3 0-64-8.7-91.8-25.1l-6.6-3.9-68.1 17.8 18.2-66.4-4.3-6.8c-18-28-27.5-60-27.5-92.4 0-101.4 82.5-184 184-184 54.1 0 105.1 21.1 143.3 59.2 38.2 38.2 59.2 89.2 59.2 143.3 0 101.4-82.5 184-184 184zm101.3-139c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
              </a>
              <span className="text-gray-300">/</span>
              <a href="https://www.linkedin.com/in/tricreta" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>
              <span className="text-gray-300">/</span>
              <a href="https://x.com/tricreta" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors"><Twitter className="w-4 h-4 md:w-5 md:h-5" /></a>
              <span className="text-gray-300">/</span>
              <a href="https://instagram.com/tricreta" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
            </div>
          </div>
        </header>

        {/* 1. Hero Section */}
        <div className="bg-white">
          <div className="bg-[#F4F4F5] rounded-b-[2.5rem] md:rounded-b-[3rem] pt-32 md:pt-40 pb-20 px-6 md:px-16">
            {/* Hero Content */}
            <StaggerContainer className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <StaggerItem className="relative mb-8">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap mb-4">
                  2 spots available now
                </div>
                <img 
                  src="/wzm.gif" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#F4F4F5] mt-6"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 -right-24 bg-white px-4 py-2 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                  Am Tricreta
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.05] mb-6">
                  Building systems<br className="hidden sm:block" />that quietly make businesses <br className="hidden sm:block" />work.
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  I design digital infrastructure that converts visitors, automates operations, and eliminates the things slowing your business down.
                </p>
              </StaggerItem>

              <StaggerItem className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  onClick={() => setIsProblemsModalOpen(true)}
                  animate={isIdle && !shouldReduceMotion ? { boxShadow: ["0px 0px 0px 0px rgba(26,26,26,0.4)", "0px 0px 0px 15px rgba(26,26,26,0)"] } : { boxShadow: "0px 0px 0px 0px rgba(26,26,26,0)" }}
                  transition={{ duration: 1.5, repeat: isIdle ? Infinity : 0, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors cursor-pointer"
                >
                  Problems Solved <ArrowUpRight className="w-4 h-4" />
                </motion.button>
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/254790295408?text=Hello%2C%20I%27m%20reaching%20out%20because%20my%20business%20is%20experiencing%20digital%20challenges%20and%20I%20would%20like%20to%20discuss%20how%20we%20can%20fix%20them.%20I%27m%20ready%20to%20implement%20a%20proper%20solution."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 text-gray-900 px-6 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Let's Talk <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </StaggerItem>

              <StaggerItem className="mt-10 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <div className="w-8 h-px bg-gray-300"></div>
                Trusted by 12+ businesses across East Africa
                <div className="w-8 h-px bg-gray-300"></div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        {/* 2. What's Broken Section */}
        <div className="bg-[#F4F4F5]">
          <div className="bg-white rounded-b-[2.5rem] md:rounded-b-[3rem] py-16 md:py-24 px-6 md:px-16">
            <div className="max-w-3xl mx-auto">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 text-center">What's broken in your business?</h2>
              </FadeUp>
              
              {chatStage === 'initial' && (
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {["My website doesn't convert", "I'm doing everything manually", "My brand looks unprofessional"].map((painPoint) => (
                    <button 
                      key={painPoint}
                      onClick={() => setBusinessInput(painPoint)}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-black hover:text-black transition-colors shadow-sm cursor-pointer"
                    >
                      {painPoint}
                    </button>
                  ))}
                </div>
              )}

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
            <FadeUp className="text-center mb-16 md:mb-20">
              <h2 className="text-2xl md:text-[1.75rem] font-medium mb-12 md:mb-16 text-[#1a1a1a] leading-snug">
                Designing and implementing systems<br className="hidden md:block" />that make businesses work better.
              </h2>
              <div className="relative flex justify-center items-center max-w-3xl mx-auto">
                <div className="absolute w-full h-px bg-gray-200"></div>
                <span className="bg-white px-5 py-2 rounded-full text-xs font-medium relative z-10 shadow-sm text-gray-600">What I Build (And Why It Works)</span>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {servicesData.map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial="initial"
                  whileHover="hover"
                  variants={{
                    initial: { y: 0, boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)", borderColor: "#f3f4f6" },
                    hover: { 
                      y: -6, 
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                      borderColor: "#f97316",
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  className="bg-white p-8 rounded-3xl border relative overflow-hidden group transition-colors duration-300"
                >
                  {service.popular && (
                    <div className="absolute top-6 right-6 bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                      Most Popular
                    </div>
                  )}
                  <div className="w-12 h-12 mb-5 text-gray-700 relative z-10">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold mb-3 text-sm relative z-10">{service.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 relative z-10">{service.desc}</p>
                  <div className="text-xs font-semibold text-gray-900 relative z-10">{service.price}</div>
                  
                  {/* Hover Tools Overlay */}
                  <motion.div 
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-orange-50 to-rose-50 p-8 flex flex-col justify-end items-start z-20 pointer-events-none"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-orange-800 mb-2">Tools I Use</div>
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map((tool, tIdx) => (
                        <motion.span 
                          key={tIdx} 
                          variants={{
                            initial: { scale: 0.85, opacity: 0, y: 10 },
                            hover: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                          }}
                          className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-orange-900 shadow-sm border border-orange-100/50"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Testimonials Section */}
        <div className="bg-[#F4F4F5]">
          <div className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] pt-16 md:pt-20 pb-8 px-6 md:px-16 overflow-hidden">
            <FadeUp className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8 md:mb-10">
                What clients say after working with me
              </h2>
            </FadeUp>

            {/* Marquee */}
            <div className="relative flex overflow-x-hidden mb-20 md:mb-24 group">
              <div className="animate-marquee whitespace-nowrap flex items-stretch gap-4 md:gap-6 py-4">
                {testimonialsData.map((testimonial, idx) => (
                  <div 
                    key={idx} 
                    className="flex-none w-[320px] md:w-[380px] p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-3xl whitespace-normal flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex text-yellow-400 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{testimonial.business}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-stretch gap-4 md:gap-6 py-4 ml-4 md:ml-6">
                {testimonialsData.map((testimonial, idx) => (
                  <div 
                    key={`dup-${idx}`} 
                    className="flex-none w-[320px] md:w-[380px] p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-3xl whitespace-normal flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex text-yellow-400 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{testimonial.business}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Process Section */}
            <div className="py-16 md:py-24 border-t border-gray-100 bg-white">
              <FadeUp className="text-center mb-16 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                  How I Work
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                  A structured process to ensure we build exactly what your business needs, without the fluff.
                </p>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
                <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gray-200 z-0"></div>
                
                {/* SVG Neuron Network Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-2 z-0 pointer-events-none -translate-y-1/2">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <motion.path
                      d="M 0 5 Q 25 5, 33 5 T 66 5 T 100 5"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="0" cy="5" r="2" fill="#f97316"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0 }}
                    />
                    <motion.circle
                      cx="33" cy="5" r="2" fill="#f97316"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    />
                    <motion.circle
                      cx="66" cy="5" r="2" fill="#f97316"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                    />
                    <motion.circle
                      cx="100" cy="5" r="2" fill="#f97316"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5 }}
                    />
                  </svg>
                </div>
                
                {[
                  { step: "01", title: "Diagnose", desc: "We uncover the root cause of your bottleneck, not just the symptoms." },
                  { step: "02", title: "Design", desc: "I map out the digital architecture and user flow for the system." },
                  { step: "03", title: "Build", desc: "Developing the platform, integrations, and automations seamlessly." },
                  { step: "04", title: "Optimize", desc: "Testing, refining, and ensuring the system scales with your business." }
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-white border-4 border-[#F4F4F5] rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 shadow-sm mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Thoughts / Insights Section */}
            <Thoughts />

            {/* Footer */}
            <footer className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">© 2026 All rights reserved.</p>
              <div className="flex items-center gap-3 md:gap-4 text-xs font-medium text-gray-500">
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
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsProblemsModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F4F4F5] w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="bg-white p-4 md:p-6 border-b border-gray-100 z-10 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Problems Solved</h2>
                    <button 
                      onClick={() => setIsProblemsModalOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  
                  {/* Category Navigation & Search */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex overflow-x-auto pb-2 -mb-2 w-full md:w-auto hide-scrollbar gap-2">
                      {(['All', 'Websites', 'Mobile Apps', 'Design', 'Automation', 'Video Editing', 'AI'] as ServiceCategory[]).map(category => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            activeCategory === category 
                              ? 'bg-[#1a1a1a] text-white shadow-md' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    <div className="relative w-full md:w-64 flex-shrink-0">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
                  {filteredProblems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredProblems.map((project, idx) => (
                          <motion.div 
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow group"
                          >
                            <div className="mb-3 flex justify-between items-start gap-2">
                              <h3 className="font-semibold text-base text-gray-900 leading-snug">{project.title}</h3>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded flex-shrink-0">
                                {project.category}
                              </span>
                            </div>
                            
                            <div className="mb-4 flex-1 space-y-3">
                              <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-100/50 transition-colors group-hover:bg-red-50">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1.5 block flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Problem
                                </span>
                                <p className="text-xs font-medium text-red-900/80 leading-relaxed line-clamp-4">{project.problem}</p>
                              </div>
                              
                              <div className="bg-green-50/50 p-3.5 rounded-xl border border-green-100/50 transition-colors group-hover:bg-green-50">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-green-600 mb-1.5 block flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Solution
                                </span>
                                <p className="text-xs font-medium text-green-900/80 leading-relaxed line-clamp-4">{project.solution}</p>
                              </div>

                              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50 transition-colors group-hover:bg-blue-50">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1.5 block flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Outcome
                                </span>
                                <p className="text-xs font-medium text-blue-900/80 leading-relaxed">{project.outcome}</p>
                              </div>
                            </div>

                            {project.link && (
                              <div className="mt-auto pt-3 border-t border-gray-50">
                                <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                                >
                                  Link to proof <ArrowUpRight className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
                      <Search className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-medium">No projects found</p>
                      <p className="text-sm">Try adjusting your search or category filter.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        className="mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Modal */}
        <AnimatePresence>
          {isAboutModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsAboutModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight">About</h2>
                  <button 
                    onClick={() => setIsAboutModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="flex flex-col items-center mb-6 relative">
                  <video 
                    src="/hello.mp4" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#F4F4F5] shadow-sm"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="text-gray-600 space-y-4 text-sm leading-relaxed text-center">
                  <p>
                    I'm Tricreta, a developer and automation builder based in Kenya. I design and ship AI-powered systems that solve real business problems — from WhatsApp automation with M-Pesa payments to custom web platforms and intelligent workflows.
                  </p>
                  <p>
                    My work sits at the intersection of design, development, and automation: I don't just build websites, I build systems that run.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
