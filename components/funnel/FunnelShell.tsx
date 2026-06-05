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
      <main className="relative flex-1 overflow-hidden bg-gradient-to-b from-white via-[#f8fafb] to-[#edf3f5]">
        {/* === sehr dezente CI-Hintergrundgestaltung – ausschließlich Außenzonen, nie hinter der Karte === */}

        {/* weiche CI-Verläufe – nur an den Rändern, leicht auslaufend */}
        <div aria-hidden className="pointer-events-none absolute right-[-8%] top-[-6%] h-[540px] w-[540px] rounded-full bg-[#15779b]/[0.06] blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-9%] left-[-8%] h-[520px] w-[520px] rounded-full bg-[#15779b]/[0.05] blur-[150px]" />

        {/* sehr dezente diagonale Linien – rechts oben, zur Mitte hin auslaufend */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[62%] w-[40%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(21,119,155,0.07) 0px, rgba(21,119,155,0.07) 1px, transparent 1px, transparent 22px)",
            WebkitMaskImage: "linear-gradient(225deg, #000 0%, transparent 65%)",
            maskImage: "linear-gradient(225deg, #000 0%, transparent 65%)",
          }}
        />

        {/* sehr dezente diagonale Linien – links unten, zur Mitte hin auslaufend */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[62%] w-[40%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(21,119,155,0.07) 0px, rgba(21,119,155,0.07) 1px, transparent 1px, transparent 22px)",
            WebkitMaskImage: "linear-gradient(45deg, #000 0%, transparent 65%)",
            maskImage: "linear-gradient(45deg, #000 0%, transparent 65%)",
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
