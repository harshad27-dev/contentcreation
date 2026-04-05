"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

const useCases = [
  {
    id: "gaming",
    title: "The Gaming Facts Creator",
    subtitle: "(Ravi)",
    story: "You want to run 3 channels covering Roblox, Minecraft, and GTA V, but you physically cannot edit that much content. ScriptAI automates gameplay background gathering and voices your trending scripts.",
    metric: "8 HOURS → 12 MINS",
    metricLabel: "Production Time",
    points: ["100% Royalty-Free Gameplay", "Trending Gamer Voices", "High-retention captions"],
    bg: "#FFD600",
    rotate: "-1deg",
  },
  {
    id: "motivational",
    title: "The Motivational Shorts Creator",
    subtitle: "(Priya)",
    story: "Building an audience with deep philosophical content over cinematic backgrounds. ScriptAI layers the deep male voiceover, auto-applies subtitles, and schedules to Shorts simultaneously.",
    metric: "2 SHORTS / DAY IN 20 MINS",
    metricLabel: "Output Velocity",
    points: ["Epic/Deep AI Voices", "Vertical 9:16 Auto-formatting", "Bulk Generation"],
    bg: "#FF3B30",
    textWhite: true,
    rotate: "2deg",
  },
  {
    id: "agency",
    title: "The Bulk Production Agency",
    subtitle: "(Enterprise)",
    story: "You manage Reddit-story or News channels for 10+ clients. ScriptAI handles the entire assembly line so your budget goes into client acquisition, not offshore editing teams.",
    metric: "250 VIDEOS / MONTH WITH 3 PEOPLE",
    metricLabel: "Scaling Logic",
    points: ["Multi-channel support", "API Access", "Custom Watermarks"],
    bg: "#0057FF",
    textWhite: true,
    rotate: "-2deg",
  },
];

export default function UseCasesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="use-cases" className="py-24 px-6 bg-white border-b-[6px] border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-headline uppercase tracking-tighter mb-4 text-black italic">
          WHO IS THIS FOR?
        </h2>
        <p className="text-xl font-semibold mb-16 max-w-xl border-l-[8px] border-[#FF3B30] pl-6 py-1 text-black/70">
          Three archetypes, one weapon. See how creators weaponize ScriptAI.
        </p>

        {/* Tab selectors */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {useCases.map((uc, i) => (
            <button
              key={uc.id}
              id={`use-case-tab-${uc.id}`}
              onClick={() => setActive(i)}
              className="flex-1 py-3 px-4 font-headline uppercase tracking-tight text-sm border-[4px] border-black text-left transition-all"
              style={{
                background: active === i ? "#000000" : "#ffffff",
                color: active === i ? "#FFD600" : "#000000",
                boxShadow: active === i ? "4px 4px 0px 0px #FFD600" : "none",
              }}
            >
              {uc.title.replace("The ", "")}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div
          key={active}
          className="border-[8px] border-black p-8 md:p-12 relative"
          style={{
            background: useCases[active].bg,
            boxShadow: "8px 8px 0px 0px #000000",
            transform: `rotate(${useCases[active].rotate})`,
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = `rotate(${useCases[active].rotate})`)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3
                className="text-4xl font-headline uppercase tracking-tighter mb-1"
                style={{ color: useCases[active].textWhite ? "#ffffff" : "#000000" }}
              >
                {useCases[active].title}
              </h3>
              <p
                className="text-xl font-headline italic mb-6"
                style={{ color: useCases[active].textWhite ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}
              >
                {useCases[active].subtitle}
              </p>
              <p
                className="text-base font-medium leading-relaxed mb-8"
                style={{ color: useCases[active].textWhite ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)" }}
              >
                {useCases[active].story}
              </p>
              <div className="flex flex-col gap-3">
                {useCases[active].points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check
                      className="w-5 h-5 shrink-0"
                      style={{ color: useCases[active].textWhite ? "#FFD600" : "#000000" }}
                    />
                    <span
                      className="font-headline uppercase text-sm"
                      style={{ color: useCases[active].textWhite ? "#ffffff" : "#000000" }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric block */}
            <div className="flex items-center justify-center">
              <div
                className="border-[6px] border-black p-8 text-center"
                style={{
                  background: useCases[active].textWhite ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.08)",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <div
                  className="text-xs font-headline uppercase tracking-widest mb-3"
                  style={{ color: useCases[active].textWhite ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}
                >
                  {useCases[active].metricLabel}
                </div>
                <div
                  className="text-3xl md:text-4xl font-headline uppercase tracking-tighter leading-tight"
                  style={{ color: useCases[active].textWhite ? "#FFD600" : "#000000" }}
                >
                  {useCases[active].metric}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
