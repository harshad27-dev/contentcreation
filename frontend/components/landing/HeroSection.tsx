"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const terminalRef = useRef<HTMLDivElement>(null);

  const scriptText = `> Initializing ScriptAI v2.0...
> Analyzing niche: Minecraft Gaming
> Selecting Model: GPT-4-Turbo
> Structuring Hook...
[HOOK] "Did you know you've been playing Minecraft wrong?"
> Pulling 14 royalty-free clips...
> Generating Voice: Energetic Male
> Syncing subtitles...
> RENDER COMPLETE. Time: 4.2 seconds.`;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.innerHTML = "";
      let i = 0;
      const typeNext = () => {
        if (i < scriptText.length && terminalRef.current) {
          terminalRef.current.innerHTML +=
            scriptText.charAt(i) === "\n" ? "<br/>" : scriptText.charAt(i);
          i++;
          setTimeout(typeNext, Math.random() * 25 + 8);
        }
      };
      setTimeout(typeNext, 600);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 bg-white">
      {/* Grainy texture */}
      <div className="absolute inset-0 grainy-bg" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Stacked blocks */}
        <div className="flex flex-col gap-5" style={{ transform: "rotate(-1.5deg)" }}>
          <div
            className="bg-[#FFD600] border-[8px] border-black p-8 relative"
            style={{
              boxShadow: "8px 8px 0px 0px #000000",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "")}
          >
            <h1 className="text-7xl md:text-9xl font-headline tracking-tighter uppercase leading-none text-black">
              SCRIPT
            </h1>
            <p className="mt-3 font-headline font-bold text-lg uppercase max-w-sm text-black">
              Raw intelligence → cinematic narrative strings.
            </p>
          </div>
          <div
            className="bg-[#0057FF] border-[8px] border-black p-6"
            style={{
              boxShadow: "8px 8px 0px 0px #000000",
              transform: "translateX(48px) translateY(-12px)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateX(32px) translateY(-12px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateX(48px) translateY(-12px)")}
          >
            <h2 className="text-5xl md:text-7xl font-headline tracking-tighter uppercase leading-none text-white">
              CLIPS
            </h2>
          </div>
          <div className="flex gap-5" style={{ transform: "translateX(16px)" }}>
            <div
              className="bg-[#FF3B30] border-[8px] border-black p-6 flex-1"
              style={{
                boxShadow: "8px 8px 0px 0px #000000",
                transform: "rotate(-2deg)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(-2deg)")}
            >
              <h2 className="text-4xl md:text-6xl font-headline tracking-tighter uppercase leading-none text-white">
                VOICE
              </h2>
            </div>
            <div
              className="bg-white border-[8px] border-black p-6 flex-1"
              style={{
                boxShadow: "8px 8px 0px 0px #000000",
                transform: "rotate(5deg)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(5deg)")}
            >
              <h2 className="text-4xl md:text-6xl font-headline tracking-tighter uppercase leading-none text-black">
                VIDEO
              </h2>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col justify-center items-start" style={{ transform: "rotate(1deg)" }}>
          <h2 className="text-5xl md:text-7xl font-headline uppercase leading-tight mb-6 text-black tracking-tighter">
            The End of{" "}
            <span className="bg-black text-white px-2">Boring</span> Content.
          </h2>
          <p
            className="text-xl font-semibold mb-8 max-w-md border-l-[8px] border-black pl-6 py-2 text-black"
          >
            ScriptAI doesn't just generate text. It constructs visual ecosystems.
            Hard-hitting, high-contrast, AI-driven media at the speed of thought.
          </p>

          <div className="flex flex-wrap gap-4 w-full mb-8">
            <Link
              href="/register"
              id="hero-cta-primary"
              className="bg-[#FFD600] border-[8px] border-black px-7 py-5 text-xl font-headline uppercase tracking-tighter flex items-center gap-3 group"
              style={{ boxShadow: "8px 8px 0px 0px #000000", transition: "all 0.1s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px 0px #000000";
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0px 0px #000000";
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              }}
            >
              Build Your Legacy
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {["MR", "SJ", "TL"].map((init) => (
                <div
                  key={init}
                  className="w-12 h-12 border-[3px] border-black bg-[#FFD600] flex items-center justify-center font-headline text-xs font-black text-black"
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="font-headline font-black uppercase text-xs leading-tight text-black">
              Joined by 12,000+<br />Subversive Creators
            </p>
          </div>

          {/* Terminal */}
          <div
            className="mt-10 w-full border-[6px] border-black bg-black overflow-hidden"
            style={{ boxShadow: "8px 8px 0px 0px #000000" }}
          >
            <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b-[3px] border-black gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF3B30]" />
              <div className="w-3 h-3 rounded-full bg-[#FFD600]" />
              <div className="w-3 h-3 rounded-full bg-[#30d158]" />
              <span className="ml-4 text-xs font-mono text-white/40">scriptai-engine-v2.sh</span>
            </div>
            <div className="p-5 font-mono text-sm text-[#30d158] h-52 overflow-y-auto leading-relaxed scrollbar-hide">
              <div ref={terminalRef} className="whitespace-pre-wrap" />
              <span className="animate-pulse inline-block w-2 h-4 bg-[#30d158] align-middle ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
