export default function Footer() {
  return (
    <footer className="px-14 py-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-3">
      <span className="text-[12px] text-[var(--t3)]">
        © {new Date().getFullYear()} Yash Amol Kankal
      </span>
      <span className="text-[12px] text-[var(--t3)]">
        Full Stack Developer · Tempe, AZ
      </span>
    </footer>
  );
}
