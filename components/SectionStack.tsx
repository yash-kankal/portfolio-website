"use client";

import { useEffect, useRef, Children, type ReactNode } from "react";

const STICKY_BASE = 80;
const STEP = 10;
const RETRACT_RANGE = 240;

export default function SectionStack({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wrappers = Array.from(
      container.querySelectorAll<HTMLElement>(":scope > .sc-wrap")
    );
    const rings = Array.from(
      container.querySelectorAll<HTMLElement>(":scope > .sc-wrap > .sc-ring")
    );

    const setHeights = () => {
      wrappers.forEach((wrapper, i) => {
        if (i < wrappers.length - 1) {
          const ring = rings[i];
          const h = ring ? ring.offsetHeight : window.innerHeight;
          wrapper.style.minHeight = `${h + STICKY_BASE + i * STEP + RETRACT_RANGE}px`;
        }
      });
    };

    setHeights();
    window.addEventListener("resize", setHeights);

    const onScroll = () => {
      const vh = window.innerHeight;
      wrappers.forEach((wrapper, i) => {
        const ring = rings[i];
        if (!ring) return;
        const rect = wrapper.getBoundingClientRect();
        const stickyTop = STICKY_BASE + i * STEP;

        if (rect.top > stickyTop) {
          // Already well in view — skip entry animation (avoids nav-click jank)
          if (rect.top < vh * 0.6) {
            ring.style.transform = "scale(1) translateY(0px)";
            ring.style.opacity = "1";
            return;
          }
          // Entering from below — subtle pop
          const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.6)));
          ring.style.transform = `scale(${0.96 + p * 0.04}) translateY(${(1 - p) * 32}px)`;
          ring.style.opacity = String(0.6 + p * 0.4);
        } else {
          // Sticky — retract as next card comes over
          const scrolledPast = stickyTop - rect.top;
          const p = Math.max(0, Math.min(1, scrolledPast / RETRACT_RANGE));
          ring.style.transform = `scale(${1 - p * 0.04}) translateY(${-p * 10}px)`;
          ring.style.opacity = String(Math.max(0.55, 1 - p * 0.16));
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
          {/* sc-ring: sticky card shell — animated by scroll driver */}
          <div
            className="sc-ring"
            style={{
              position: "sticky",
              top: `${STICKY_BASE + i * STEP}px`,
              willChange: "transform, opacity",
              transformOrigin: "top center",
              borderRadius: 20,
              background: "var(--bg)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
              // overflow:clip clips visually but does NOT create a scroll container,
              // so position:sticky inside Experience still works correctly
              overflow: "clip",
              minHeight: "100svh",
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
