"use client";

import React from "react";
import { FileText, Cpu, Film, Share2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "TYPE TOPIC",
    desc: "Enter what your video should be about. One sentence is enough.",
    num: "01",
    color: "#FFD600",
  },
  {
    icon: Cpu,
    title: "PICK AI MODEL",
    desc: "Choose from 10+ LLMs via OpenRouter for perfect tone.",
    num: "02",
    color: "#0057FF",
    textWhite: true,
  },
  {
    icon: Film,
    title: "CLIPS + VOICE",
    desc: "Engine auto-pulls royalty-free gameplay & generates voice.",
    num: "03",
    color: "#FF3B30",
    textWhite: true,
  },
  {
    icon: Share2,
    title: "EXPORT & PUBLISH",
    desc: "Push the final mp4 directly to YouTube with one click.",
    num: "04",
    color: "#000000",
    textWhite: true,
    yellowAccent: true,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white border-b-[6px] border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-headline uppercase tracking-tighter mb-4 text-black italic">
          THE FLOW
        </h2>
        <p className="text-xl font-semibold mb-16 max-w-xl border-l-[8px] border-black pl-6 py-1 text-black/70">
          From raw idea to a published YouTube video in under 15 minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="border-[8px] border-black p-8 flex flex-col gap-4 relative"
                style={{
                  background: step.color,
                  boxShadow: "8px 8px 0px 0px #000000",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
              >
                {/* Step number */}
                <div
                  className="absolute -top-5 -right-5 w-10 h-10 border-[4px] border-black flex items-center justify-center font-headline text-sm font-black"
                  style={{
                    background: step.yellowAccent ? "#FFD600" : step.textWhite ? "#FFD600" : "#000000",
                    color: "#000000",
                  }}
                >
                  {step.num}
                </div>

                <div
                  className="w-14 h-14 border-[4px] border-black flex items-center justify-center"
                  style={{
                    background: step.textWhite ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: step.textWhite ? "#ffffff" : "#000000" }}
                  />
                </div>

                <h3
                  className="text-2xl font-headline uppercase tracking-tighter"
                  style={{ color: step.textWhite ? "#ffffff" : "#000000" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: step.textWhite ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
