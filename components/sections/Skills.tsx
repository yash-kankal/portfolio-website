import RevealOnScroll from "@/components/RevealOnScroll";
import TechIcon from "@/components/TechIcon";

const skills = [
  {
    cat: "Languages",
    tags: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "Kotlin", "Swift", "C++", "HTML", "CSS"],
  },
  {
    cat: "Backend & APIs",
    tags: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets", "GraphQL", "OAuth 2.0", "JWT", "Pydantic", "Zod", "RBAC"],
  },
  {
    cat: "Frontend",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    cat: "Mobile",
    tags: ["Jetpack Compose", "SwiftUI", "Retrofit", "MVVM"],
  },
  {
    cat: "Databases",
    tags: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Elasticsearch", "AWS RDS", "Redshift", "Oracle"],
  },
  {
    cat: "Cloud & DevOps",
    tags: ["AWS Lambda", "S3", "Kinesis", "CloudFormation", "RDS", "ECS", "EC2", "App Runner", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "CodePipeline"],
  },
  {
    cat: "Architecture",
    tags: ["Prisma", "Microservices", "Event-Driven", "CI/CD", "Infrastructure as Code", "Real-Time Systems"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-14 pb-12 sm:pb-16 lg:pb-20" style={{ paddingTop: 0 }}>
      <div className="flex items-end justify-between mb-8 sm:mb-10 lg:mb-12 pb-6 border-b border-[var(--border)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--t3)] mb-3">
            02 / Stack
          </p>
          <h2 className="text-[clamp(40px,5.5vw,80px)] font-extrabold tracking-[-0.04em] leading-none">
            Technical Skills
          </h2>
        </div>
      </div>

      <div>
        {skills.map((row, i) => (
          <RevealOnScroll key={row.cat} delay={i * 50}>
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3 sm:gap-8 lg:gap-12 py-5 sm:py-6 border-b border-[var(--border)] first:border-t first:border-[var(--border)]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--t2)] pt-1">
                {row.cat}
              </span>
              <div className="flex flex-wrap gap-[7px]">
                {row.tags.map((tag) => (
                  <span
                    key={tag}
                    className="stag inline-flex items-center gap-[6px] text-[13px] sm:text-[14px] font-[500] text-[var(--t1)] px-3 sm:px-[14px] py-[6px] border border-[var(--border)] rounded-full cursor-default hover:border-[var(--border2)] transition-all"
                  >
                    <TechIcon name={tag} size={13} className="shrink-0" colored />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
