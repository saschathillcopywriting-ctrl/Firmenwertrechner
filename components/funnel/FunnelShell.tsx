import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

/**
 * Gemeinsame Hülle für die separaten Funnel-Seiten (Ergebnis, Erstgespräch, Danke).
 * Header + Footer konsistent zur Landingpage; breite, hochwertige Beratungs-Karte
 * auf heller Fläche mit sehr dezenten Corporate-Design-Akzenten.
 * children = Karten-Inhalt (volle Breite + ggf. eigene Innen-Paddings).
 */
export default function FunnelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans">
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-gradient-to-b from-white via-[#f7fafb] to-[#eef3f6]">
        {/* sehr dezente Marken-Akzente */}
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-8%] h-[480px] w-[480px] rounded-full bg-[#15779b]/[0.05] blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-14%] left-[-12%] h-[460px] w-[460px] rounded-full bg-[#15779b]/[0.04] blur-[150px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="overflow-hidden rounded-3xl bg-white text-left shadow-[0_24px_70px_-24px_rgba(15,40,55,0.22)] ring-1 ring-slate-900/[0.06]">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
