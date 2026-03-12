import RevealOnScroll from "@/components/RevealOnScroll";

const links = [
  { label: "yashamolkankal@outlook.com", href: "mailto:yashamolkankal@outlook.com", icon: "✉" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yashkankal", icon: "↗" },
  { label: "GitHub", href: "https://github.com/yash-kankal", icon: "↗" },
  { label: "+1 602-565-5915", href: "tel:+16025655915", icon: "✆" },
];

export default function Contact() {
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
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-link flex items-center gap-[10px] text-[13px] text-[var(--t2)] font-[400] px-0 sm:px-8 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-[var(--border)] first:pl-0 cursor-none hover:text-[var(--t1)] transition-colors"
            >
              <span className="opacity-50 text-base">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
