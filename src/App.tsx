import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Zap, BrainCircuit, Activity, ArrowRight, Clock, Mail, MessageCircle, Database, Code2, Cpu, Network, ShieldCheck } from 'lucide-react';

// --- UTILITY COMPONENTS ---
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-4 h-4 pointer-events-none ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lemony-yellow/50 -translate-y-1/2"></div>
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-lemony-yellow/50 -translate-x-1/2"></div>
  </div>
);

const SysLabel = ({ text, className }: { text: string, className?: string }) => (
  <div className={`font-mono text-[10px] uppercase tracking-widest text-white/40 ${className}`}>
    [{text}]
  </div>
);

// --- NAVBAR (System Status Bar) ---
const SystemBar = () => (
  <nav className="fixed top-0 w-full z-50 bg-dark-void border-b border-white/10 font-mono text-xs">
    <div className="flex items-center justify-between px-4 h-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-lemony-yellow font-bold">
          <Terminal className="w-4 h-4" />
          <span>AXONYX_OS</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-white/50">
          <span>SYS.STATE: <span className="text-green-400">OPTIMAL</span></span>
          <span>NODES: 14,092</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-lemony-yellow text-dark-void px-4 py-1 font-bold hover:bg-white transition-colors">
          INIT_DEPLOYMENT
        </button>
      </div>
    </div>
  </nav>
);

// --- HERO: THE INTENT COMPILER ---
const IntentCompiler = () => {
  const [phase, setPhase] = useState(0); // 0: typing, 1: parsing, 2: compiled
  const [text, setText] = useState('');
  const fullText = "Check my Gmail at 9am and WhatsApp me a client summary.";
  
  useEffect(() => {
    let typeInterval: NodeJS.Timeout;
    let timeouts: NodeJS.Timeout[] = [];
    
    const startAnimation = () => {
      let i = 0;
      setPhase(0);
      setText('');
      
      typeInterval = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          timeouts.push(setTimeout(() => setPhase(1), 500));
          timeouts.push(setTimeout(() => setPhase(2), 2500));
          timeouts.push(setTimeout(() => {
            startAnimation();
          }, 8000));
        }
      }, 50);
    };

    startAnimation();

    return () => {
      clearInterval(typeInterval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="pt-32 pb-12 px-4 md:px-8 min-h-screen flex flex-col relative border-b border-white/10 overflow-hidden">
      {/* Modern Aesthetic CSS Background replaces Tree Asset */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow behind text */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-lemony-yellow/10 rounded-[100%] blur-[120px] mix-blend-screen bg-opacity-50"></div>
        {/* High-tech fine grid pattern centered spotlight */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)]"></div>
        {/* Secondary color accent (blue/purple) to give depth */}
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[40vh] bg-purple-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[40vh] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      </div>

      <Crosshair className="top-24 left-4 z-10" />
      <Crosshair className="top-24 right-4 z-10" />
      <Crosshair className="bottom-4 left-4 z-10" />
      <Crosshair className="bottom-4 right-4 z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-grow">
        
        {/* TOP: Tagline */}
        <div className="text-center pt-12 pb-24 md:pb-32">
          <SysLabel text="AXONYX_ENGINE" className="mb-4 mx-auto" />
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
            Agents <br className="hidden md:block"/>
            <span className="text-lemony-yellow relative inline-block group">
              On The Fly.
              <div className="absolute inset-0 bg-lemony-yellow blur-[60px] opacity-[0.15] group-hover:opacity-30 group-hover:blur-[80px] transition-all duration-700 -z-10"></div>
            </span>
          </h1>
          <p className="text-base md:text-xl text-white/70 font-mono max-w-4xl mx-auto drop-shadow-md leading-relaxed px-4 md:px-0">
            Build autonomous AI agents instantly from raw intent. Have an existing app? Paste your API schema, and we'll dynamically generate an <strong className="text-lemony-yellow">MCP Server</strong> on the fly so your agent can control it. No flowcharts. Just action.
          </p>
        </div>

        {/* BOTTOM: Input Stream & Compiler Output (Parallel) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-auto w-full">
          
          {/* Left: Input Stream */}
          <div className="bg-dark-void border border-white/20 p-2 relative group w-full shadow-[0_0_50px_rgba(255,255,255,0.02)] hover:shadow-[0_0_50px_rgba(247,255,114,0.08)] transition-shadow duration-500 rounded-lg flex flex-col h-[350px] md:h-[400px]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lemony-yellow -translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-lemony-yellow translate-x-1 translate-y-1"></div>
            
            <div className="bg-[#111216] p-6 lg:p-8 font-mono text-sm md:text-base flex-grow flex flex-col rounded shadow-inner overflow-hidden">
              <div className="text-white/50 mb-6 border-b border-white/10 pb-4 flex justify-between uppercase tracking-wider text-xs font-bold">
                <span className="flex items-center"><Activity className="w-4 h-4 mr-2" />INPUT_STREAM</span>
                <span className={phase === 0 ? 'text-lemony-yellow/80 animate-pulse' : 'text-green-400'}>
                  {phase === 0 ? 'AWAITING_INTENT...' : 'INTENT_LOCKED'}
                </span>
              </div>
              <div className="flex-grow flex items-start gap-4 mt-2 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                <span className="text-lemony-yellow mt-1 font-bold">{'>'}</span>
                <p className="text-white leading-[1.6]">
                  {phase > 0 ? (
                    <span className="opacity-90">
                      Check my <span className="bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 shadow-sm">Gmail</span> at <span className="bg-lemony-yellow/20 text-lemony-yellow px-2 py-0.5 rounded border border-lemony-yellow/50 shadow-sm whitespace-nowrap">9am</span> and <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/50 shadow-sm">WhatsApp</span> me a <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/50 shadow-sm whitespace-nowrap">client summary</span>.
                    </span>
                  ) : (
                    <span>{text}<span className="inline-block w-4 h-6 lg:h-8 bg-lemony-yellow ml-1 animate-pulse align-middle shadow-[0_0_10px_#F7FF72]"></span></span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Real-time Compiler Visualizer */}
          <div className="relative h-[350px] md:h-[400px] border border-white/20 rounded-lg bg-[#111216] p-2 group shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:shadow-[0_0_40px_rgba(247,255,114,0.05)] transition-shadow duration-500 w-full flex flex-col">
            <SysLabel text="COMPILER_OUTPUT" className="absolute top-6 left-6 z-20 hidden md:block" />
            
            <div className="relative border border-white/10 rounded overflow-hidden flex-grow flex flex-col justify-center w-full bg-[#16171c]">
              
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>

              <div className="relative z-10 flex flex-col gap-6 w-full max-w-sm mx-auto px-4">
              <AnimatePresence mode="wait">
                {phase === 0 && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center font-mono text-white/30 flex flex-col items-center gap-4"
                  >
                    <Activity className="w-8 h-8 animate-pulse" />
                    <span>LISTENING FOR INTENT...</span>
                  </motion.div>
                )}

                {phase === 1 && (
                  <motion.div 
                    key="parsing"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="font-mono text-xs text-lemony-yellow flex flex-col gap-2"
                  >
                    <p>{'>'} Analyzing syntax tree...</p>
                    <p>{'>'} Extracting temporal trigger: [09:00 AM]</p>
                    <p>{'>'} Identifying data source: [GMAIL_API]</p>
                    <p>{'>'} Mapping cognitive action: [SUMMARIZE_CLIENTS]</p>
                    <p>{'>'} Resolving output vector: [WHATSAPP_API]</p>
                    <p className="animate-pulse">{'>'} Constructing T.I.A. pipeline...</p>
                  </motion.div>
                )}

                {phase === 2 && (
                  <motion.div 
                    key="compiled"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Trigger Node */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-lemony-yellow bg-lemony-yellow/10 flex items-center justify-center text-lemony-yellow">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-grow border border-white/10 bg-dark-void p-2 font-mono text-xs flex justify-between items-center">
                        <span className="text-white/50">TRIGGER</span>
                        <span className="text-lemony-yellow">CRON: 0 9 * * *</span>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="w-px h-6 bg-lemony-yellow/50 ml-5"></div>

                    {/* Intelligence Node */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-purple-500 bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <BrainCircuit className="w-5 h-5" />
                      </div>
                      <div className="flex-grow border border-white/10 bg-dark-void p-2 font-mono text-xs flex justify-between items-center">
                        <span className="text-white/50">CORTEX</span>
                        <span className="text-purple-400">LLM_EXTRACT(GMAIL)</span>
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="w-px h-6 bg-purple-500/50 ml-5"></div>

                    {/* Action Node */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-green-500 bg-green-500/10 flex items-center justify-center text-green-400">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div className="flex-grow border border-white/10 bg-dark-void p-2 font-mono text-xs flex justify-between items-center">
                        <span className="text-white/50">ACTION</span>
                        <span className="text-green-400">WHATSAPP.SEND()</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center font-mono text-[10px] md:text-xs text-green-400 bg-green-400/10 py-2 border border-green-400/30 font-bold tracking-widest shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      AGENT DEPLOYED & ACTIVE
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- THE ENGINE SCHEMATIC ---
const EngineSchematic = () => {
  return (
    <section className="py-24 px-4 md:px-8 border-b border-white/10 bg-[#0f1013] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-6">
          <div>
            <SysLabel text="THE_ARCHITECTURE" className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">How The Engine Works</h2>
          </div>
          <p className="font-mono text-sm text-white/50 max-w-md text-left md:text-right mt-4 md:mt-0">
            From raw intent to real-world action. See how data flows efficiently across your dynamically generated integrations.
          </p>
        </div>

        {/* The Schematic Diagram */}
        <div className="relative w-full rounded-2xl bg-dark-void p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 border border-white/5 shadow-2xl">
          
          {/* Background wiring (SVG) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:flex items-center justify-center opacity-40">
            <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-lemony-yellow to-transparent relative">
              <div className="absolute top-1/2 left-0 w-16 h-[2px] bg-lemony-yellow shadow-[0_0_10px_#F7FF72] -translate-y-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-[2px] bg-purple-500 shadow-[0_0_10px_#A855F7] -translate-y-1/2 animate-[pulse_2.5s_ease-in-out_infinite]"></div>
              <div className="absolute top-1/2 left-2/3 w-16 h-[2px] bg-green-500 shadow-[0_0_10px_#22C55E] -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite]"></div>
            </div>
          </div>

            {/* Block 1: Trigger */}
          <div className="relative z-10 w-full lg:w-64 bg-[#111216]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-lemony-yellow/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-lemony-yellow/10 group-hover:text-lemony-yellow transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-lemony-yellow blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Network className="w-6 h-6 relative z-10" />
            </div>
            <h3 className="font-bold text-xl uppercase mb-3 text-white/90">Observe</h3>
            <p className="font-mono text-xs text-white/50 mb-6 leading-relaxed">The sensory input. The agent continuously monitors via webhooks or polling.</p>
            <div className="space-y-3 font-mono text-[10px] text-white/40">
              <div className="flex justify-between border-b border-white/5 pb-2"><span>CRON</span><span className="text-lemony-yellow">SUPPORTED</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span>WEBHOOK</span><span className="text-lemony-yellow">SUPPORTED</span></div>
              <div className="flex justify-between"><span>POLLING</span><span className="text-lemony-yellow">SUPPORTED</span></div>
            </div>
          </div>

          {/* Block 2: Intelligence */}
          <div className="relative z-10 w-full lg:w-80 bg-lemony-yellow/5 backdrop-blur-md border border-lemony-yellow/40 rounded-2xl p-8 group shadow-[0_0_40px_rgba(247,255,114,0.05)] hover:shadow-[0_0_50px_rgba(247,255,114,0.15)] transition-all duration-300 scale-100 lg:scale-110">
            <div className="w-16 h-16 rounded-full bg-lemony-yellow flex items-center justify-center mb-6 text-dark-void shadow-[0_0_20px_#F7FF72] relative overflow-hidden mx-auto">
              <Cpu className="w-8 h-8 relative z-10" />
            </div>
            <h3 className="font-black text-2xl uppercase mb-3 text-lemony-yellow text-center tracking-wide">Synthesize</h3>
            <p className="font-mono text-xs text-lemony-yellow/70 mb-6 leading-relaxed text-center">
              The reasoning cortex. LLMs read the context, parse your documentation, and make confident autonomous decisions.
            </p>
            <div className="bg-dark-void/80 border border-lemony-yellow/30 p-3 rounded font-mono text-xs text-lemony-yellow/80 space-y-1 shadow-inner">
              <p>{'>'} Context window: 128k</p>
              <p>{'>'} Dynamic MCP: Enabled</p>
              <p>{'>'} Self-Correction: Ative</p>
            </div>
          </div>

          {/* Block 3: Action */}
          <div className="relative z-10 w-full lg:w-64 bg-[#111216]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-green-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-green-500/10 group-hover:text-green-400 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Zap className="w-6 h-6 relative z-10" />
            </div>
            <h3 className="font-bold text-xl uppercase mb-3 text-white/90">Execute</h3>
            <p className="font-mono text-xs text-white/50 mb-6 leading-relaxed">The physical effector. Making API calls, database writes, or dispatching messages.</p>
            <div className="space-y-3 font-mono text-[10px] text-white/40">
              <div className="flex justify-between border-b border-white/5 pb-2"><span>REST_API</span><span className="text-green-400">READY</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span>GRAPHQL</span><span className="text-green-400">READY</span></div>
              <div className="flex justify-between"><span>SMTP/SMS</span><span className="text-green-400">READY</span></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- MCP SERVER SYNTHESIS (Secondary Section) ---
const MCPServerSynthesis = () => {
  return (
    <section className="py-24 px-4 md:px-8 border-b border-white/10 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background radial fade for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(247,255,114,0.03)_0%,transparent_80%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <SysLabel text="PROTOCOL_ON_THE_FLY" className="mb-4 mx-auto opacity-50" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-white/90">
            Plug In Your App. <br className="md:hidden" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lemony-yellow to-white">Get An Agent.</span>
          </h2>
          <p className="text-white/60 font-mono text-base md:text-lg leading-relaxed">
            Convert any tool, database, or API into a context-aware autonomous workforce. Axonyx dynamically reads your schema and synthesizes a production-ready <strong className="text-white">Model Context Protocol (MCP)</strong> server in seconds—giving your software its own AI brain.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 relative mt-16">
          
          {/* Step 1 */}
          <div className="bg-dark-void border border-white/10 p-8 flex flex-col items-center text-center relative group hover:border-blue-500/50 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)]">
            <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center font-black text-lg text-white/50 bg-[#16171c] border border-white/10 rounded-full group-hover:text-blue-400 group-hover:border-blue-500/50 transition-colors shadow">1</div>
            <div className="w-20 h-20 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Database className="w-10 h-10 relative z-10" />
            </div>
            <h3 className="font-bold text-xl uppercase mb-4 tracking-wider text-white/90 group-hover:text-blue-400 transition-colors">Paste Your Schema</h3>
            <p className="text-white/50 text-sm font-mono leading-relaxed">
              Drop a link to your API documentation, a Swagger file, or your Supabase database schema. Our engine instantly analyzes your operations and object models.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111216] border border-lemony-yellow/50 p-8 flex flex-col items-center text-center relative group transform md:-translate-y-6 rounded-2xl shadow-[0_10px_40px_rgba(247,255,114,0.05)] hover:shadow-[0_15px_50px_rgba(247,255,114,0.15)] hover:border-lemony-yellow transition-all duration-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center font-black text-lg text-dark-void bg-lemony-yellow rounded-full shadow-lg">2</div>
            <div className="w-20 h-20 rounded-2xl bg-lemony-yellow/10 border border-lemony-yellow/50 flex items-center justify-center mb-6 text-lemony-yellow relative overflow-hidden">
              <div className="absolute inset-0 bg-lemony-yellow blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Code2 className="w-10 h-10 relative z-10" />
            </div>
            <h3 className="font-bold text-xl uppercase mb-4 tracking-wider text-lemony-yellow">Auto-Generate MCP</h3>
            <p className="text-lemony-yellow/70 text-sm font-mono leading-relaxed">
              We dynamically compile a flawless Python MCP server handling transport, routing, and tool calling, and instantly provision it in a secure E2B micro-VM sandbox.
            </p>
            <div className="mt-8 bg-dark-void border border-lemony-yellow/30 text-lemony-yellow py-2 px-6 rounded-full text-xs font-bold font-mono uppercase tracking-widest flex items-center gap-3">
              <Activity className="w-4 h-4 animate-pulse" /> Sandbox Initialized
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-dark-void border border-white/10 p-8 flex flex-col items-center text-center relative group hover:border-green-500/50 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-[0_10px_40px_rgba(34,197,94,0.1)]">
             <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center font-black text-lg text-white/50 bg-[#16171c] border border-white/10 rounded-full group-hover:text-green-400 group-hover:border-green-500/50 transition-colors shadow">3</div>
             <div className="w-20 h-20 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
               <div className="absolute inset-0 bg-green-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
               <MessageCircle className="w-10 h-10 relative z-10" />
             </div>
             <h3 className="font-bold text-xl uppercase mb-4 tracking-wider text-white/90 group-hover:text-green-400 transition-colors">Agent Takes Control</h3>
             <p className="text-white/50 text-sm font-mono leading-relaxed">
               Connect your preferred LLM. Since the MCP server provides native capabilities, simply say: "Find the top client and offer a 10% discount", and it works flawlessly.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- LIVE TELEMETRY ---
const LiveTelemetry = () => {
  const [logs, setLogs] = useState([
    { id: 'AG-992', intent: 'Sync Stripe to Notion', status: 'SLEEPING', time: '12s ago' },
    { id: 'AG-401', intent: 'Find Highest Paying Client', status: 'EXECUTING', time: 'Just now' },
    { id: 'AG-773', intent: 'Apply 10% Discount via API', status: 'COMPLETED', time: '2m ago' },
    { id: 'AG-112', intent: 'Auto-reply Support Emails', status: 'SLEEPING', time: '5m ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev];
        // Randomly change a status to make it feel alive
        const randomIndex = Math.floor(Math.random() * newLogs.length);
        const statuses = ['SLEEPING', 'EXECUTING', 'COMPLETED'];
        newLogs[randomIndex].status = statuses[Math.floor(Math.random() * statuses.length)];
        newLogs[randomIndex].time = 'Just now';
        return newLogs;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6">
          <div>
            <SysLabel text="LIVE_MONITORING" className="mb-4 text-white/50" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Live Fleet Telemetry</h2>
          </div>
          <p className="font-mono text-sm text-white/50 mt-4 max-w-sm text-left md:text-right">
            Monitor your deployed agents and generated MCP connections in real-time. Zero hallucinations allowed.
          </p>
        </div>

        <div className="border border-white/10 rounded-xl bg-[#111216]/50 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 p-4 border-b border-white/10 font-mono text-xs text-white/40 uppercase bg-dark-void">
            <div className="col-span-1">Agent_ID</div>
            <div className="col-span-2">Core_Intent</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 hidden md:block text-right">Last_Ping</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col font-mono text-sm">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  key={log.id}
                  layout
                  className="grid grid-cols-4 md:grid-cols-5 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors"
                >
                  <div className="col-span-1 text-lemony-yellow">{log.id}</div>
                  <div className="col-span-2 text-white/80 truncate pr-4">{log.intent}</div>
                  <div className="col-span-1">
                    <span className={`px-2 py-1 text-[10px] border ${
                      log.status === 'EXECUTING' ? 'bg-lemony-yellow/10 border-lemony-yellow text-lemony-yellow animate-pulse' :
                      log.status === 'COMPLETED' ? 'bg-green-500/10 border-green-500 text-green-400' :
                      'bg-white/5 border-white/20 text-white/40'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="col-span-1 hidden md:block text-right text-white/30 text-xs">{log.time}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Terminal Footer */}
          <div className="bg-dark-void p-4 font-mono text-xs text-white/40 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>All agents operating within defined parameters. Zero hallucinations detected.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CTA: DEPLOYMENT CONSOLE ---
const DeploymentConsole = () => {
  return (
    <section className="py-32 px-4 md:px-8 bg-[#0a0a0c] relative overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-lemony-yellow/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center w-full">
        <SysLabel text="SYSTEM_READY" className="mb-6 text-white/50" />
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 text-white drop-shadow-lg">
          Deploy Your <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lemony-yellow to-white">First Agent.</span>
        </h2>
        
        <div className="bg-[#111216] border border-white/20 rounded-xl p-2 shadow-[0_0_50px_rgba(247,255,114,0.05)] mx-auto max-w-lg mt-12 text-center relative group hover:border-lemony-yellow/50 transition-colors duration-500">
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-lemony-yellow rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-lemony-yellow rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="bg-[#0a0a0c] rounded-lg p-8 flex flex-col items-center justify-center gap-6 border border-white/5">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-2xl font-bold text-white/90">Experience the Engine</h3>
              <p className="text-white/50 font-mono text-sm max-w-xs">Join the private beta to compile your first agent and generate MCP servers instantly.</p>
            </div>
            
            <button 
              data-tally-open="KYDZPK" 
              data-tally-emoji-animation="wave"
              className="w-full bg-lemony-yellow text-dark-void px-8 py-5 rounded font-black uppercase tracking-widest hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(247,255,114,0.4)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              Access Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <p className="mt-8 font-mono text-sm text-white/30 uppercase tracking-widest">
          Try It Right Away • Zero Setup Required
        </p>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-dark-void text-white selection:bg-lemony-yellow selection:text-dark-void overflow-x-hidden font-sans">
      <SystemBar />
      <main>
        <IntentCompiler />
        <MCPServerSynthesis />
        <EngineSchematic />
        <LiveTelemetry />
        <DeploymentConsole />
      </main>
      
      <footer className="bg-dark-void border-t border-white/10 py-6 px-8 font-mono text-xs text-white/40 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>AXONYX_SYSTEMS © {new Date().getFullYear()}</div>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/krishna-manu-chaithanya-k-b683a6275/" target="_blank" rel="noopener noreferrer" className="hover:text-lemony-yellow transition-colors">MANU'S LINKEDIN</a>
          <a href="https://www.linkedin.com/in/nitin-s-2b445926a/" target="_blank" rel="noopener noreferrer" className="hover:text-lemony-yellow transition-colors">NITIN'S LINKEDIN</a>
          <a href="https://www.linkedin.com/in/keerthivasan-t/" target="_blank" rel="noopener noreferrer" className="hover:text-lemony-yellow transition-colors">KV'S LINKEDIN</a>
        </div>
      </footer>
    </div>
  );
}


