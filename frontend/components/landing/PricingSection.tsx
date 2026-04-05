"use client";

import React from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";

const plans = [
  {
    name: "SKETCH",
    price: "₹0",
    period: "",
    features: ["5 Minutes / Mo", "720p Export"],
    lacking: ["Commercial License"],
    cta: "Start Free",
    href: "/register",
    bg: "#ffffff",
    rotate: "-1deg",
  },
  {
    name: "SCRIPT",
    price: "₹1,499",
    period: "/mo",
    features: ["120 Minutes / Mo", "4K Ultra HD", "Voice Cloning", "Commercial Rights"],
    lacking: [],
    cta: "Buy Now",
    href: "/register",
    bg: "#FFD600",
    recommended: true,
    rotate: "0deg",
    scale: "1.05",
  },
  {
    name: "STUDIO",
    price: "₹2,999",
    period: "/mo",
    features: ["Unlimited Render", "API Access", "Custom Model Training"],
    lacking: [],
    cta: "Contact Sales",
    href: "/register",
    bg: "#ffffff",
    rotate: "1deg",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-9xl font-headline uppercase tracking-tighter mb-4 leading-none text-black">
          PICK YOUR{" "}
          <span className="bg-[#FF3B30] text-white px-3 inline-block"
            style={{ transform: "rotate(-1deg)", display: "inline-block" }}>
            WEAPON
          </span>
        </h2>
        <p className="text-xl font-semibold mb-16 max-w-xl border-l-[8px] border-[#0057FF] pl-6 py-1 text-black/70 mt-6">
          Transparent plans. Scale as your channel grows.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="border-[8px] border-black p-8 flex flex-col relative"
              style={{
                background: plan.bg,
                boxShadow: "8px 8px 0px 0px #000000",
                transform: `rotate(${plan.rotate}) ${plan.scale ? `scale(${plan.scale})` : ""}`,
                zIndex: plan.recommended ? 10 : 1,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = `rotate(0deg) ${plan.scale ? `scale(${plan.scale})` : ""}`)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = `rotate(${plan.rotate}) ${plan.scale ? `scale(${plan.scale})` : ""}`)}
            >
              {plan.recommended && (
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-headline uppercase text-xs tracking-widest whitespace-nowrap"
                  style={{ boxShadow: "3px 3px 0px 0px #FFD600" }}
                >
                  RECOMMENDED
                </div>
              )}

              <h3 className="text-3xl font-headline uppercase mb-2 text-black">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-6xl font-headline tracking-tighter text-black">{plan.price}</span>
                <span className="text-xl font-headline text-black/60">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 font-headline uppercase text-sm text-black">
                    <Check className="w-5 h-5 shrink-0 text-black" strokeWidth={3} />
                    {f}
                  </li>
                ))}
                {plan.lacking.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 font-headline uppercase text-sm text-black/30">
                    <X className="w-5 h-5 shrink-0" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                className="w-full py-4 font-headline uppercase text-xl text-center border-[6px] border-black block"
                style={{
                  background: plan.recommended ? "#000000" : "#ffffff",
                  color: plan.recommended ? "#FFD600" : "#000000",
                  boxShadow: "4px 4px 0px 0px #000000",
                  transition: "all 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0px 0px #000000";
                  (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px 0px #000000";
                  (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-20">
          <h3 className="text-5xl md:text-7xl font-headline uppercase tracking-tighter mb-10 text-black text-center">
            THE STRATEGIC EDGE
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-[8px] border-black">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-6 text-left text-2xl font-headline uppercase border-[4px] border-black text-white">CAPABILITY</th>
                  <th className="p-6 text-center text-2xl font-headline uppercase border-[4px] border-black bg-[#FFD600] text-black">SCRIPTAI</th>
                  <th className="p-6 text-center text-xl font-headline uppercase border-[4px] border-black opacity-40">LEGACY TOOLS</th>
                </tr>
              </thead>
              <tbody className="font-headline uppercase text-lg">
                {[
                  ["GAMING-FIRST LOGIC", true, "UNAVAILABLE"],
                  ["INDIAN LANGUAGES (HINDI/MARATHI)", true, "LIMITED"],
                  ["RETENTION-HACK SUBTITLES", true, "GENERIC"],
                  ["VOICE CLONING (RAW)", true, "EXTRA COST"],
                ].map(([cap, has, legacy], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"}>
                    <td className="p-6 border-[4px] border-black text-black">{cap as string}</td>
                    <td className="p-6 border-[4px] border-black text-center bg-[#FFD600]/20">
                      {has && <Check className="w-8 h-8 text-[#0057FF] mx-auto" strokeWidth={3} />}
                    </td>
                    <td className="p-6 border-[4px] border-black text-center text-black/30">{legacy as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
