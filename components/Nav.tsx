"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navEl = document.querySelector("nav");
    const navH = navEl ? navEl.getBoundingClientRect().height : 80;
    const sectionPt = parseFloat(getComputedStyle(el).paddingTop) || 0;
    const offset = -(navH - sectionPt) - 18;
    const w = window as unknown as { __lenis?: { scrollTo: (el: Element, opts: object) => void } };
    if (w.__lenis) {
      w.__lenis.scrollTo(el, { offset });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`nav-base fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "px-4 py-4 sm:px-6 sm:py-5 lg:px-14 lg:py-[18px] bg-[rgba(250,250,250,0.92)] backdrop-blur-2xl border-b border-[var(--border)]"
          : "px-4 py-4 sm:px-6 sm:py-6 lg:px-14 lg:py-8 bg-[rgba(250,250,250,0.85)] backdrop-blur-xl"
      }`}
    >
      <button
        onClick={() => scrollTo("hero")}
        className="text-[19px] sm:text-[22px] lg:text-[24px] font-mono font-semibold text-[var(--t1)] hover:opacity-70 transition-opacity cursor-pointer"
      >
        <span className="text-orange-400">&lt;</span>
        Yash
        <span className="text-[var(--t3)]"> </span>
        Kankal
        <span className="text-orange-400">/&gt;</span>
      </button>

      <div className="hidden md:flex items-center gap-6 lg:gap-9">
        {["about", "experience", "projects"].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-[13px] font-[400] tracking-[0.02em] text-[var(--t2)] hover:text-[var(--t1)] transition-colors capitalize cursor-pointer"
          >
            {id === "experience" ? "Work Experience" : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="nav-cta text-[13px] font-[500] text-white bg-orange-400 border border-orange-400 px-5 py-[9px] rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all cursor-pointer"
        >
          Get in Touch
        </button>
      </div>

      <button
        onClick={() => scrollTo("contact")}
        className="md:hidden nav-cta text-[12px] font-[500] text-[var(--t1)] border border-[var(--border2)] px-4 py-2 rounded-full hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all cursor-pointer"
      >
        Contact
      </button>
    </nav>
  );
}
