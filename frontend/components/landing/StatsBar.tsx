"use client";

import React from "react";

export default function StatsBar() {
  // Marquee ticker + stats combined
  const stats = [
    { value: "98%", label: "REDUCTION IN RENDER TIME" },
    { value: "12M", label: "MINUTES GENERATED WEEKLY" },
    { value: "1.2B", label: "TOTAL API REQUESTS" },
    { value: "12K+", label: "ACTIVE CREATORS" },
  ];

  const tickerItems = [
    "NEW ENGINE V2.0 LIVE",
    "AI VOICE CLONING ACTIVE",
    "4K VIDEO GENERATION",
    "GAMING-FIRST LOGIC",
    "INDIAN LANGUAGE SUPPORT",
  ];

  return (
    <>
      {/* Marquee Ticker */}
      <div className="bg-black py-3 overflow-hidden border-b-[6px] border-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <React.Fragment key={i}>
              <span className="text-[#FFD600] font-headline uppercase text-lg mx-6">{item}</span>
              <span className="text-white text-xl mx-2">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <section className="py-16 px-6 bg-[#f3f3f4] border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white border-[6px] border-black p-6 text-center"
              style={{
                boxShadow: "6px 6px 0px 0px #000000",
                transform: i % 2 === 0 ? "rotate(1deg)" : "rotate(-1deg)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = i % 2 === 0 ? "rotate(1deg)" : "rotate(-1deg)")}
            >
              <div className="text-5xl font-headline tracking-tighter text-black mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-headline font-black uppercase tracking-widest text-black/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
