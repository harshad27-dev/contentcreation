"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger, which is free and standard
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Note: ScrollSmoother requires a Club GSAP license.
    // If you have a license, you can import and register it here:
    // import ScrollSmoother from "gsap/ScrollSmoother";
    // gsap.registerPlugin(ScrollSmoother);
    // ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.5 });
    
    // As a fallback for development without a license, we're relying on CSS smooth scrolling
    // and using ScrollTrigger for the parallax effects.
    
    // Refresh ScrollTrigger periodically to ensure it works well with Next.js navigation
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return <>{children}</>;
}
