"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Mail,
  Lock,
  Zap,
  Terminal,
  Shield,
} from "lucide-react";

const systemNotes = [
  {
    icon: Zap,
    label: "Fast Launch",
    text: "Generate, voice, and package your first workflow without touching a timeline.",
    tone: "bg-[#FFD600]",
  },
  {
    icon: Terminal,
    label: "Clean Control",
    text: "Keep scripts, assets, and output steps in one operator console.",
    tone: "bg-white",
  },
  {
    icon: Shield,
    label: "Secure Access",
    text: "Session auth and protected dashboard flow are ready the moment you sign in.",
    tone: "bg-[#FF3B30] text-white",
  },
];

const intakeMessages = [
  "Registration Here",
  "Deploy Your First Faceless Channel Faster",
  "Creator Workflow Ready",
  "Dashboard Access Unlocks Instantly",
];

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetchApi("/auth/register", {
        method: "POST",
        requiresAuth: false,
        body: JSON.stringify({ name, email, password }),
      });

      if (response.success) {
        login(response.data.token, response.data.user);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-8 md:px-8 md:py-12">
      <div className="grainy-bg fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto mb-6 w-full max-w-6xl">
        <div className="overflow-hidden border-[6px] border-black bg-white nb-shadow">
          <div className="flex flex-col gap-4 border-b-[6px] border-black bg-[#FFD600] p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="inline-flex w-fit -rotate-2 border-[4px] border-black bg-white px-4 py-2 font-headline text-sm font-black uppercase tracking-[0.2em] text-black">
              New Operator Intake
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="h-3 w-3 rounded-full border-[2px] border-black bg-[#30D158]" />
              <p className="font-headline text-xs font-black uppercase tracking-[0.24em] text-black/70">
                Creator system ready
              </p>
            </div>
          </div>

          <div className="overflow-hidden bg-black text-white">
            <div className="animate-marquee flex whitespace-nowrap py-3">
              {[...intakeMessages, ...intakeMessages].map((message, index) => (
                <span
                  key={`${message}-${index}`}
                  className="mx-6 inline-flex items-center gap-4 font-headline text-sm font-black uppercase tracking-[0.22em] text-[#FFD600]"
                >
                  <span className="text-white">::</span>
                  {message}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden border-[8px] border-black bg-[#0057FF] text-white nb-shadow">
            <div className="absolute -left-8 top-8 rotate-[-8deg] border-[4px] border-black bg-white px-4 py-1 font-headline text-xs font-black uppercase tracking-[0.2em] text-black">
              ScriptAI Access
            </div>

            <div className="flex h-full flex-col justify-between p-6 pt-16 md:p-8 md:pt-20">
              <div>
                <p className="mb-4 font-headline text-xs font-black uppercase tracking-[0.3em] text-[#FFD600]">
                  Creator System Boot
                </p>
                <h1 className="max-w-lg font-headline text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-6xl">
                  Build the content machine before your first upload stalls.
                </h1>
                <p className="mt-6 max-w-md text-sm font-medium uppercase leading-6 tracking-[0.08em] text-white/85">
                  One workspace for hooks, scripts, voiceovers, clips, and publish flow.
                  The signup should feel fast, clear, and ready to operate.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {systemNotes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={`border-[4px] border-black p-4 ${item.tone}`}
                    >
                      <Icon className="mb-4 h-7 w-7 text-current" strokeWidth={2.2} />
                      <h2 className="font-headline text-lg font-black uppercase leading-tight">
                        {item.label}
                      </h2>
                      <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-current/80">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative border-[8px] border-black bg-white nb-shadow">
            <div className="absolute -top-5 right-4 border-[4px] border-black bg-[#FFD600] px-4 py-1 font-headline text-xs font-black uppercase tracking-[0.2em] text-black">
              Account Init
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-8 flex items-start justify-between gap-4 border-b-[4px] border-black pb-6">
                <div>
                  <p className="font-headline text-xs font-black uppercase tracking-[0.24em] text-black/50">
                    Step 01
                  </p>
                  <h2 className="mt-2 font-headline text-4xl font-black uppercase leading-none tracking-[-0.04em] text-black">
                    Register
                  </h2>
                  <p className="mt-3 max-w-xs text-sm font-semibold uppercase leading-5 tracking-[0.08em] text-black/70">
                    Create your operator profile and unlock the dashboard.
                  </p>
                </div>

                <div className="border-[4px] border-black bg-black px-3 py-2 font-headline text-xs font-black uppercase tracking-[0.18em] text-[#FFD600]">
                  Live
                </div>
              </div>

              {error && (
                <div className="mb-6 border-[4px] border-black bg-[#FF3B30] px-5 py-4 font-headline text-sm font-black uppercase tracking-[0.08em] text-white nb-shadow-sm">
                  Alert: {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center justify-between font-headline text-sm font-black uppercase tracking-[0.18em] text-black"
                  >
                    <span>Full Name</span>
                    <CreditCard className="h-5 w-5" />
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Cassius Reed"
                    required
                    className="w-full border-[4px] border-black bg-white px-4 py-3 text-base font-semibold text-black outline-none transition-colors focus:bg-[#FFD600]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center justify-between font-headline text-sm font-black uppercase tracking-[0.18em] text-black"
                  >
                    <span>Email</span>
                    <Mail className="h-5 w-5" />
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@scriptai.io"
                    required
                    className="w-full border-[4px] border-black bg-white px-4 py-3 text-base font-semibold text-black outline-none transition-colors focus:bg-[#FFD600]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 flex items-center justify-between font-headline text-sm font-black uppercase tracking-[0.18em] text-black"
                  >
                    <span>Password</span>
                    <Lock className="h-5 w-5" />
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required
                    className="w-full border-[4px] border-black bg-white px-4 py-3 text-base font-semibold text-black outline-none transition-colors focus:bg-[#FFD600]"
                  />
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
                    Use at least 6 characters to continue.
                  </p>
                </div>

                <button
                  id="register-submit"
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 border-[4px] border-black bg-[#FF3B30] px-5 py-4 font-headline text-xl font-black uppercase tracking-[0.08em] text-white nb-shadow-hover disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-60"
                >
                  <span>{loading ? "Initializing..." : "Create Account"}</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
              </form>

              <div className="mt-8 flex flex-col gap-4 border-t-[4px] border-black pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/60">
                  Already registered in the system?
                </p>
                <Link
                  href="/login"
                  className="inline-flex w-fit items-center gap-2 border-[4px] border-black bg-[#FFD600] px-4 py-2 font-headline text-sm font-black uppercase tracking-[0.12em] text-black nb-shadow-hover"
                >
                  Log In
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
