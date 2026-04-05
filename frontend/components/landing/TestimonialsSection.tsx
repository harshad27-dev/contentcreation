"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "Is it actually real-time?",
    a: "Yes. Our edge-computing nodes handle inference in under 40ms. If you have a gigabit connection, you won't see a single frame of lag.",
    bg: "#ffffff",
  },
  {
    q: "Who owns the rights?",
    a: "On any paid plan, you own 100% of the commercial rights. We don't take royalties, we don't take credit. It's your weapon.",
    bg: "#FFD600",
  },
  {
    q: "Can I use my own voice?",
    a: "Our 'Script' and 'Studio' tiers include high-fidelity voice cloning. Upload 30 seconds of audio, and we build a neural clone.",
    bg: "#ffffff",
  },
  {
    q: "How do I cancel?",
    a: "One click. No dark patterns. No 'talk to a customer success representative.' If you're done, you're done.",
    bg: "#ffffff",
  },
];

const testimonials = [
  {
    initials: "MR",
    name: "Marcus R.",
    niche: "Gaming Highlights",
    quote: "Cut my workflow from 6 hours per video down to 10 minutes. The Minecraft background footage looks totally native to my content.",
    color: "#FFD600",
  },
  {
    initials: "SJ",
    name: "Sarah J.",
    niche: "Motivational Shorts",
    quote: "The deep male AI voice is indistinguishable from the top motivation channels. I pumped out 30 videos in one afternoon.",
    color: "#FF3B30",
    textWhite: true,
  },
  {
    initials: "TL",
    name: "Tyson L.",
    niche: "True Crime Narratives",
    quote: "ScriptAI's structuring is genuinely terrifying. It holds retention better than editors I was paying $50/hour.",
    color: "#0057FF",
    textWhite: true,
  },
];

export default function TestimonialsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#f3f3f4] border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-headline uppercase tracking-tighter mb-4 text-black italic">
            CREATOR VERIFIED
          </h2>
          <div className="flex gap-1 mb-16">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-[#FFD600] text-3xl font-black" style={{ WebkitTextStroke: "2px #000000" }}>★</span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="border-[8px] border-black p-8 flex flex-col gap-4 relative"
                style={{
                  background: t.color,
                  boxShadow: "8px 8px 0px 0px #000000",
                  transform: i === 0 ? "rotate(-1deg)" : i === 2 ? "rotate(1deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = i === 0 ? "rotate(-1deg)" : i === 2 ? "rotate(1deg)" : "rotate(0deg)")}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 border-[4px] border-black flex items-center justify-center font-headline text-lg font-black"
                    style={{ background: t.textWhite ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)", color: t.textWhite ? "#ffffff" : "#000000" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-headline uppercase text-lg" style={{ color: t.textWhite ? "#ffffff" : "#000000" }}>{t.name}</div>
                    <div className="text-xs font-headline uppercase tracking-wider" style={{ color: t.textWhite ? "#FFD600" : "rgba(0,0,0,0.5)" }}>{t.niche}</div>
                  </div>
                </div>
                <p className="text-base font-medium leading-relaxed italic flex-1" style={{ color: t.textWhite ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white border-b-[6px] border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-headline uppercase tracking-tighter mb-16 text-center text-black">
            DON&apos;T ASK TWICE
          </h2>
          <div className="border-t-[8px] border-black">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b-[8px] border-black cursor-pointer"
                style={{ background: openFaq === i ? faq.bg : "#ffffff" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex justify-between items-center px-6 py-6">
                  <h4 className="text-xl font-headline uppercase text-black">{faq.q}</h4>
                  <span
                    className="text-3xl font-black text-black transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-6 font-medium text-lg leading-relaxed text-black/80">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-6 bg-[#0057FF] text-white border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-headline uppercase tracking-tighter mb-20 text-white italic">
            THE FUTURE IS LOUD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative border-l-[6px] md:border-l-0 md:border-t-[6px] border-white">
            {[
              { phase: "PHASE 01 // Q2 2026", title: "MVP Launch", desc: "Initial release of the core engine. Automated script-to-video for gaming channels live for beta users.", dotColor: "#ffffff" },
              { phase: "PHASE 02 // Q3 2026", title: "Growth & Subtitles", desc: "Dynamic, animated subtitles that adapt to voice tone. Viral template library integration.", dotColor: "#FF3B30" },
              { phase: "PHASE 03 // Q4 2026", title: "Scale & Agency Tools", desc: "Bulk processing queues and team collaboration. API access for high-volume producers.", dotColor: "#FFD600" },
              { phase: "PHASE 04 // Q1 2027", title: "Platform & Marketplace", desc: "Custom model fine-tuning and a marketplace for community-built AI voice & video styles.", dotColor: "#000000" },
            ].map((item, i) => (
              <div key={i} className="p-8 relative">
                <div
                  className="hidden md:block absolute -top-7 -left-5 w-14 h-14 rounded-full border-[6px] border-black"
                  style={{ background: item.dotColor }}
                />
                <div
                  className="md:hidden absolute top-8 -left-[1.25rem] w-8 h-8 rounded-full border-[4px] border-black"
                  style={{ background: item.dotColor }}
                />
                <div className="text-[#FFD600] font-headline font-black mb-2 text-lg">{item.phase}</div>
                <h3 className="text-3xl font-headline uppercase mb-4 text-white">{item.title}</h3>
                <p className="font-medium opacity-80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
