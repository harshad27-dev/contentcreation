"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPart = pathParts[pathParts.length - 1] || "overview";
  const title = currentPart === "dashboard" ? "Dashboard" : currentPart.charAt(0).toUpperCase() + currentPart.slice(1);

  return (
    <header className="h-20 border-b border-[var(--card-border)] bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
      
      {/* Title */}
      <div className="flex-1 md:flex-none">
        <h1 className="font-bebas text-3xl text-white tracking-widest uppercase">{title}</h1>
      </div>

      {/* Global Search Center */}
      <div className="hidden md:flex flex-1 justify-center max-w-xl px-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search scripts, videos, assets..." 
            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded text-sm text-white placeholder:text-white/30 pl-11 pr-4 py-2.5 focus:outline-none focus:border-[var(--accent-red)] focus:bg-white/5 transition-colors font-space"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white/50 font-space font-bold">
            ⌘K
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 shrink-0">
        <button className="relative w-10 h-10 rounded flex items-center justify-center bg-[var(--card-bg)] border border-[var(--card-border)] text-white/70 hover:text-white hover:border-[var(--accent-red)]/50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--accent-red)] rounded-full shadow-[0_0_8px_rgba(255,45,45,0.8)]"></span>
        </button>

        <div className="w-10 h-10 rounded border border-white/20 bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center font-bebas text-lg text-white">
          {user?.name?.charAt(0).toUpperCase() || "C"}
        </div>
      </div>

    </header>
  );
}
