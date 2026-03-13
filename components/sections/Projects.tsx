"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TechIcon from "@/components/TechIcon";

const projects = [
  {
    num: "01",
    title: "Video Sharing Platform",
    desc: "Full-stack video platform with backend-first architecture. RESTful APIs for upload, playback, auth, and search. AWS S3 pre-signed URLs supporting 100+ concurrent streams. Real-time streaming analytics via Kinesis, sub-second search via Elasticsearch, and AI-powered video suggestions based on user mood.",
    image: "/projects/videosharingplatform.png",
    accent: "#1a1a2e",
    href: "https://snydervideo.vercel.app/",
    stack: ["TypeScript", "Next.js", "Node.js", "Express.js", "PostgreSQL", "AWS Lambda", "S3", "Kinesis", "Redis", "Elasticsearch", "JWT"],
  },
  {
    num: "02",
    title: "AI Health Chatbot",
    desc: "Full-stack AI-powered health assistant with calorie tracking, meal logging, and personalized nutrition workflows. Integrates OpenAI API for recipe recommendations and context-aware guidance through a conversational interface.",
    image: "/projects/aichatbot.png",
    accent: "#0d2818",
    href: "https://snyder-health.vercel.app/signup",
    stack: ["Next.js", "React.js", "TypeScript", "Node.js", "Express.js", "OpenAI API", "PostgreSQL"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
      onClick={() => window.open(project.href, "_blank")}
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
      {/* ── Screenshot preview ── */}
      <div
        className="relative w-full overflow-hidden h-[220px] sm:h-[240px] lg:h-[260px]"
      >
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
        {/* Gradient overlay — fades image into card body */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 82%, var(--bg1) 100%)",
          }}
        />
        {/* Number badge */}
        <span className="absolute top-5 left-5 text-[11px] font-medium tracking-[0.1em] text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {project.num}
        </span>
        {/* Arrow */}
        <span
          className="absolute top-5 right-5 text-[18px] text-white/50 transition-all duration-300"
          style={{
            transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
            color: hovered ? "rgba(255,255,255,0.9)" : undefined,
          }}
        >
          ↗
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-7 lg:pb-8 pt-5">
        <h3 className="text-[20px] sm:text-[21px] lg:text-[22px] font-bold tracking-[-0.025em] leading-tight mb-3">
          {project.title}
        </h3>

        <p
          className="text-[13px] leading-[1.75] font-light mb-6"
          style={{
            color: "var(--t2)",
            maxHeight: hovered ? "200px" : index === 0 ? "84px" : "60px",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s",
          }}
        >
          {project.desc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-[5px]">
          {project.stack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-[4px] text-[10px] font-medium tracking-[0.04em] text-[var(--t3)] px-[9px] py-[4px] border border-[var(--border)] rounded-full"
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

export default function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-14 pb-12 sm:pb-14 lg:pb-[72px]" style={{ paddingTop: 0 }}>
      <div className="flex items-end justify-between mb-10 sm:mb-14 lg:mb-[72px] pb-6 border-b border-[var(--border)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--t3)] mb-3">
            04 / Projects
          </p>
          <h2 className="text-[clamp(40px,5.5vw,80px)] font-extrabold tracking-[-0.04em] leading-none">
            Recent Projects
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
