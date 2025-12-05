import React, { useState, useEffect } from 'react';
import { Terminal, Battery, Wifi, ShieldCheck, ChevronDown, Power } from 'lucide-react';
import { HEADER_DATA, INTRO_TEXT, BLOCKS, SUMMARY } from './constants';
import { GlitchText } from './components/GlitchText';
import { CyberCard } from './components/CyberCard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initial boot sequence simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-[#00ff41] font-mono">
        <div className="w-64 space-y-2">
          <div className="h-1 w-full overflow-hidden bg-zinc-900">
            <div className="h-full animate-[progress_1.5s_ease-in-out] bg-[#00ff41]" style={{ width: '100%' }}></div>
          </div>
          <p className="typing-cursor text-xs">INITIALIZING SYSTEM PROTOCOLS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-zinc-300 selection:bg-[#00ff41] selection:text-black">
      {/* CRT Scanline Overlay */}
      <div className="scanlines z-[100]"></div>

      {/* Fixed HUD Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#00ff41]/20 bg-black/90 px-4 py-2 font-mono text-xs backdrop-blur-md md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#00ff41]">
              <Terminal size={14} />
              <span className="hidden sm:inline font-bold tracking-wider">{HEADER_DATA.title}</span>
              <span className="sm:hidden font-bold tracking-wider">CYBER.MVP</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-500">
             <div className="hidden md:flex items-center gap-2">
              <span>DATE: {HEADER_DATA.date}</span>
              <span className="text-zinc-700">|</span>
            </div>
             <div className="flex items-center gap-2">
              <span className="text-[#00ff41] animate-pulse">●</span>
              <span>{HEADER_DATA.status}</span>
            </div>
             <div className="hidden md:flex items-center gap-2 text-pink-500 font-bold">
              <ShieldCheck size={14} />
              <span>{HEADER_DATA.mode}</span>
            </div>
            <div className="flex gap-2">
               <Wifi size={14} />
               <Battery size={14} />
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-[#00ff41]" style={{ width: `${scrollProgress * 100}%` }} />
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-32">
        
        {/* Hero Section */}
        <section className="mb-24 flex min-h-[60vh] flex-col justify-center border-l-2 border-[#00ff41] bg-gradient-to-r from-[#00ff41]/5 to-transparent pl-6 md:pl-12">
          <div className="mb-4 inline-block rounded border border-[#00ff41] bg-[#00ff41]/10 px-2 py-1 font-mono text-xs text-[#00ff41]">
            SYSTEM_MESSAGE_INCOMING
          </div>
          <h1 className="mb-6 font-cyber text-4xl font-bold uppercase leading-tight tracking-tighter text-white md:text-6xl lg:text-7xl">
            <GlitchText text="WELCOME TO" />
            <br />
            <span className="text-[#00ff41]">THE MATRIX</span>
          </h1>
          <div className="max-w-2xl font-mono text-sm leading-relaxed text-zinc-400 md:text-base">
            <p className="whitespace-pre-line border-l-4 border-zinc-800 bg-zinc-900/50 p-4 pl-4">
              {INTRO_TEXT}
            </p>
          </div>
          
          <div className="mt-12 animate-bounce text-zinc-600">
            <ChevronDown />
          </div>
        </section>

        {/* Content Blocks */}
        <div className="space-y-32">
          {BLOCKS.map((block) => (
            <section key={block.id} className="relative">
              {/* Block Header */}
              <div className="mb-12 border-b border-zinc-800 pb-4">
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-4">
                     <div className="flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-900 text-[#00ff41]">
                       <block.icon size={24} />
                     </div>
                     <div>
                       <div className="font-mono text-xs text-zinc-500">{block.id} // ACCESS_GRANTED</div>
                       <h2 className="font-cyber text-2xl font-bold uppercase text-white md:text-3xl">
                         {block.title.split('.')[1] || block.title}
                       </h2>
                     </div>
                  </div>
                  <div className="hidden md:block font-cyber text-xl text-zinc-600">
                    {block.subtitle}
                  </div>
                </div>
                {/* Mobile Subtitle */}
                <div className="mt-2 md:hidden font-cyber text-lg text-zinc-600">
                    {block.subtitle}
                </div>
              </div>

              {/* Grid of Cards */}
              <div className="grid gap-6 md:grid-cols-1">
                {block.content.map((item, idx) => (
                  <CyberCard key={idx} item={item} index={idx} />
                ))}
              </div>

              {/* Footer Note */}
              {block.footer && (
                <div className="mt-8 flex items-start gap-2 rounded border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-500/80 font-mono">
                  <span className="shrink-0">⚠️</span>
                  <p>{block.footer}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Summary / Shutdown */}
        <section className="mt-32 border-t-2 border-dashed border-zinc-800 pt-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-cyber text-3xl font-bold text-white">
              <GlitchText text={SUMMARY.title} />
            </h2>
            <p className="text-zinc-500 font-mono">{SUMMARY.subtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {SUMMARY.points.map((point) => (
              <div key={point.id} className="border border-zinc-800 bg-black p-6 hover:border-pink-500 transition-colors group">
                <h3 className="mb-3 font-cyber text-lg text-white group-hover:text-pink-500">{point.title}</h3>
                <p className="text-sm text-zinc-400">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center justify-center gap-4 text-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 border border-[#00ff41] bg-[#00ff41]/10 px-8 py-3 font-mono text-sm font-bold text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all"
            >
              <Power size={16} />
              {SUMMARY.footer}
            </button>
            <p className="font-mono text-xs text-zinc-600">
              Иди и создавай будущее. Peace. ✌️
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
