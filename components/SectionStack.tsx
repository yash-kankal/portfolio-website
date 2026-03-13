"use client";

import { useEffect, useRef, Children, type ReactNode } from "react";

const STICKY_BASE = 80; // px below navbar
const STEP = 10;        // extra offset per card so they fan out slightly
const RETRACT_RANGE = 220;

export default function SectionStack({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wrappers = Array.from(
      container.querySelectorAll<HTMLElement>(":scope > .sc-wrap")
    );
    const inners = Array.from(
      container.querySelectorAll<HTMLElement>(":scope > .sc-wrap > .sc-inner")
    );

    const setHeights = () => {
      wrappers.forEach((wrapper, i) => {
        if (i < wrappers.length - 1) {
          const inner = inners[i];
          const h = inner ? inner.offsetHeight : window.innerHeight;
          wrapper.style.minHeight = `${h + STICKY_BASE + i * STEP + RETRACT_RANGE}px`;
        }
      });
    };

    setHeights();
    window.addEventListener("resize", setHeights);

    const onScroll = () => {
      const vh = window.innerHeight;
      wrappers.forEach((wrapper, i) => {
        const inner = inners[i];
        if (!inner) return;
        const rect = wrapper.getBoundingClientRect();
        const stickyTop = STICKY_BASE + i * STEP;

        if (rect.top > stickyTop) {
          // Entering from below — pop up
          const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.65)));
          inner.style.transform = `scale(${0.93 + p * 0.07}) translateY(${(1 - p) * 56}px)`;
          inner.style.opacity = String(0.2 + p * 0.8);
        } else {
          // Sticky — retract as next card covers it
          const scrolledPast = stickyTop - rect.top;
          const p = Math.max(0, Math.min(1, scrolledPast / RETRACT_RANGE));
          inner.style.transform = `scale(${1 - p * 0.04}) translateY(${-p * 10}px)`;
          inner.style.opacity = String(Math.max(0.5, 1 - p * 0.18));
        }
      });
    };

    const w = window as unknown as {
      __lenis?: {
        on: (e: string, fn: () => void) => void;
        off: (e: string, fn: () => void) => void;
      };
    };
    if (w.__lenis) w.__lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", setHeights);
      if (w.__lenis) w.__lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={containerRef}>
      {items.map((child, i) => (
        <div key={i} className="sc-wrap">
          <div
            className="sc-inner"
            style={{
              position: "sticky",
              top: `${STICKY_BASE + i * STEP}px`,
              borderRadius: 20,
              overflow: "hidden",
              willChange: "transform, opacity",
              transformOrigin: "top center",
              background: "var(--bg)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
