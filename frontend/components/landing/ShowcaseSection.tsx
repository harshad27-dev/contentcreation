"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax layers setup
    gsap.to(bgRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(midRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(fgRef.current, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="flex-1 space-y-8 z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            See the <span className="text-[var(--accent-glow)]">Magic</span> Happen
          </h2>
          <p className="text-xl text-[var(--text-muted)]">
            Watch as your text prompt transforms into a high-retention video complete with transitions, dynamic text, and perfectly timed music.
          </p>
          
          <ul className="space-y-4">
            {[
              "1080p and 4K Export Options",
              "100+ Premium AI Voices",
              "Auto-generated timestamps and hooks",
              "Viral hashtag generation"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <CheckCircle2 className="text-[var(--accent-primary)] w-6 h-6" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 relative w-full h-[600px] flex items-center justify-center perspective-1000">
          <div ref={containerRef} className="relative w-full max-w-sm h-[500px] transform-style-preserve-3d -rotate-y-12 rotate-x-12">
            
            {/* Background Parallax Layer */}
            <div ref={bgRef} className="absolute inset-0 bg-[var(--accent-primary)]/20 rounded-3xl blur-2xl transform translate-z-[-100px]" />
            
            {/* Mid Parallax Layer: The Phone Frame */}
            <div ref={midRef} className="absolute inset-0 bg-[#111] rounded-[2rem] border border-white/10 shadow-2xl p-3 flex flex-col will-change-transform">
              <div className="w-full flex-1 rounded-[1.5rem] bg-black relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
                 {/* Fake TikTok/Shorts UI overlay */}
                 <div className="absolute right-3 bottom-20 flex flex-col gap-4 items-center z-20">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md" />
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md" />
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md" />
                 </div>
                 <div className="absolute left-4 bottom-8 right-16 z-20">
                   <div className="h-4 w-2/3 bg-white/40 rounded mb-2" />
                   <div className="h-3 w-1/2 bg-white/20 rounded" />
                 </div>
              </div>
            </div>
            
            {/* Foreground Parallax Layer: Floating UI Elements */}
            <div ref={fgRef} className="absolute -right-12 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-xl transform translate-z-[100px] will-change-transform">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-bold">Render Complete</div>
                  <div className="text-xs text-white/60">00:45 • 4K Quality</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-xl transform translate-z-[150px] will-change-transform">
              <div className="text-sm font-bold text-[var(--accent-glow)] mb-1">Retention Score</div>
              <div className="text-2xl font-black">94%</div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
