import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import OpenAI from "openai";
import { 
  Terminal, 
  User, 
  Briefcase, 
  Code, 
  Send, 
  Sparkles,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Loader2,
  Zap,
  Activity,
  Cpu,
  ShieldCheck,
  Network,
  ArrowRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DATA DEFINITIONS ---
const FOUNDERS = [
  {
    name: "Krishna Manu",
    role: "CIB Research & Analyst Intern at J.P. Morgan | Complex Problem Solver",
    bio: "\"I do what I love and connect with. I wanna build something that outlives me.\". I specialize in bridging high-finance analytical rigor with technical AI evaluation, focusing on solving the logical hurdles that prevent LLMs from being truly reliable in professional environments.",
    socials: [
      { type: 'github', link: 'https://github.com/k-manu' },
      { type: 'linkedin', link: 'https://www.linkedin.com/in/keerthivasan-t/' }
    ],
    projects: [
      {
        title: "CORD-RAG vs. Fine-Tune",
        desc: "A comparative framework evaluating Retrieval-Augmented Generation (RAG) against fine-tuned Mistral-7B models using 5,000 top biomedical research papers from the CORD-19 dataset.",
        tags: ['LangChain', 'OpenAI API', 'Mistral-7B', 'Hugging Face'],
        achievement: "Developed a custom response evaluation framework to drastically reduce hallucination rates and increase domain relevance."
      },
      {
        title: "PeerPilot",
        desc: "A web application connecting college students with on-campus freelancers for academic and creative gigs.",
        tags: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Supabase'],
        achievement: "Integrated real-time database management and secure authentication for seamless, live bidding."
      }
    ]
  },
  {
    name: "Keerthivasan T.",
    role: "Lead Data & AI Infrastructure Engineer",
    bio: "I build complex, high-throughput AI systems and data pipelines. From designing end-to-end voice intelligence for wearables at Neosapien to deploying ultra-low-latency computer vision pipelines at KalkiNi, my focus is strictly on making heavy AI infrastructure scale in production.",
    socials: [
      { type: 'github', link: 'https://github.com/aka-kv' },
      { type: 'linkedin', link: 'https://www.linkedin.com/in/krishna-manu-chaithanya-k-b683a6275/' }
    ],
    projects: [
      {
        title: "SaffronStays Sales Engine",
        desc: "An end-to-end sales framework integrating AI voice-call handling, lead prioritization, and dynamic pricing engines.",
        tags: ['Python', 'LangGraph', 'ARIMA/XGBoost', 'Voice AI'],
        achievement: "Drove $30k in revenue, reduced customer response time from 3 days to 2 hours."
      },
      {
        title: "Cortex",
        desc: "An AI system automating the blood donation lifecycle with donor scoring, patient monitoring, and voice-driven engagement.",
        tags: ['Python', 'Voice Processing', 'Predictive ML'],
        achievement: "Secured 2nd Runner Up at AI For Good Hackathon by delivering a production-ready pipeline in 48 hours."
      }
    ]
  },
  {
    name: "Nitin S.",
    role: "Incoming MSCS Student at Georgia Tech | Research Intern at Samsung R&D Institute",
    bio: "I am an incoming Master of Science in Computer Science student at Georgia Tech specializing in Computing Systems and Model Context Protocol (MCP) infrastructure. My research focus lies at the intersection of embodied AI and compute-adaptive architectures.",
    socials: [
      { type: 'github', link: 'https://github.com/nitin-sk' },
      { type: 'linkedin', link: 'https://www.linkedin.com/in/nitin-s-2b445926a/' }
    ],
    projects: [
      {
        title: "Multi-Modal Depth Fusion",
        desc: "A transformer-based unified framework for multi-modal depth estimation and refinement designed for autonomous platforms.",
        tags: ['Python', 'PyTorch', 'Transformers'],
        achievement: "Lead Inventor (Patent App No. 202541094879); developed a motion-aware gating module for structural stability."
      },
      {
        title: "Cloud Resource Manager",
        desc: "A reinforcement learning-based autoscaling system for intelligent management of Azure and GCP workloads.",
        tags: ['Python', 'DQN', 'LLM', 'Azure', 'GCP'],
        achievement: "Improved cost efficiency and SLA compliance by ~70% while maintaining decision transparency."
      }
    ]
  }
];

const VISION = {
  why: "We are building AI agents on the fly—an infrastructure platform that transforms any static app or database into an autonomous workforce in seconds. We believe the future of software isn't in chat interfaces, but in giving every piece of software its own 'autonomous brain' to replace manual human operators.",
  what: "We are accelerating the shift toward an agent-first future by generating fully functional Model Context Protocol (MCP) servers on the fly. Our engine takes natural language intent or raw API documentation, dynamically compiles a production-ready MCP server, and instantly deploys a secure, sandboxed AI agent."
};

const TECH_SPECS = [
  "Model Context Protocol (MCP): The backbone for synthesizing backend infrastructure.",
  "LangGraph & LangChain: For building stateful, multi-agent runtimes.",
  "Transformer Architectures & PyTorch: For uncertainty-aware synthesis and decision-making.",
  "ROS 2 & NVIDIA Jetson: Deployment of autonomous logic into embodied systems.",
  "Voice AI & Predictive ML: For real-time engagement layers and dynamic decision engines."
];

// --- UTILITY COMPONENTS ---
const Crosshair = ({ className }: { className?: string }) => (
  <div className={cn("absolute w-4 h-4 pointer-events-none z-0", className)}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lemony-yellow/30 -translate-y-1/2"></div>
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-lemony-yellow/30 -translate-x-1/2"></div>
  </div>
);

const SysLabel = ({ text, className }: { text: string, className?: string }) => (
  <div className={cn("font-mono text-[10px] uppercase tracking-widest text-white/40", className)}>
    [{text}]
  </div>
);

const SystemBar = ({ onClear }: { onClear: () => void }) => (
  <nav className="fixed top-0 w-full z-50 bg-dark-void border-b border-white/10 font-mono text-xs">
    <div className="flex items-center justify-between px-4 h-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-lemony-yellow font-bold">
          <Terminal className="w-4 h-4" />
          <span>VIBECONN_OS_2026</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-white/50">
          <span>SYS.STATE: <span className="text-green-400">OPTIMAL</span></span>
          <span>NODES: 14,092</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onClear}
          className="text-white/40 hover:text-lemony-yellow transition-colors flex items-center gap-2 px-2 py-1 border border-transparent hover:border-lemony-yellow/30"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">CLEAR_LOGS</span>
        </button>

        <div className="bg-lemony-yellow text-dark-void px-4 py-1 font-bold">
          EMERGENT_V1.0
        </div>
      </div>
    </div>
  </nav>
);

const ProjectCard = ({ title, desc, tags, achievement, link }: { title: string, desc: string, tags: string[], achievement?: string, link?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="border border-white/10 bg-dark-void p-5 brutal-shadow hover:border-lemony-yellow transition-all group mt-4"
  >
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-black text-lg uppercase tracking-tight text-lemony-yellow">{title}</h4>
      {link && <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-lemony-yellow transition-colors" />}
    </div>
    <p className="text-xs text-white/60 font-mono mb-2 leading-relaxed">{desc}</p>
    {achievement && (
      <div className="mb-4 p-2 bg-lemony-yellow/5 border-l-2 border-lemony-yellow text-[10px] text-white/80 font-mono italic">
        {achievement}
      </div>
    )}
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-white/40">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const FounderCard = ({ name, role, bio, socials }: { name: string, role: string, bio: string, socials: { type: string, link: string }[] }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="border border-white/10 bg-[#1a1b20] p-6 mt-4 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-16 h-16 bg-lemony-yellow/5 -rotate-45 translate-x-8 -translate-y-8 group-hover:bg-lemony-yellow/10 transition-all"></div>
    <SysLabel text="CORE_MEMBER" className="mb-2" />
    <h4 className="font-black text-xl uppercase tracking-tighter mb-1">{name}</h4>
    <div className="text-lemony-yellow font-mono text-[10px] uppercase tracking-widest mb-4">{role}</div>
    <p className="text-sm text-white/70 leading-relaxed mb-6">{bio}</p>
    <div className="flex gap-4">
      {socials.map(s => (
        <a key={s.link} href={s.link} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lemony-yellow transition-colors">
          {s.type === 'github' && <Github className="w-4 h-4" />}
          {s.type === 'twitter' && <Twitter className="w-4 h-4" />}
          {s.type === 'linkedin' && <Linkedin className="w-4 h-4" />}
        </a>
      ))}
    </div>
  </motion.div>
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  customComponent?: ReactNode;
}

const PRESET_OPTIONS = [
  { id: 'who-are-we', label: 'Who are we?', icon: User },
  { id: 'previous-projects', label: 'Previous projects', icon: Briefcase },
  { id: 'tech-stack', label: 'Our Tech Stack', icon: Code },
  { id: 'vision', label: 'VibeConn 2026 Vision', icon: Zap },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the team Axonyx's portfolio, get to know us better. We have given some template questions, if you want to know more, ask more.",
      timestamp: new Date(),
    }
  ]);

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: "### SYSTEM_REBOOT_COMPLETE\n\nLogs cleared. System ready for new intent input.",
        timestamp: new Date(),
      }
    ]);
  };
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        dangerouslyAllowBrowser: true
      });
      const systemInstruction = `
          You are an information retrieval interface for the Axonyx team and our VibeConn 2026 Portfolio. Your tone is strictly factual, concise, technical, and objective.
          Do NOT act like a chatbot. Do NOT ask "How can I help you?" or "What would you like to explore?". Respond directly to the query with ONLY the requested factual data.

          FOUNDER DATA:
          ${JSON.stringify(FOUNDERS, null, 2)}

          VISION & IDENTITY:
          Company/Team: Axonyx
          Event/Context: VibeConn 2026
          About us: We are Team Axonyx, presenting our vision at VibeConn 2026.
          ${JSON.stringify(VISION, null, 2)}

          TECH STACK:
          ${TECH_SPECS.join('\n')}

          MISSION: "Building AI agents on the fly" - infrastructure platform for autonomous workforce.

          RULES:
          1. Output information clearly using simple bullet lists and paragraphs. Do not overuse bold text.
          2. Keep the design minimalist. Use standard headings (##, ###) only when grouping major sections.
          3. Be extremely brief. Do not add conversational fluff or polite openings/closings.
          4. If asked about founders, neatly list their name as a heading, followed by their role and a quick summary of their top projects.
          5. Use simple, direct English. Avoid jargon unless it is in the data schema.
          6. If asked about Axonyx, explain that we are the team building AI agents on the fly. If asked about VibeConn, explain that it is the event we are participating in to showcase our vision for autonomous workforces.
          7. If the user asks something completely unrelated to Axonyx, Vibeconn, the founders, tech stack, or our vision, reply ONLY with: "Query out of bounds. Please request data on Axonyx, Founders, Projects, Tech Stack, or Vision."        `;
      const response = await openai.chat.completions.create({
        model: "gpt-5.4-nano",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: content }
        ],
        temperature: 0.7,
      });

      let aiResponse = response.choices[0].message.content || "I've analyzed your query but encountered a compilation error. Please re-input intent.";
      let customComponent: ReactNode = null;

      // Logic to inject interactive components based on intent
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('who are we') || lowerContent.includes('founder') || lowerContent.includes('team')) {
        customComponent = (
          <div className="space-y-4">
            {FOUNDERS.map(f => (
              <FounderCard key={f.name} {...f} />
            ))}
          </div>
        );
      } else if (lowerContent.includes('project') || lowerContent.includes('work') || lowerContent.includes('previous')) {
        customComponent = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOUNDERS.flatMap(f => f.projects).map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        );
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        customComponent
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "### SYSTEM_ERROR\n\nFailed to compile response. Ensure VITE_OPENAI_API_KEY is configured in the environment. \n\n*Error details: Connection to intelligence node timed out or unauthorized.*",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-void text-white font-sans selection:bg-lemony-yellow selection:text-dark-void overflow-x-hidden">
      <SystemBar onClear={clearChat} />
      
      <main className="max-w-4xl mx-auto pt-24 pb-48 px-4 relative">
        {/* Decorative Crosshairs */}
        <Crosshair className="top-24 left-4" />
        <Crosshair className="top-24 right-4" />
        
        {/* Chat Messages */}
        <div className="space-y-10 relative z-10">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 border border-lemony-yellow bg-lemony-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Terminal className="w-5 h-5 text-lemony-yellow" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[85%] px-6 py-4 relative",
                  message.role === 'user' 
                    ? 'bg-white text-dark-void brutal-shadow-white font-medium' 
                    : 'bg-[#16171c] border border-white/10 brutal-shadow'
                )}>
                  {message.role === 'assistant' && (
                    <SysLabel text="COMPILER_OUTPUT" className="absolute -top-6 left-0" />
                  )}
                  {message.role === 'user' && (
                    <SysLabel text="USER_INTENT" className="absolute -top-6 right-0" />
                  )}
                  <div className={cn("max-w-none text-[15px] space-y-4", message.role === 'user' ? 'text-black' : 'text-white')}>
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-lemony-yellow tracking-tight uppercase" {...props} />,
                        h2: ({ node, ...props }) => <h2 className={cn("text-xl font-bold mt-8 mb-4 border-b pb-2 uppercase tracking-wide", message.role === 'user' ? 'border-black/20 text-black' : 'border-white/20 text-white')} {...props} />,
                        h3: ({ node, ...props }) => <h3 className={cn("text-lg font-bold mt-6 mb-3 uppercase text-sm tracking-wider", message.role === 'user' ? 'text-black/80' : 'text-lemony-yellow/90')} {...props} />,
                        p: ({ node, ...props }) => <p className={cn("leading-relaxed", message.role === 'user' ? 'text-black opacity-80' : 'text-white/80')} {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-none space-y-3 my-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className={cn("list-decimal pl-6 space-y-3 my-4 marker:text-lemony-yellow", message.role === 'user' ? 'text-black opacity-80' : 'text-white/80')} {...props} />,
                        li: ({ node, ...props }: any) => {
                          const isOrdered = node?.tagName === 'li' && node?.parent?.tagName === 'ol';
                          if (isOrdered) {
                            return <li className={cn("pl-1", message.role === 'user' ? 'text-black opacity-80' : 'text-white/80')}>{props.children}</li>;
                          }
                          return (
                              <li className="flex items-start gap-3">
                                <div className={cn("w-1.5 h-1.5 mt-2 flex-shrink-0 rounded-sm", message.role === 'user' ? 'bg-black' : 'bg-lemony-yellow')} />
                                <div className={cn("leading-relaxed", message.role === 'user' ? 'text-black opacity-80' : 'text-white/80')}>{props.children}</div>
                            </li>
                          );
                        },
                          strong: ({ node, ...props }) => <strong className={cn("font-bold tracking-tight", message.role === 'user' ? 'text-black' : 'text-white')} {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className={cn("border-l-2 border-lemony-yellow pl-4 italic my-6 py-2", message.role === 'user' ? 'text-black/60 bg-black/5' : 'text-white/60 bg-black/20')} {...props} />,
                        code: ({ node, inline, ...props }: any) => 
                          inline ? (
                            <code className="font-mono text-[13px] bg-lemony-yellow/10 text-lemony-yellow px-1.5 py-0.5 rounded" {...props} />
                          ) : (
                            <code className="block font-mono text-sm bg-[#0a0a0c] border border-white/10 text-white/80 p-4 rounded overflow-x-auto my-4 whitespace-pre-wrap brutal-shadow" {...props} />
                          ),
                        a: ({ node, ...props }) => <a className="text-lemony-yellow hover:underline flex items-center gap-1 inline-flex" target="_blank" rel="noopener noreferrer" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.customComponent && (
                    <div className="mt-2">
                      {message.customComponent}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-10 h-10 border border-white bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <div className="w-10 h-10 border border-lemony-yellow bg-lemony-yellow/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-lemony-yellow animate-pulse" />
                </div>
                <div className="bg-[#16171c] border border-white/10 px-6 py-4 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 text-lemony-yellow animate-spin" />
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Compiling_Response...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Bottom Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-dark-void via-dark-void to-transparent pt-24 pb-8 px-4 z-40">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Preset Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {PRESET_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(247, 255, 114, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(option.label)}
                disabled={isTyping}
                className="flex items-center gap-3 px-5 py-2.5 bg-dark-void border border-white/20 font-mono text-xs uppercase tracking-wider transition-all hover:border-lemony-yellow hover:text-lemony-yellow disabled:opacity-50"
              >
                <option.icon className="w-4 h-4" />
                <span>{option.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-lemony-yellow/20 blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative bg-[#1a1b20] border border-white/20 p-1">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-lemony-yellow -translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-lemony-yellow translate-x-1 translate-y-1"></div>
              
              <div className="flex items-center gap-2 px-4">
                <span className="text-lemony-yellow font-mono">{'>'}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="INPUT_RAW_INTENT..."
                  disabled={isTyping}
                    className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 py-4 font-mono text-sm text-white placeholder:text-white/20 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 text-lemony-yellow hover:text-white transition-colors disabled:opacity-30"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" />
              <span>SECURE_LINK</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="w-3 h-3" />
              <span>VIBECONN_2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>AI_AUTONOMOUS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
