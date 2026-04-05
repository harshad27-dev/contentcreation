"use client";

import React from "react";
import { BrainCircuit, Gamepad2, Mic, Captions, Upload, CalendarDays } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Script Generator",
    desc: "Produce highly-retaining scripts automatically structured for maximum watch time.",
    bg: "#FFD600",
    rotate: "-1deg",
  },
  {
    icon: Gamepad2,
    title: "Gameplay Library",
    desc: "10,000+ royalty-free GTA, Minecraft, and Parkour clips curated for retention.",
    bg: "#FF3B30",
    textWhite: true,
    rotate: "2deg",
  },
  {
    icon: Mic,
    title: "AI Voiceover",
    desc: "Cloned trending voices sounding 100% human. Emotion-driven TTS that understands sarcasm and hype.",
    bg: "#0057FF",
    textWhite: true,
    rotate: "-1deg",
  },
  {
    icon: Captions,
    title: "Auto Subtitles",
    desc: "Dynamic, highlighted captions synced natively with every single spoken word.",
    bg: "#ffffff",
    rotate: "1deg",
  },
  {
    icon: Upload,
    title: "YouTube Auto-Publish",
    desc: "API integration pushes your rendered mp4 and metadata straight to the platform.",
    bg: "#000000",
    textWhite: true,
    yellowAccent: true,
    rotate: "-2deg",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    desc: "Schedule weeks of daily uploads ahead of time on autopilot.",
    bg: "#FFD600",
    rotate: "1.5deg",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-headline uppercase tracking-tighter text-white mb-4 italic">
          RAW TECH
        </h2>
        <p className="text-xl font-semibold mb-16 max-w-xl border-l-[8px] border-[#FFD600] pl-6 py-1 text-white/70">
          Everything you need to automate a channel, packed into one brutalist engine.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="border-[8px] border-black p-8 flex flex-col gap-4"
                style={{
                  background: feat.bg,
                  boxShadow: "8px 8px 0px 0px #FFD600",
                  transform: `rotate(${feat.rotate})`,
                  transition: "transform 0.3s ease, box-shadow 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "rotate(0deg)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px 0px #FFD600";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = `rotate(${feat.rotate})`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0px 0px #FFD600";
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center border-[4px] border-black"
                  style={{ background: feat.textWhite ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: feat.yellowAccent ? "#FFD600" : feat.textWhite ? "#ffffff" : "#000000" }}
                  />
                </div>
                <h3
                  className="text-2xl font-headline uppercase tracking-tighter"
                  style={{ color: feat.textWhite ? "#ffffff" : "#000000" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: feat.textWhite ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)" }}
                >
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Model grid */}
        <div className="mt-16">
          <div className="mb-8 border-l-[8px] border-[#FF3B30] pl-6">
            <h3 className="text-4xl font-headline uppercase tracking-tighter text-white mb-2">CHOOSE YOUR BRAIN</h3>
            <p className="font-headline uppercase tracking-[0.2em] text-[#FFD600] text-sm">10+ INDUSTRIAL LLMS VIA OPENROUTER</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: "LLAMA 3", id: "SYS_01", hover: "#ffffff", hoverText: "#000000" },
              { name: "MISTRAL", id: "SYS_02", hover: "#FFD600", hoverText: "#000000" },
              { name: "GPT-4O", id: "SYS_03", hover: "#0057FF", hoverText: "#ffffff" },
              { name: "CLAUDE", id: "SYS_04", hover: "#FF3B30", hoverText: "#ffffff" },
              { name: "GEMINI", id: "SYS_05", hover: "#ffffff", hoverText: "#000000" },
              { name: "DEEPSEEK", id: "SYS_06", hover: "#FFD600", hoverText: "#000000" },
              { name: "QWEN", id: "SYS_07", hover: "#0057FF", hoverText: "#ffffff" },
            ].map((model) => (
              <div
                key={model.id}
                className="border-[3px] border-white p-3 font-headline uppercase text-center text-white cursor-pointer text-sm"
                style={{ transition: "background 0.15s ease, color 0.15s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = model.hover;
                  (e.currentTarget as HTMLElement).style.color = model.hoverText;
                  (e.currentTarget as HTMLElement).style.borderColor = model.hover === "#ffffff" ? "#000000" : model.hover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                }}
              >
                <div className="text-[9px] text-white/40 mb-1">{model.id}</div>
                {model.name}
              </div>
            ))}
          </div>

          {/* Live terminal line */}
          <div className="mt-8 p-5 border-[2px] border-dashed border-white/20 font-mono text-xs uppercase flex items-center gap-3 overflow-hidden">
            <span className="text-[#FF3B30] animate-pulse shrink-0">● LIVE_FEED:</span>
            <span className="whitespace-nowrap text-white/60">ROOT@SCRIPTAI: LOAD_MODEL(LLAMA_3_70B) --TOKENS: 4.2M/SEC --STATUS: OPTIMIZED --REG_ID: 9821-X-BRAIN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
