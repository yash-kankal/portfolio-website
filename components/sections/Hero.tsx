"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    // Fit text to full container width
    const fitText = (el: HTMLElement) => {
      const parent = el.parentElement;
      if (!parent) return;
      let low = 10,
        high = 500;
      el.style.fontSize = high + "px";
      while (high - low > 0.5) {
        const mid = (low + high) / 2;
        el.style.fontSize = mid + "px";
        if (el.scrollWidth > parent.clientWidth) {
          high = mid;
        } else {
          low = mid;
        }
      }
      el.style.fontSize = low * 0.82 + "px";
    };

    const fit = () => {
      ["hero-first", "hero-last"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) fitText(el);
      });
    };

    fit();
    window.addEventListener("resize", fit);

    // Animate in
    const t = setTimeout(() => {
      document.getElementById("hero-first")?.classList.add("name-visible");
      document.getElementById("hero-last")?.classList.add("name-visible");
    }, 80);

    // Fade in hero bottom
    const t2 = setTimeout(() => {
      document.getElementById("hero-bottom")?.classList.add("visible");
    }, 400);

    return () => {
      window.removeEventListener("resize", fit);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-end px-4 pt-[96px] pb-10 sm:px-6 sm:pb-14 lg:px-14 lg:pt-[80px] lg:pb-[72px] relative overflow-hidden"
    >

      {/* Name — full-width fit text, centered */}
      <div className="hero-name-clip mb-[3px] text-center">
        <span id="hero-first" className="hero-name whitespace-normal sm:whitespace-nowrap">
          Yash
        </span>
      </div>
      <div className="hero-name-clip text-center">
        <span id="hero-last" className="hero-name delay-1 whitespace-normal sm:whitespace-nowrap">
          Kankal
        </span>
      </div>

      {/* Divider + bottom bar */}
      <div
        id="hero-bottom"
        className="reveal mt-9"
      >
        <div className="h-px bg-[var(--border)] mb-6 sm:mb-8" />
        <p className="text-center text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.75] font-[300] text-[var(--t1)]">
          <strong className="font-[600]">Full Stack Developer</strong> with{" "}
          <strong className="font-[600]">3+ years</strong> of professional experience building
          production systems across the full stack. Specialized in backend architecture with{" "}
          <strong className="font-[600]">Node.js, FastAPI, and PostgreSQL</strong>, real-time
          infrastructure using <strong className="font-[600]">WebSockets and event-driven
          microservices</strong>, and cloud deployments on{" "}
          <strong className="font-[600]">AWS</strong> (Lambda, ECS, S3, RDS, Kinesis).
          On the frontend, ships fast, polished UIs with{" "}
          <strong className="font-[600]">React and Next.js</strong>, extending to native mobile
          with <strong className="font-[600]">Kotlin</strong> and{" "}
          <strong className="font-[600]">SwiftUI</strong>.
          Currently building at <strong className="font-[600]">DriverAI</strong>.
        </p>
      </div>
    </section>
  );
}
