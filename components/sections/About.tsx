"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

const details = [
  { label: "Currently", value: "Software Developer @ DriverAI" },
  { label: "Education", value: "MS IT · Arizona State University" },
  { label: "Email", value: "yashamolkankal@outlook.com" },
  { label: "Status", value: "Open to opportunities", green: true },
];

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Section header */}
      <div className="px-4 sm:px-6 lg:px-14 mb-8 sm:mb-10 lg:mb-12 pb-6 border-b border-[var(--border)]">
        <p className="text-[11px] font-[500] tracking-[0.14em] uppercase text-[var(--t3)] mb-3">
          01 / About
        </p>
        <h2 className="text-[clamp(40px,5.5vw,80px)] font-[800] tracking-[-0.04em] leading-none">
          The Story
        </h2>
      </div>

      {/* Photo + content row */}
      <div id="about-content" className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">

        {/* ── Photo ── */}
        <div className="relative shrink-0 w-full lg:w-[38%] min-h-[300px] sm:min-h-[420px] lg:min-h-[520px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/projects/profile.jpg"
              alt="Yash Amol Kankal"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Feather: top */}
          <div
            className="absolute inset-x-0 top-0 h-[50px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)" }}
          />
          {/* Feather: bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-[70px] pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
          />
          {/* Feather: right — wide, soft */}
          <div
            className="absolute inset-y-0 right-0 w-[55%] hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 0%, var(--bg) 100%)" }}
          />
        </div>

        {/* ── Content — sits clearly to the right of the photo ── */}
        <div className="relative z-10 flex-1 px-4 sm:px-6 lg:px-0 lg:ml-[2%] lg:pr-14 flex flex-col justify-center">

          {/* Name + role */}
          <RevealOnScroll>
            <div className="mb-10">
              <h3 className="text-[clamp(22px,2.2vw,34px)] font-[700] tracking-[-0.03em] leading-none mb-[6px] text-[var(--t1)]">
                Yash Amol Kankal
              </h3>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--t3)]">
                Full Stack Developer
              </p>
            </div>
          </RevealOnScroll>

          {/* Bio */}
          <RevealOnScroll delay={80}>
            <div className="space-y-4 text-[16px] sm:text-[16px] lg:text-[17px] leading-[1.85] font-[300] text-[var(--t2)] mb-10 lg:mb-12">
              <p>
                I&apos;m a{" "}
                <strong className="text-[var(--t1)] font-[500]">Full Stack Developer</strong>{" "}
                with a deep focus on building backend systems that scale, from
                WebSocket-driven real-time architectures to event-driven microservices on{" "}
                <strong className="text-[var(--t1)] font-[500]">AWS</strong>. I design and ship
                REST and GraphQL APIs backed by{" "}
                <strong className="text-[var(--t1)] font-[500]">PostgreSQL</strong>,{" "}
                <strong className="text-[var(--t1)] font-[500]">Redis</strong>, and{" "}
                <strong className="text-[var(--t1)] font-[500]">Elasticsearch</strong>, with
                infrastructure managed through Lambda, ECS, S3, and CloudFormation.
              </p>
              <p>
                On the frontend, I build fast, responsive interfaces with{" "}
                <strong className="text-[var(--t1)] font-[500]">React</strong> and{" "}
                <strong className="text-[var(--t1)] font-[500]">Next.js</strong>, and extend
                that to native mobile with{" "}
                <strong className="text-[var(--t1)] font-[500]">Kotlin</strong> (Jetpack Compose)
                and{" "}
                <strong className="text-[var(--t1)] font-[500]">SwiftUI</strong>. Currently
                shipping across the full stack at{" "}
                <strong className="text-[var(--t1)] font-[500]">DriverAI</strong>.
              </p>
              <p>
                I hold an{" "}
                <strong className="text-[var(--t1)] font-[500]">
                  MS in Information Technology from Arizona State University
                </strong>{" "}
                and have shipped production software across India and the US.
              </p>
            </div>
          </RevealOnScroll>

          {/* Details */}
          <div>
            {details.map((d, i) => (
              <RevealOnScroll key={d.label} delay={i * 60 + 120}>
                <div className="flex justify-between items-center py-4 border-b border-[var(--border)] first:border-t first:border-[var(--border)]">
                  <span className="text-[11px] font-[500] uppercase tracking-[0.1em] text-[var(--t3)]">
                    {d.label}
                  </span>
                  <span
                    className={`text-[14px] text-right ${
                      d.green ? "text-[var(--green)]" : "text-[var(--t2)]"
                    }`}
                  >
                    {d.value}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
