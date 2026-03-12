import TechIcon from "@/components/TechIcon";

const ITEMS = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Redis",
  "Elasticsearch",
  "GraphQL",
  "Prisma",
  "WebSockets",
  "SwiftUI",
  "Kotlin",
  "Tailwind CSS",
  "Microservices",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-t border-b border-[var(--border)] py-[28px]">
      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[8px] text-[14px] font-[600] tracking-[0.1em] uppercase text-[var(--t1)] px-10 shrink-0"
          >
            <TechIcon name={item} size={16} colored />
            {item}
            <span className="text-[var(--t2)] opacity-40 ml-8">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
