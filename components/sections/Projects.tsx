"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import TechIcon from "@/components/TechIcon";

function PhoneModal({ onClose, screenshots }: { onClose: () => void; screenshots: string[] }) {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length), [screenshots]);
  const next = useCallback(() => setIdx((i) => (i + 1) % screenshots.length), [screenshots]);

  useEffect(() => {
    // Hide navbar while modal is open
    const nav = document.querySelector("nav") as HTMLElement | null;
    if (nav) nav.style.visibility = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (nav) nav.style.visibility = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors text-lg z-10"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        ✕
      </button>

      <div
        className="flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phone frame — aspect ratio matches real phone screenshots (~9:19.5) */}
        <div
          className="relative"
          style={{
            width: "min(320px, 80vw)",
            aspectRatio: "9 / 19.5",
            maxHeight: "80vh",
            background: "#000",
            borderRadius: "clamp(30px, 8vw, 50px)",
            border: "3px solid rgba(255,255,255,0.14)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <Image
            key={idx}
            src={screenshots[idx]}
            alt={`Screenshot ${idx + 1}`}
            fill
            className="object-cover object-top"
            sizes="320px"
            style={{ transition: "opacity 0.25s ease" }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ←
          </button>
          <div className="flex gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === idx ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const webProjects = [
  {
    num: "01",
    title: "Video Sharing Platform",
    desc: "Full-stack video platform with backend-first architecture. RESTful APIs for upload, playback, auth, and search. AWS S3 pre-signed URLs supporting 100+ concurrent streams. Real-time streaming analytics via Kinesis, sub-second search via Elasticsearch, and AI-powered video suggestions based on user mood.",
    image: "/projects/videosharingplatform.png",
    href: "https://snydervideo.vercel.app/",
    stack: ["TypeScript", "Next.js", "Node.js", "Express.js", "PostgreSQL", "AWS Lambda", "S3", "Kinesis", "Redis", "Elasticsearch", "JWT"],
  },
  {
    num: "02",
    title: "SnyderMovies",
    desc: "IMDb alternative for browsing ratings, trailers, cast and crew for any movie. Built with React 19, Vite, and React Router v6. Fetches live data from TMDB API across 8+ endpoints. Zero backend, zero state-management library, all state lives in URL params or local useState keeping the bundle tiny.",
    image: "/projects/snydermovies.png",
    href: "https://snydermovies.vercel.app/",
    stack: ["React.js", "Vite", "React Router", "Tailwind CSS", "TMDB API"],
  },
  {
    num: "03",
    title: "AI Health Chatbot",
    desc: "Full-stack AI-powered health assistant with calorie tracking, meal logging, and personalized nutrition workflows. Integrates OpenAI API for recipe recommendations and context-aware guidance through a conversational interface.",
    image: "/projects/aichatbot.png",
    href: "https://snyder-health.vercel.app/signup",
    stack: ["Next.js", "React.js", "TypeScript", "Node.js", "Express.js", "OpenAI API", "PostgreSQL"],
  },
];

const mobileProjects = [
  {
    num: "04",
    title: "Snyder News",
    desc: "Offline-first Android news aggregator pulling from two live APIs simultaneously, deduplicating articles before saving to a local Room database. Features an on-device NLP pipeline that auto-tags articles and generates AI summaries on every background sync without an external API. Liquid-glass design system built entirely in Jetpack Compose with frosted card surfaces, gradient borders, and aurora mesh backgrounds.",
    image: "/projects/snydernews.png",
    href: "",
    platform: "Android",
    screenshots: ["/projects/snydernews1.png", "/projects/snydernews2.png"],
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Room", "Retrofit", "WorkManager", "Paging 3", "DataStore", "Coil"],
  },
  {
    num: "05",
    title: "SnyderSpend",
    desc: "AI-powered expense tracking iOS app with real-time cloud sync across sessions. GPT-4o analyses actual spending data to deliver personalised insights, predictions, and saving opportunities. Auto-categorises every expense using AI so nothing needs to be tagged manually. Built with SwiftUI and Apple's Liquid Glass design language for a polished native feel.",
    image: "/projects/snyderspend.png",
    href: "",
    platform: "iOS",
    screenshots: [
      "/projects/snyderspend1.png",
      "/projects/snyderspend2.png",
      "/projects/snyderspend3.png",
      "/projects/snyderspend4.png",
      "/projects/snyderspend5.png",
      "/projects/snyderspend6.png",
    ],
    stack: ["SwiftUI", "Firebase Auth", "Firestore", "OpenAI GPT-4o", "Liquid Glass"],
  },
];

function WebProjectCard({ project, index }: { project: typeof webProjects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onScroll = () => {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
      const scale = 0.9 + progress * 0.1;
      const opacity = 0.2 + progress * 0.8;
      const translateY = (1 - progress) * 56;
      card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      card.style.opacity = String(opacity);
    };

    const w = window as unknown as { __lenis?: { on: (e: string, fn: () => void) => void; off: (e: string, fn: () => void) => void } };
    if (w.__lenis) w.__lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (w.__lenis) w.__lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => project.href && window.open(project.href, "_blank")}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        willChange: "transform, opacity",
        background: "var(--bg1)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Screenshot */}
      <div className="relative w-full overflow-hidden h-[240px] sm:h-[240px] lg:h-[260px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 82%, var(--bg1) 100%)" }}
        />
        <span className="absolute top-5 left-5 text-[11px] font-medium tracking-[0.1em] text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {project.num}
        </span>
        <span
          className="absolute top-5 right-5 text-[18px] text-white/50 transition-all duration-300"
          style={{ transform: hovered ? "translate(3px,-3px)" : "translate(0,0)", color: hovered ? "rgba(255,255,255,0.9)" : undefined }}
        >
          ↗
        </span>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-7 lg:pb-8 pt-5">
        <h3 className="text-[20px] sm:text-[21px] lg:text-[22px] font-bold tracking-[-0.025em] leading-tight mb-3">
          {project.title}
        </h3>
        <p
          className="project-desc text-[14px] sm:text-[13px] leading-[1.8] font-light mb-6 text-[var(--t2)]"
          style={{ transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)", ...(hovered ? { maxHeight: "400px" } : {}) }}
        >
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {project.stack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-[5px] text-[11px] sm:text-[10px] font-medium tracking-[0.04em] text-[var(--t3)] px-[10px] py-[6px] sm:px-[9px] sm:py-[4px] border border-[var(--border)] rounded-full"
              style={{
                transition: "border-color 0.2s, color 0.2s",
                borderColor: hovered ? "var(--border2)" : undefined,
                color: hovered ? "var(--t2)" : undefined,
              }}
            >
              <TechIcon name={t} size={10} className="shrink-0" colored />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileProjectCard({ project }: { project: typeof mobileProjects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onScroll = () => {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
      card.style.transform = `scale(${0.9 + progress * 0.1}) translateY(${(1 - progress) * 56}px)`;
      card.style.opacity = String(0.2 + progress * 0.8);
    };

    const w = window as unknown as { __lenis?: { on: (e: string, fn: () => void) => void; off: (e: string, fn: () => void) => void } };
    if (w.__lenis) w.__lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (w.__lenis) w.__lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setModalOpen(true)}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        willChange: "transform, opacity",
        background: "var(--bg1)",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Screenshot */}
      <div className="relative w-full overflow-hidden h-[240px] sm:h-[240px] lg:h-[260px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            objectPosition: "center 15%",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 82%, var(--bg1) 100%)" }}
        />
        <span className="absolute top-5 left-5 text-[11px] font-medium tracking-[0.1em] text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {project.num}
        </span>
        <span className="absolute top-5 right-5 text-[10px] font-medium tracking-[0.08em] uppercase text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {project.platform}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-7 lg:pb-8 pt-5">
        <h3 className="text-[20px] sm:text-[21px] lg:text-[22px] font-bold tracking-[-0.025em] leading-tight mb-3">
          {project.title}
        </h3>
        <p
          className="project-desc text-[14px] sm:text-[13px] leading-[1.8] font-light mb-6 text-[var(--t2)]"
          style={{ transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)", ...(hovered ? { maxHeight: "500px" } : {}) }}
        >
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {project.stack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-[5px] text-[11px] sm:text-[10px] font-medium tracking-[0.04em] text-[var(--t3)] px-[10px] py-[6px] sm:px-[9px] sm:py-[4px] border border-[var(--border)] rounded-full"
              style={{
                transition: "border-color 0.2s, color 0.2s",
                borderColor: hovered ? "var(--border2)" : undefined,
                color: hovered ? "var(--t2)" : undefined,
              }}
            >
              <TechIcon name={t} size={10} className="shrink-0" colored />
              {t}
            </span>
          ))}
        </div>
      </div>

    </div>
    {modalOpen && <PhoneModal onClose={() => setModalOpen(false)} screenshots={project.screenshots} />}
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-10 sm:py-12 lg:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 sm:mb-10 lg:mb-12 pb-6 border-b border-[var(--border)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--t3)] mb-3">
            04 / Projects
          </p>
          <h2 className="text-[clamp(40px,5.5vw,80px)] font-extrabold tracking-[-0.04em] leading-none">
            Recent Projects
          </h2>
        </div>
      </div>

      {/* Web Apps */}
      <div className="mb-12 sm:mb-14 lg:mb-16">
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <p className="text-[15px] sm:text-[17px] font-[600] tracking-[0.12em] uppercase text-[var(--t2)]">
            Web Apps
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {webProjects.map((p, i) => (
            <WebProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile Apps */}
      <div>
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <p className="text-[15px] sm:text-[17px] font-[600] tracking-[0.12em] uppercase text-[var(--t2)]">
            Mobile Apps
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mobileProjects.map((p) => (
            <MobileProjectCard key={p.num} project={p} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
