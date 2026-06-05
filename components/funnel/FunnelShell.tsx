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
      <main className="relative flex-1 overflow-hidden bg-gradient-to-b from-white via-[#f6f9fb] to-[#e9f1f4]">
        {/* === sehr dezente CI-Akzente – ausschließlich in den Randzonen, nie hinter der Karte === */}

        {/* weiche Verläufe – rechts oben & links unten */}
        <div aria-hidden className="pointer-events-none absolute right-[-9%] top-[-7%] h-[500px] w-[500px] rounded-full bg-[#15779b]/[0.06] blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-11%] left-[-11%] h-[480px] w-[480px] rounded-full bg-[#15779b]/[0.05] blur-[140px]" />

        {/* feine, abstrakte Ringe – rechts oben (konzentrisch) */}
        <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-[#15779b]/[0.12]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border border-[#15779b]/[0.08]" />

        {/* feiner, abstrakter Ring – links unten */}
        <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-52 h-[680px] w-[680px] rounded-full border border-[#15779b]/[0.10]" />

        {/* feine Linien – oben und an den Seitenrändern (nur wo Platz neben der Karte ist) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-8 hidden w-px bg-gradient-to-b from-transparent via-slate-300/50 to-transparent lg:block" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-8 hidden w-px bg-gradient-to-b from-transparent via-slate-300/50 to-transparent lg:block" />

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
