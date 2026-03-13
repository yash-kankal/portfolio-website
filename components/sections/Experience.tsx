"use client";

import { type ReactNode } from "react";

type BP = { text: string; bold: boolean };

function parseBullet(s: string): BP[] {
  const parts: BP[] = [];
  const regex = /<b>(.*?)<\/b>/g;
  let last = 0;
  let match;
  while ((match = regex.exec(s)) !== null) {
    if (match.index > last) parts.push({ text: s.slice(last, match.index), bold: false });
    parts.push({ text: match[1], bold: true });
    last = match.index + match[0].length;
  }
  if (last < s.length) parts.push({ text: s.slice(last), bold: false });
  return parts;
}

function Bullet({ text }: { text: string }): ReactNode {
  return (
    <li className="text-[14px] leading-[1.75] text-[var(--t2)] font-light pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--t3)]">
      {parseBullet(text).map((p, i) =>
        p.bold ? (
          <strong key={i} className="text-[var(--t1)] font-medium">{p.text}</strong>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </li>
  );
}

const jobs = [
  {
    company: "DriverAI",
    role: "Software Developer",
    period: "Jan 2026 – Present",
    location: "Tempe, AZ / Remote",
    current: true,
    bullets: [
      "Designed and optimized production-grade backend APIs using <b>FastAPI</b> and <b>PostgreSQL</b>, enforcing Pydantic schema validation, rate limiting, and centralized exception handling — reducing API response latency by <b>25%</b>.",
      "Architected a <b>WebSocket-first real-time</b> backend layer with intelligent polling fallback to synchronize trade and session state across mobile clients, cutting perceived latency by <b>40%</b>.",
      "Provisioned and integrated <b>AWS infrastructure</b> (RDS, S3, Lambda, App Runner) while automating CI/CD workflows through GitHub Actions, reducing provisioning overhead by <b>40%</b>.",
      "Contributed to client-facing development across <b>React.js, Next.js, TypeScript, Kotlin/Jetpack Compose, and SwiftUI</b>, improving end-to-end feature delivery velocity by <b>30%</b>.",
    ],
  },
  {
    company: "Pangian",
    role: "Full Stack Developer Intern",
    period: "Jul 2025 – Aug 2025",
    location: "Remote, USA",
    current: false,
    bullets: [
      "Designed scalable backend APIs using <b>Node.js, Express.js, TypeScript</b> with PostgreSQL and Prisma, integrating Redis caching and Elasticsearch to reduce API response times by <b>30%</b> under high-concurrency load.",
      "Built full-stack features with <b>React.js, Next.js, and TypeScript</b>, integrating secure API contracts and improving maintainability across shared workflows.",
      "Automated <b>CI/CD pipelines</b> using AWS CodePipeline, GitHub Actions, and CloudFormation-based infrastructure as code, improving deployment reliability across environments.",
    ],
  },
  {
    company: "AppWelt",
    role: "Full Stack Developer",
    period: "Oct 2021 – Jun 2023",
    location: "Nagpur, India",
    current: false,
    bullets: [
      "Engineered and scaled <b>12+ production microservices</b> using Node.js, Express.js, React.js, Next.js, and TypeScript, deployed on AWS EC2/ECS with Docker and GitHub Actions CI/CD, improving release velocity by <b>15%</b>.",
      "Reduced page load time by <b>35%</b> and increased session duration by 20% through Redis caching, Elasticsearch indexing, and API-driven frontend performance optimizations.",
      "Boosted database throughput by <b>40%</b> under peak load through targeted PostgreSQL and Prisma query optimization, along with MongoDB aggregation pipeline restructuring.",
    ],
  },
];

function JobCards() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {jobs.map((job) => (
        <div
          key={job.company}
          className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 lg:p-[52px]"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04)" }}
        >
            {/* Card header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[24px] font-bold tracking-[-0.025em]">{job.company}</h3>
                  {job.current && (
                    <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--green)] bg-[rgba(22,163,74,0.07)] border border-[rgba(22,163,74,0.18)] px-[9px] py-[3px] rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-[var(--t2)]">{job.role}</p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-[12px] font-medium text-[var(--t1)] tracking-[0.06em] uppercase">{job.period}</p>
                <p className="text-[12px] text-[var(--t3)] mt-1">{job.location}</p>
              </div>
            </div>

            {/* Bullets */}
            <ul className="flex flex-col gap-3">
              {job.bullets.map((b, j) => (
                <Bullet key={j} text={b} />
              ))}
            </ul>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-4 sm:px-6 lg:px-14 pb-12 sm:pb-16 lg:pb-20" style={{ paddingTop: 0 }}>
      <div className="flex items-end justify-between mb-8 sm:mb-10 lg:mb-12 pb-6 border-b border-[var(--border)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--t3)] mb-3">
            03 / Experience
          </p>
          <h2 className="text-[clamp(40px,5.5vw,80px)] font-extrabold tracking-[-0.04em] leading-none">
            Work Experience
          </h2>
        </div>
      </div>

      <JobCards />
    </section>
  );
}
