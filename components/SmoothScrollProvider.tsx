"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Expose on window so cards/nav can hook in
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Bridge Lenis ticks to native scroll events so window listeners fire too
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(id);
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return null;
}
