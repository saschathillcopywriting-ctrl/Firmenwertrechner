"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { NAV } from "@/components/layout/nav";

export default function SiteFooter() {
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
    <footer className="border-t border-white/10 bg-[#0e2a37] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-10">
          {/* Logo links (größer) */}
          <button type="button" onClick={zumAnfang} className="flex-shrink-0" aria-label="Otter Consult – zum Seitenanfang">
            <Image src="/images/Logo-Otter.png" alt="Otter Consult" width={1500} height={1297} className="h-14 w-auto brightness-0 invert sm:h-16" />
          </button>

          {/* Navigation mittig */}
          <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            {NAV.map((n) => (
              <button key={n.id} type="button" onClick={() => gehZuSektion(n.id)} className="text-sm text-slate-300 transition-colors hover:text-white">
                {n.label}
              </button>
            ))}
          </nav>

          {/* CTA rechts */}
          <div className="flex-shrink-0">
            <CtaButton onClick={zumRechner} variant="primary" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl leading-relaxed">
            Die Wertermittlung liefert eine unverbindliche erste Orientierung auf Basis des
            Multiplikator-Verfahrens und ersetzt keine individuelle Unternehmensbewertung.
          </p>
          <div className="flex items-center gap-x-5 gap-y-1">
            <a href="https://otterconsult.de/impressum" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">
              Impressum
            </a>
            <a href="https://otterconsult.de/datenschutz" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">
              Datenschutz
            </a>
            <span>© 2026 Otter Consult</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
