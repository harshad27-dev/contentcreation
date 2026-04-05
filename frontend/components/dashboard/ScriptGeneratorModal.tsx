import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { X, Sparkles, Loader2 } from "lucide-react";
import gsap from "gsap";

interface ScriptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newScript: any) => void;
}

export default function ScriptGeneratorModal({ isOpen, onClose, onSuccess }: ScriptGeneratorModalProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Energetic");
  const [format, setFormat] = useState("YouTube");
  const [duration, setDuration] = useState("8min");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".modal-panel",
        { x: "100%" },
        { x: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(".modal-panel", { x: "100%", duration: 0.3, ease: "power3.in" });
    gsap.to(".modal-overlay", { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetchApi("/scripts/generate", {
        method: "POST",
        body: JSON.stringify({
          topic,
          tone,
          duration,
          format,
          model: "gpt-4o",
          audience: "General"
        }),
      });

      if (response.success) {
        onSuccess(response.data);
        handleClose();
        // Reset form
        setTopic("");
        setTone("Energetic");
        setFormat("YouTube");
        setDuration("8min");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate script.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="modal-overlay absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md flex">
        <div className="modal-panel w-full h-full bg-[#0a0a0f] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent-glow)]" />
              Generate Script
            </h2>
            <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <form id="generate-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                  Topic / Prompt
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. 10 Hidden secrets in Minecraft you didn't know about"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent-primary)] transition-colors min-h-[120px] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                  Format
                </label>
                <select 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors appearance-none"
                >
                  <option value="YouTube">YouTube Long-Form</option>
                  <option value="Shorts">YouTube Shorts</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                  Tone
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors appearance-none"
                >
                  <option value="Energetic">Energetic (MrBeast Style)</option>
                  <option value="Professional">Professional / Educational</option>
                  <option value="Calm">Calm / ASMR</option>
                  <option value="Dramatic">Dramatic / Storytime</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                  Duration Setting
                </label>
                <div className="flex gap-3">
                  {["1min", "5min", "10min", "20min"].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
                        duration === d 
                          ? "bg-[var(--accent-primary)]/20 border-[var(--accent-primary)] text-[var(--accent-glow)]" 
                          : "bg-white/5 border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-[#0a0a0f]">
            <button
              form="generate-form"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white glow-btn transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating AI Script...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Script
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/40 mt-4">
              Estimated generation time: ~10-15 seconds.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
