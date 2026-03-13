"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import RevealOnScroll from "@/components/RevealOnScroll";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/yashkankal", icon: "↗" },
  { label: "GitHub", href: "https://github.com/yash-kankal", icon: "↗" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yashamolkankal@outlook.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-4 sm:px-6 lg:px-14 py-20 sm:py-24 lg:py-[120px] border-t border-[var(--border)]"
    >
      <RevealOnScroll>
        <h2 className="font-[800] tracking-[-0.05em] leading-[0.88] uppercase mb-10 sm:mb-14 lg:mb-16 text-[clamp(42px,8vw,130px)]">
          <span className="block text-[0.45em] text-[var(--t3)] not-italic font-[300] normal-case tracking-[-0.01em] mb-2">
            Let&apos;s build
          </span>
          something
          <br />
          great.
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={150}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap border-t border-[var(--border)]">
          <div className="flex items-center justify-between gap-4 px-0 sm:px-8 py-5 sm:py-6 border-b sm:border-b-0 sm:border-r border-[var(--border)] first:pl-0">
            <a
              href="mailto:yashamolkankal@outlook.com"
              className="contact-link flex items-center gap-3 text-[18px] sm:text-[20px] lg:text-[22px] text-[var(--t1)] font-[500] cursor-pointer transition-colors"
            >
              <span className="opacity-50 text-[20px]">✉</span>
              <span className="break-all">yashamolkankal@outlook.com</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border)] text-[var(--t2)] hover:text-[var(--t1)] hover:border-[var(--border2)] transition-colors cursor-pointer shrink-0"
            >
              {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
            </button>
          </div>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-link flex items-center gap-3 text-[18px] sm:text-[20px] lg:text-[22px] text-[var(--t1)] font-[500] px-0 sm:px-8 py-5 sm:py-6 border-b sm:border-b-0 sm:border-r border-[var(--border)] first:pl-0 cursor-pointer hover:text-[var(--t1)] transition-colors"
            >
              <span className="opacity-50 text-[20px]">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
