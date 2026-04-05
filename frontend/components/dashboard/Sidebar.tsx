"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Video,
  Mic,
  Clapperboard,
  CalendarDays,
  LineChart,
  Settings,
  LogOut,
  Play,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Scripts", href: "/dashboard/scripts", icon: FileText },
    { label: "Video Library", href: "/dashboard/videos", icon: Video },
    { label: "Voiceover", href: "/dashboard/voiceover", icon: Mic },
    { label: "Timeline", href: "/dashboard/timeline", icon: Clapperboard },
    { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
    { label: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Hamburger Header (Visible only on deeply mobile screens) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#0A0A0A] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--accent-red)] rounded border border-[var(--accent-red-glow)] flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bebas text-xl tracking-widest text-white mt-1">SCRIPT<span className="text-[var(--accent-red)]">AI</span></span>
        </div>
        <button className="text-white" onClick={() => setIsMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-[#0A0A0A] border-r border-[var(--card-border)] z-50 flex flex-col transition-all duration-300
        ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 lg:w-64 md:w-20"}
      `}>
        
        {/* Brand / Close Desktop+Mobile */}
        <div className="h-20 flex items-center justify-between px-4 lg:px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 md:justify-center lg:justify-start w-full">
            <div className="w-8 h-8 rounded shrink-0 bg-[var(--accent-red)] flex items-center justify-center shadow-[0_0_10px_rgba(255,45,45,0.4)]">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bebas text-2xl tracking-widest text-white mt-1 block md:hidden lg:block">SCRIPT<span className="text-[var(--accent-red)]">AI</span></span>
          </Link>
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard");
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-space text-sm font-medium transition-all group relative ${
                  isActive 
                    ? "bg-[var(--accent-red)]/10 text-[var(--accent-red)]" 
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--accent-red)] rounded-r-md shadow-[0_0_10px_rgba(255,45,45,0.8)]"></div>
                )}
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[var(--accent-red)]' : 'text-white/50 group-hover:text-white'}`} />
                <span className="block md:hidden lg:block whitespace-nowrap">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Badge Area */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-red)] to-orange-500 flex items-center justify-center font-bebas text-lg text-white shrink-0 shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="hidden lg:block overflow-hidden">
              <div className="font-space text-sm font-bold text-white truncate">{user?.name || "Creator"}</div>
              <div className="text-[10px] font-bebas uppercase tracking-widest text-[var(--accent-green)] mt-0.5">Creator Plan</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg text-sm font-space text-[var(--text-muted)] hover:text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block">Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setIsMobileOpen(false)}></div>
      )}
    </>
  );
}
