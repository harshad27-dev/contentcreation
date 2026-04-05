"use client";

import React, { useEffect } from "react";
import { 
  Film, 
  FileText, 
  Zap, 
  Users, 
  PenTool, 
  Gamepad2, 
  Mic2, 
  Upload, 
  MoreVertical, 
  PlaySquare, 
  Video, 
  Calendar,
  Plus
} from "lucide-react";
import gsap from "gsap";

export default function DashboardOverview() {
  
  useEffect(() => {
    gsap.fromTo(
      ".dash-module",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* 1. Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Film, label: "Videos Exported This Month", value: "23", trend: "+4 from last month", isPositive: true },
          { icon: FileText, label: "Scripts Generated", value: "47", trend: "-2 from last month", isPositive: false },
          { icon: Zap, label: "AI Credits Remaining", value: "53 / 100", trend: "Refills in 4 days", isPositive: true },
          { icon: Users, label: "YouTube Subscribers (connected channel)", value: "12,400", trend: "↑ 3.2%", isPositive: true },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="dash-module bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <Icon className="w-5 h-5 text-[var(--accent-red)]" />
              </div>
              <div className="mt-2">
                <div className="font-bebas text-4xl text-white tracking-widest">{stat.value}</div>
                <div className="text-xs font-space font-medium text-[var(--text-muted)] mt-1 h-8">{stat.label}</div>
                <div className={`text-xs font-space font-bold mt-3 ${stat.isPositive ? 'text-[var(--accent-green)]' : 'text-red-400'}`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 2. Quick Actions Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: PenTool, title: "New Script", subtitle: "Start with AI", glow: true },
          { icon: Gamepad2, title: "Browse Clips", subtitle: "Open video library", glow: false },
          { icon: Mic2, title: "Add Voiceover", subtitle: "Pick voice & generate", glow: false },
          { icon: Upload, title: "Publish Video", subtitle: "Export & upload to YouTube", glow: false },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={i} className={`dash-module flex items-center gap-4 bg-[#0F0F0F] border border-[var(--card-border)] rounded-lg p-5 text-left transition-all group ${
              action.glow ? 'hover:border-[var(--accent-red)] hover:shadow-[0_0_20px_rgba(255,45,45,0.2)]' : 'hover:border-[var(--accent-red)] hover:shadow-[0_0_15px_rgba(255,45,45,0.1)]'
            }`}>
              <div className="w-12 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent-red)]/10 group-hover:border-[var(--accent-red)] transition-colors">
                <Icon className="w-6 h-6 text-white group-hover:text-[var(--accent-red)] transition-colors" />
              </div>
              <div>
                <h3 className="font-bebas text-xl text-white tracking-wide uppercase group-hover:text-[var(--accent-red)] transition-colors">{action.title}</h3>
                <p className="text-xs font-space text-[var(--text-muted)]">{action.subtitle}</p>
              </div>
            </button>
          );
        })}
      </section>

      {/* 3. Recent Scripts Table */}
      <section className="dash-module bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--card-border)] flex items-center justify-between">
          <h2 className="font-bebas text-2xl tracking-widest text-white">Recent Scripts</h2>
          <button className="text-sm font-space text-[var(--accent-red)] hover:text-white transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-[var(--card-border)]">
                <th className="px-6 py-3 text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">AI Model</th>
                <th className="px-6 py-3 text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">Tone</th>
                <th className="px-6 py-3 text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">Length</th>
                <th className="px-6 py-3 text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)] font-space text-sm">
              {[
                { title: `"Top 10 Minecraft Seeds Nobody Knows"`, model: "LLaMA 3.1", tone: "Energetic", length: "8 min", status: "Ready" },
                { title: `"Never Give Up — Hindi Motivation"`, model: "Qwen 2.5", tone: "Dramatic", length: "60 sec", status: "Published" },
                { title: `"GTA 6 Easter Eggs Explained"`, model: "Claude Haiku", tone: "Informative", length: "6 min", status: "Draft" },
                { title: `"How to win Bedwars fast"`, model: "GPT-4o Mini", tone: "Energetic", length: "10 min", status: "Draft" },
                { title: `"Stoic quotes for hard times"`, model: "LLaMA 3.1", tone: "Calm", length: "60 sec", status: "Published" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-[200px] truncate" title={row.title}>{row.title}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{row.model}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{row.tone}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{row.length}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      row.status === 'Published' ? 'bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20' : 
                      row.status === 'Ready' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-white/5 text-[var(--text-muted)] border border-white/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--text-muted)] hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Video Library Preview */}
      <section className="dash-module">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="font-bebas text-2xl tracking-widest text-white">Video Library</h2>
          <button className="text-sm font-space text-[var(--accent-red)] hover:text-white transition-colors">Browse All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", tag: "Minecraft", dur: "10:04" },
            { img: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=400&q=80", tag: "GTA V", dur: "04:30" },
            { img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", tag: "Subway Surfers", dur: "01:00" },
            { img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80", tag: "Minecraft", dur: "12:15" },
            { img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80", tag: "GTA V", dur: "08:45" },
            { img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80", tag: "CS:GO Surf", dur: "15:00" },
          ].map((vid, i) => (
            <div key={i} className="min-w-[240px] w-[240px] shrink-0 group cursor-pointer">
              <div className="w-full h-32 rounded-lg bg-black relative border border-[var(--card-border)] overflow-hidden mb-3 group-hover:border-[var(--accent-red)]/50 transition-colors">
                <img src={vid.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt={vid.tag} />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm border border-white/10 text-white font-space text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{vid.tag}</div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm border border-white/10 text-white font-space text-[10px] px-2 py-0.5 rounded font-bold">{vid.dur}</div>
                <div className="absolute bottom-2 left-2 bg-[var(--accent-red)] text-white font-bebas text-xs px-1.5 rounded tracking-widest hidden group-hover:block transition-all shadow-[0_0_10px_rgba(255,45,45,0.8)]">1080P</div>
                <PlaySquare className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: AI Chart + YT Panel + Calendar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 5. AI Model Usage Chart */}
        <div className="dash-module bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bebas text-2xl tracking-widest text-white mb-2">AI Model Usage</h2>
            <p className="text-xs font-space text-[var(--text-muted)] mb-6">Distribution of your generation calls this month.</p>
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col justify-end">
            {[
              { name: "LLaMA 3.1", w: "35%", c: "bg-[var(--accent-red)] shadow-[0_0_10px_rgba(255,45,45,0.4)]" },
              { name: "Claude Haiku", w: "25%", c: "bg-white/80" },
              { name: "Qwen 2.5", w: "20%", c: "bg-white/50" },
              { name: "GPT-4o Mini", w: "20%", c: "bg-white/30" },
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between font-space text-[11px] font-bold text-white uppercase tracking-wider mb-1.5">
                  <span>{bar.name}</span>
                  <span>{bar.w}</span>
                </div>
                <div className="w-full bg-black border border-white/10 rounded-full h-2">
                  <div className={`h-2 rounded-full ${bar.c}`} style={{ width: bar.w }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Content Calendar Mini Preview */}
        <div className="dash-module bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bebas text-2xl tracking-widest text-white">Upload Calendar</h2>
            <Calendar className="w-5 h-5 text-[var(--text-muted)]" />
          </div>
          
          <div className="flex justify-between items-stretch flex-1 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const hasVideo = [1, 3, 4, 6].includes(i); // Random mock scheduled
              return (
                <div key={day} className="flex flex-col items-center flex-1">
                  <span className="font-space text-[10px] text-[var(--text-muted)] uppercase font-bold mb-2">{day}</span>
                  <div className={`w-full aspect-[2/3] rounded-sm flex items-center justify-center cursor-pointer transition-colors group relative ${
                    hasVideo ? 'bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 hover:bg-[var(--accent-red)]/20' : 'bg-black border border-white/5 hover:bg-white/5'
                  }`}>
                    {hasVideo ? (
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-red)] shadow-[0_0_8px_rgba(255,45,45,0.8)]"></div>
                    ) : (
                      <Plus className="w-4 h-4 text-white/20 group-hover:text-white/50" />
                    )}
                    {hasVideo && (
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-2 bg-black border border-white/10 p-2 text-white font-space text-[10px] w-24 rounded text-center pointer-events-none z-10 whitespace-normal">
                        Scheduled Release
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. YouTube Channel Stats Panel */}
        <div className="dash-module bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--accent-red)]/10 blur-[50px] pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full">
              <span className="font-bebas text-2xl text-black">MR</span>
            </div>
            <div>
              <h3 className="font-space font-bold text-white text-sm">Motivation Rings</h3>
              <p className="text-xs font-space text-[var(--accent-green)] flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse shadow-[0_0_5px_rgba(0,255,102,0.8)]"></span> Connected
              </p>
            </div>
          </div>

          <div className="space-y-4 font-space text-sm relative z-10">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[var(--text-muted)]">Total Views</span>
              <span className="font-bold text-white tracking-wide">284,000</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[var(--text-muted)]">Watch Time</span>
              <span className="font-bold text-white tracking-wide">1,240 hrs</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[var(--text-muted)]">Last Published</span>
              <span className="font-bold text-white tracking-wide">2 days ago</span>
            </div>
          </div>

          <div className="mt-auto pt-4 relative z-10">
            <div className="text-[10px] font-space text-[var(--text-muted)] uppercase font-bold mb-1">Top Video</div>
            <div className="bg-black/50 border border-white/10 rounded p-3 flex justify-between items-center text-xs">
              <span className="font-medium text-white truncate max-w-[130px]">"10 Minecraft Facts"</span>
              <span className="text-[var(--accent-green)] font-bold">48K views</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
