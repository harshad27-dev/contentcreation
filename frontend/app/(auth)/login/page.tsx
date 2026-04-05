"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Lock, Mail, Shield, Sparkles, Zap } from "lucide-react";

const loginNotes = [
  {
    icon: Sparkles,
    label: "Fast Return",
    text: "Jump back into scripts, scenes, and publishing without resetting your flow.",
    tone: "bg-[#FFD600] text-black",
  },
  {
    icon: Shield,
    label: "Secure Session",
    text: "Protected access keeps your operator dashboard and workflow history locked in.",
    tone: "bg-white text-black",
  },
  {
    icon: Zap,
    label: "Instant Access",
    text: "Sign in and move straight into production with your tools ready to go.",
    tone: "bg-[#FF3B30] text-white",
  },
];

const loginTicker = [
  "Operator login active",
  "Production dashboard ready",
  "Resume your faceless channel workflow",
  "Creator system back online",
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".auth-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetchApi("/auth/login", {
        method: "POST",
        requiresAuth: false,
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        login(response.data.token, response.data.user);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 py-8 md:px-8 md:py-12">
      <div className="grainy-bg fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto mb-6 w-full max-w-6xl">
        <div className="overflow-hidden border-[6px] border-black bg-white nb-shadow">
          <div className="flex flex-col gap-4 border-b-[6px] border-black bg-[#FF3B30] p-5 text-white md:flex-row md:items-center md:justify-between md:p-6">
            <div className="inline-flex w-fit rotate-[-2deg] border-[4px] border-black bg-white px-4 py-2 font-headline text-sm font-black uppercase tracking-[0.2em] text-black">
              Operator Login
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="h-3 w-3 rounded-full border-[2px] border-black bg-[#30D158]" />
              <p className="font-headline text-xs font-black uppercase tracking-[0.24em] text-white">
                Session gateway live
              </p>
            </div>
          </div>

          <div className="overflow-hidden bg-black text-white">
            <div className="animate-marquee flex whitespace-nowrap py-3">
              {[...loginTicker, ...loginTicker].map((message, index) => (
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden border-[8px] border-black bg-[#0057FF] text-white nb-shadow">
          <div className="absolute -left-7 top-8 rotate-[-8deg] border-[4px] border-black bg-white px-4 py-1 font-headline text-xs font-black uppercase tracking-[0.2em] text-black">
            ScriptAI Return
          </div>

          <div className="flex h-full flex-col justify-between p-6 pt-16 md:p-8 md:pt-20">
            <div>
              <p className="mb-4 font-headline text-xs font-black uppercase tracking-[0.3em] text-[#FFD600]">
                Creator Re-Entry
              </p>
              <h1 className="max-w-lg font-headline text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-6xl">
                Pick up the content engine exactly where you left it.
              </h1>
              <p className="mt-6 max-w-md text-sm font-medium uppercase leading-6 tracking-[0.08em] text-white/85">
                Scripts, voiceovers, scenes, and publishing steps are waiting inside
                your operator workspace. Sign in and get the machine moving again.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {loginNotes.map((item) => {
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

        <div className="auth-container relative border-[8px] border-black bg-white nb-shadow">
          <div className="absolute -top-5 right-4 border-[4px] border-black bg-[#FFD600] px-4 py-1 font-headline text-xs font-black uppercase tracking-[0.2em] text-black">
            Access Init
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8 flex items-start justify-between gap-4 border-b-[4px] border-black pb-6">
              <div>
                <p className="font-headline text-xs font-black uppercase tracking-[0.24em] text-black/50">
                  Step 01
                </p>
                <h2 className="mt-2 font-headline text-4xl font-black uppercase leading-none tracking-[-0.04em] text-black">
                  Sign In
                </h2>
                <p className="mt-3 max-w-xs text-sm font-semibold uppercase leading-5 tracking-[0.08em] text-black/70">
                  Enter your credentials and reopen your creator dashboard.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 border-[4px] border-black bg-black px-3 py-2 font-headline text-xs font-black uppercase tracking-[0.18em] text-[#FFD600] nb-shadow-hover"
              >
                Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {error && (
              <div className="mb-6 border-[4px] border-black bg-[#FF3B30] px-5 py-4 font-headline text-sm font-black uppercase tracking-[0.08em] text-white nb-shadow-sm">
                Alert: {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="mb-2 flex items-center justify-between font-headline text-sm font-black uppercase tracking-[0.18em] text-black"
                  htmlFor="email"
                >
                  <span>Email Address</span>
                  <Mail className="h-5 w-5" />
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[4px] border-black bg-white px-4 py-3 text-base font-semibold text-black outline-none transition-colors focus:bg-[#FFD600]"
                  placeholder="operator@scriptai.io"
                  required
                />
              </div>

              <div>
                <label
                  className="mb-2 flex items-center justify-between font-headline text-sm font-black uppercase tracking-[0.18em] text-black"
                  htmlFor="password"
                >
                  <span>Password</span>
                  <Lock className="h-5 w-5" />
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-[4px] border-black bg-white px-4 py-3 text-base font-semibold text-black outline-none transition-colors focus:bg-[#FFD600]"
                  placeholder="Enter your secure password"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 border-[4px] border-black bg-[#F3F0E8] p-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-[2px] border-black accent-black"
                  />
                  <span className="font-headline text-xs font-black uppercase tracking-[0.14em] text-black/70">
                    Keep me signed in
                  </span>
                </label>
                <Link
                  href="/register"
                  className="font-headline text-xs font-black uppercase tracking-[0.14em] text-[#0057FF] underline-offset-4 hover:underline"
                >
                  Need a new account?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 border-[4px] border-black bg-[#FF3B30] px-5 py-4 font-headline text-xl font-black uppercase tracking-[0.08em] text-white nb-shadow-hover disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-60"
              >
                <span>{loading ? "Initializing..." : "Enter Dashboard"}</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4 border-t-[4px] border-black pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/60">
                New to the system?
              </p>
              <Link
                href="/register"
                className="inline-flex w-fit items-center gap-2 border-[4px] border-black bg-[#FFD600] px-4 py-2 font-headline text-sm font-black uppercase tracking-[0.12em] text-black nb-shadow-hover"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
