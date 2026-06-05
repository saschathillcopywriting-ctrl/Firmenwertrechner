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
      <main className="relative flex-1 overflow-hidden bg-gradient-to-b from-white via-[#f6fafb] to-[#e6f0f3]">
        {/* === CI-Hintergrundgestaltung – deutlich sichtbar, asymmetrisch, nur Außenzonen, nie hinter der Karte === */}

        {/* ---- rechts oben: Verläufe (Petrol + helles Türkis) + dichtere Diagonalen ---- */}
        <div aria-hidden className="pointer-events-none absolute right-[-6%] top-[-9%] h-[640px] w-[640px] rounded-full bg-[#15779b]/[0.14] blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute right-[5%] top-[-4%] h-[440px] w-[440px] rounded-full bg-[#3bbdd4]/[0.13] blur-[120px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[74%] w-[50%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(21,119,155,0.16) 0px, rgba(21,119,155,0.16) 1.5px, transparent 1.5px, transparent 26px)",
            WebkitMaskImage: "linear-gradient(225deg, #000 0%, #000 24%, transparent 85%)",
            maskImage: "linear-gradient(225deg, #000 0%, #000 24%, transparent 85%)",
          }}
        />

        {/* ---- links unten (asymmetrisch: breiter, lockerere Linien, etwas ruhiger) ---- */}
        <div aria-hidden className="pointer-events-none absolute bottom-[-11%] left-[-9%] h-[740px] w-[740px] rounded-full bg-[#15779b]/[0.12] blur-[150px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-3%] left-[-2%] h-[500px] w-[500px] rounded-full bg-[#3bbdd4]/[0.10] blur-[140px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[64%] w-[56%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(21,119,155,0.13) 0px, rgba(21,119,155,0.13) 1.5px, transparent 1.5px, transparent 32px)",
            WebkitMaskImage: "linear-gradient(45deg, #000 0%, #000 22%, transparent 85%)",
            maskImage: "linear-gradient(45deg, #000 0%, #000 22%, transparent 85%)",
          }}
        />

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
