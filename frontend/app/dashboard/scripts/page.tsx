"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Plus, Search, FileText, Clock, Settings2, Loader2, RefreshCw } from "lucide-react";
import gsap from "gsap";
import ScriptGeneratorModal from "@/components/dashboard/ScriptGeneratorModal";

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadScripts = async () => {
    setLoading(true);
    try {
      const response = await fetchApi("/scripts");
      if (response.success && response.data) {
        setScripts(response.data);
      } else {
        setScripts([]);
      }
    } catch (error) {
      console.error("Failed to fetch scripts:", error);
      setScripts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScripts();
  }, []);

  useEffect(() => {
    if (!loading && scripts.length > 0) {
      gsap.fromTo(
        ".script-card",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [loading, scripts.length]);

  const handleScriptCreated = (newScript: any) => {
    // Optimistically add it to the list
    setScripts(prev => [newScript, ...prev]);
  };

  const filteredScripts = scripts.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Your Scripts</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage and generate AI scripts for your channel.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-medium rounded-xl px-5 py-2.5 flex items-center justify-center gap-2 glow-btn transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Generate New
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search scripts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl px-4 py-2.5 text-sm transition-colors shrink-0">
          <Settings2 className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[var(--accent-glow)] animate-spin" />
          </div>
        ) : filteredScripts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No scripts found</h3>
            <p className="text-[var(--text-muted)] max-w-sm mb-6">
              {searchTerm ? "Try adjusting your search criteria." : "You haven't generated any scripts yet. Start building your content library."}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl px-4 py-2 transition-colors"
              >
                Generate First Script
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredScripts.map((script, i) => (
              <div key={script.id || i} className="script-card bg-[#0e0e12] border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--accent-primary)]/50 transition-colors group flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-glow)] text-xs font-semibold tracking-wide uppercase">
                      {script.format || "YouTube"}
                    </div>
                    <div className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${
                      script.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                      script.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                      'bg-white/10 text-white/70'
                    }`}>
                      {script.status || "Draft"}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {script.title || script.topic}
                  </h3>
                  
                  <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                    {script.content?.substring(0, 100) || "No preview available..."}
                  </p>
                </div>
                
                <div className="bg-white/[0.03] px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5" title="Tone">
                      <RefreshCw className="w-3.5 h-3.5" />
                      {script.tone || "General"}
                    </div>
                    <div className="flex items-center gap-1.5" title="Duration">
                      <Clock className="w-3.5 h-3.5" />
                      {script.duration || "N/A"}
                    </div>
                  </div>
                  <div>
                    {new Date(script.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ScriptGeneratorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleScriptCreated}
      />

    </div>
  );
}
