"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full px-6 md:px-8 py-5 sticky top-0 z-50 bg-white border-b-[6px] border-black"
      style={{ boxShadow: "0 6px 0px 0px #000000" }}>
      {/* Brand */}
      <Link href="/" className="text-3xl font-headline text-black tracking-tighter italic select-none">
        Script<span style={{ color: "#FFD600", WebkitTextStroke: "2px #000000" }}>AI</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-8 items-center">
        {["Features", "Pricing", "Use Cases", "Docs"].map((item) => (
          <a
            key={item}
            href={item === "Pricing" ? "#pricing" : item === "Features" ? "#features" : item === "Use Cases" ? "#use-cases" : "#"}
            className="font-headline text-sm uppercase tracking-tight text-black/60 hover:bg-[#FFD600] hover:text-black transition-colors duration-100 px-2 py-1"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-4">
        {!loading && user ? (
          <>
            <Link
              href="/dashboard"
              className="font-headline text-sm uppercase tracking-tight font-bold text-black hover:text-[#0057FF] transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="font-headline text-sm uppercase tracking-tight font-bold text-black/50 hover:text-black transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="font-headline text-sm uppercase tracking-tight font-bold text-black/60 hover:text-black transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-[#FFD600] border-[4px] border-black px-5 py-2 font-headline text-sm uppercase tracking-tight font-black"
              style={{ boxShadow: "4px 4px 0px 0px #000000", transition: "all 0.1s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0px 0px #000000";
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px 0px #000000";
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden border-2 border-black p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-[6px] border-black flex flex-col z-50">
          {["Features", "Pricing", "Use Cases"].map((item) => (
            <a
              key={item}
              href={item === "Pricing" ? "#pricing" : item === "Features" ? "#features" : "#use-cases"}
              onClick={() => setMenuOpen(false)}
              className="font-headline uppercase tracking-tight font-bold text-black px-6 py-4 border-b-2 border-black/10 hover:bg-[#FFD600]"
            >
              {item}
            </a>
          ))}
          <div className="px-6 py-4 flex gap-4">
            <Link href="/login" onClick={() => setMenuOpen(false)}
              className="font-headline uppercase text-sm font-bold text-black/60">
              Log In
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}
              className="bg-[#FFD600] border-[3px] border-black px-4 py-1.5 font-headline text-sm uppercase font-black"
              style={{ boxShadow: "3px 3px 0px #000" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
