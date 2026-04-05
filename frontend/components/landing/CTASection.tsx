"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 px-6 flex justify-center bg-white">
      <div
        className="bg-black text-[#FFD600] border-[8px] border-black p-12 md:p-20 text-center max-w-5xl w-full relative"
        style={{
          boxShadow: "12px 12px 0px 0px #FFD600",
          transform: "rotate(-0.5deg)",
        }}
      >
        {/* Floating badge */}
        <div
          className="absolute -top-8 -left-6 bg-[#FF3B30] text-white px-6 py-2 font-headline uppercase text-lg"
          style={{
            boxShadow: "4px 4px 0px 0px #000000",
            transform: "rotate(12deg)",
          }}
        >
          LIMITED ACCESS
        </div>

        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 bg-[#FFD600] border-[6px] border-white flex items-center justify-center"
            style={{ boxShadow: "6px 6px 0px 0px rgba(255,255,255,0.3)" }}
          >
            <Rocket className="w-10 h-10 text-black" />
          </div>
        </div>

        <h2 className="text-5xl md:text-8xl font-headline uppercase leading-none mb-8 tracking-tighter text-[#FFD600]">
          JOIN THE SUBVERSION
        </h2>
        <p className="text-white text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto">
          Stop building like everyone else. Start building like you mean it.
          ScriptAI is open for beta innovators.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/register"
            id="cta-deploy-now"
            className="bg-[#FFD600] text-black border-[6px] border-white px-10 py-5 text-2xl font-headline uppercase flex items-center justify-center gap-3"
            style={{
              boxShadow: "6px 6px 0px 0px rgba(255,255,255,0.4)",
              transition: "all 0.1s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px 0px rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translate(3px, 3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px 0px rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
            }}
          >
            Deploy Now <ArrowRight className="w-6 h-6" />
          </Link>
          <button
            className="bg-white text-black border-[6px] border-white px-10 py-5 text-2xl font-headline uppercase"
            style={{
              boxShadow: "6px 6px 0px 0px rgba(255,255,255,0.2)",
              transition: "all 0.1s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px 0px rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translate(3px, 3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px 0px rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
            }}
          >
            Talk to Sales
          </button>
        </div>

        <p className="text-white/40 text-sm font-medium mt-8">No credit card required · Cancel anytime</p>
      </div>
    </section>
  );
}
