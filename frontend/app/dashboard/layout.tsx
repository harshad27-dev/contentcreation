"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, kick to login.
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show a full screen loader while deciding
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-base)]">
        <Loader2 className="w-8 h-8 text-[var(--accent-glow)] animate-spin" />
      </div>
    );
  }

  // If we decided not logged in, we render nothing until redirect happens
  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-[var(--bg-base)] text-white min-h-screen">
      
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 overflow-x-hidden p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
