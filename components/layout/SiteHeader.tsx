"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV } from "@/components/layout/nav";

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const istLanding = pathname === "/";

  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const gehZuSektion = (id: string) => {
    if (istLanding) scrollToId(id);
    else router.push(`/#${id}`);
  };
  const zumRechner = () => {
    if (istLanding) scrollToId("rechner");
    else router.push("/#rechner");
  };
  const zumAnfang = () => {
    if (istLanding) window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:h-24 sm:px-6">
        <button type="button" onClick={zumAnfang} className="flex flex-shrink-0 items-center" aria-label="Otter Consult – zum Seitenanfang">
          <Image src="/images/Logo-Otter.png" alt="Otter Consult" width={1500} height={1297} priority className="h-12 w-auto sm:h-16" />
        </button>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <button key={n.id} type="button" onClick={() => gehZuSektion(n.id)} className="text-sm font-medium text-slate-600 transition-colors hover:text-[#15779b]">
              {n.label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={zumRechner} className="flex-shrink-0 rounded-lg bg-[#15779b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#11607d] sm:px-6 sm:py-3 sm:text-base">
          Jetzt Firmenwert ermitteln
        </button>
      </div>
    </header>
  );
}
