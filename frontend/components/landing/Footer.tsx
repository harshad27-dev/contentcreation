import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t-[6px] border-black pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand block */}
          <div className="md:col-span-2">
            <div className="text-3xl font-headline uppercase text-[#FFD600] tracking-tighter italic mb-4">
              SCRIPTAI
            </div>
            <p className="text-white/60 text-sm font-medium max-w-xs leading-relaxed">
              The automated assembly line for faceless digital creators. Build, render, and publish at machine speed.
            </p>

            {/* Status badge */}
            <div
              className="mt-6 inline-block bg-[#FFD600] border-[4px] border-white px-4 py-2"
              style={{ boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)", transform: "rotate(-2deg)" }}
            >
              <span className="font-headline uppercase text-black text-sm font-black">Status: All Systems Go</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-headline uppercase text-white/40 tracking-[0.2em] text-xs mb-4">Social</h4>
            <ul className="space-y-3">
              {["Twitter", "Github", "YouTube"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-headline uppercase text-white hover:text-[#FFD600] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline uppercase text-white/40 tracking-[0.2em] text-xs mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: "Terms", href: "#" },
                { label: "Privacy", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-headline uppercase text-white hover:text-[#0057FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-[4px] border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-headline uppercase tracking-widest">
            © 2026 SCRIPTAI — NO PERMISSION GRANTED
          </p>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse" style={{ boxShadow: "0 0 8px rgba(48,209,88,0.8)" }} />
            <span className="font-headline uppercase text-white/40 text-xs tracking-widest">OPERATING NORMALLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
