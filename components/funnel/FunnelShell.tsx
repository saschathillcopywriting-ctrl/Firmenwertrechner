import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

/**
 * Gemeinsame Hülle für die separaten Funnel-Seiten (Ergebnis, Erstgespräch, Danke).
 * Header + Footer konsistent zur Landingpage, helle Fläche, weiße Karte wie der Rechner.
 * children = Karten-Inhalt (optionales Fortschrittsband + <div className="p-6 sm:p-8">…</div>).
 */
export default function FunnelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans">
      <SiteHeader />
      <main className="flex-1 bg-gradient-to-b from-white to-[#f4f7f8]">
        <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl bg-white text-left shadow-2xl shadow-slate-950/40 ring-1 ring-slate-900/5">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
