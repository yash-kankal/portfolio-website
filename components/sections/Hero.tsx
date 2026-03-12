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
      el.style.fontSize = low + "px";
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
      className="min-h-screen flex flex-col justify-end px-14 pt-[80px] pb-[72px] relative overflow-hidden"
    >

      {/* Name — full-width fit text */}
      <div className="hero-name-clip mb-[3px]">
        <span id="hero-first" className="hero-name">
          Yash
        </span>
      </div>
      <div className="hero-name-clip">
        <span id="hero-last" className="hero-name delay-1">
          Kankal
        </span>
      </div>

      {/* Divider + bottom bar */}
      <div
        id="hero-bottom"
        className="reveal mt-9"
      >
        <div className="h-px bg-[var(--border)] mb-8" />
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <p className="text-[20px] leading-[1.65] font-[300] text-[var(--t1)] max-w-[520px]">
            <strong className="font-[600]">
              Full Stack Developer
            </strong>{" "}
            crafting production-grade backends, real-time systems, and scalable APIs,
            turning complex problems into clean, shippable products.{" "}
            Currently building at{" "}
            <strong className="font-[600]">DriverAI</strong>.
          </p>

          <div className="flex flex-col items-start sm:items-end gap-[10px] shrink-0">
            <span className="text-[15px] font-[500] text-[var(--t1)] tracking-[0.02em]">
              MS Information Technology · ASU · 2025
            </span>
            <span className="text-[15px] font-[500] text-[var(--t1)] tracking-[0.02em]">
              TypeScript · Node.js · React · AWS
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-px bg-[var(--t3)] scroll-line-anim" />
              <span className="text-[11px] tracking-[0.12em] uppercase text-[var(--t3)]">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
