"use client";

function ArrowUpIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  );
}

export function CtaButton({
  onClick,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  onClick: () => void;
  variant?: "primary" | "dark" | "light";
  className?: string;
  arrow?: boolean;
}) {
  const styles = {
    primary: "bg-[#15779b] text-white shadow-sm hover:bg-[#11607d]",
    dark: "bg-slate-900 text-white shadow-lg hover:bg-slate-800",
    light: "bg-white text-slate-900 shadow-lg hover:bg-slate-100",
  }[variant];
  return (
    <button type="button" onClick={onClick} className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300 ${styles} ${className}`}>
      Jetzt Firmenwert ermitteln
      {arrow && <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />}
    </button>
  );
}
