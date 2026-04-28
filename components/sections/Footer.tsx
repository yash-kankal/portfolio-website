export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="text-[12px] text-[var(--t3)]">
          © {new Date().getFullYear()} Yash Amol Kankal
        </span>
        <span className="text-[12px] text-[var(--t3)]">
          Full Stack Developer · Tempe, AZ
        </span>
      </div>
    </footer>
  );
}
