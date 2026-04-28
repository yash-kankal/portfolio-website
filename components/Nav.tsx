"use client";

import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-[5px] w-[18px]">
      <span className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
      <span className={`block h-[1.5px] bg-current transition-all duration-300 ${open ? "w-0 opacity-0" : "w-full"}`} />
      <span className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
    </div>
  );
}

const navLinks = [
  { id: "about",      label: "About" },
  { id: "experience", label: "Work Experience" },
  { id: "projects",   label: "Projects" },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [isDark,    setIsDark]    = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Scroll → compact nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll → close mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Read theme set by inline script before hydration
  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === "about") {
      const w = window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } };
      if (w.__lenis) w.__lenis.scrollTo(0, {});
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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
    <nav className={`nav-base fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled || menuOpen
        ? "bg-[var(--nav-bg-scrolled)] backdrop-blur-2xl border-b border-[var(--border)]"
        : "bg-[var(--nav-bg)] backdrop-blur-xl"
    }`}>

      {/* ── Top bar ── */}
      <div className={`max-w-[1400px] mx-auto flex items-center justify-between ${
        scrolled
          ? "px-4 py-3 sm:px-6 sm:py-4 lg:px-14 lg:py-[18px]"
          : "px-4 py-3 sm:px-6 sm:py-5 lg:px-14 lg:py-8"
      }`}>

        {/* Logo */}
        <button
          onClick={() => scrollTo("about")}
          className="text-[17px] sm:text-[21px] lg:text-[24px] font-mono font-semibold text-[var(--t1)] hover:opacity-70 active:opacity-50 transition-opacity cursor-pointer"
        >
          <span className="text-orange-400">&lt;</span>
          Yash
          <span className="text-[var(--t3)]"> </span>
          Kankal
          <span className="text-orange-400">/&gt;</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-9">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[13px] font-[400] tracking-[0.02em] text-[var(--t2)] hover:text-[var(--t1)] transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-[400] tracking-[0.02em] text-[var(--t2)] hover:text-[var(--t1)] transition-colors cursor-pointer"
          >
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--t2)] hover:text-[var(--t1)] border border-[var(--border)] hover:border-[var(--border2)] transition-colors cursor-pointer"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="nav-cta text-[13px] font-[500] text-white bg-orange-400 border border-orange-400 px-5 py-[9px] rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all cursor-pointer"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-11 h-11 flex items-center justify-center text-[var(--t2)] active:text-[var(--t1)] transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="w-11 h-11 flex items-center justify-center text-[var(--t1)] active:opacity-60 transition-opacity"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? "420px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 pt-1 pb-7 flex flex-col border-t border-[var(--border)]">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-[17px] font-[400] text-[var(--t1)] py-[14px] border-b border-[var(--border)] active:opacity-50 transition-opacity"
            >
              {label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[17px] font-[400] text-[var(--t1)] py-[14px] border-b border-[var(--border)] active:opacity-50 transition-opacity"
          >
            Resume
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="mt-5 text-[14px] font-[500] text-white bg-orange-400 px-6 py-[14px] rounded-full active:bg-orange-500 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
