"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(animate);
    };

    const addHover = () => {
      const targets = document.querySelectorAll(
        "a, button, .project-card, .stag, .nav-cta"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          dot.classList.add("hovering");
          ring.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
          dot.classList.remove("hovering");
          ring.classList.remove("hovering");
        });
      });
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);
    // Small delay so DOM is ready
    const t = setTimeout(addHover, 500);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
