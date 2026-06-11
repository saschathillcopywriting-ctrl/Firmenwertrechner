"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormularStore } from "@/store/formular-store";
import { berechne, formatEuro } from "@/lib/berechnung";
import FunnelShell from "@/components/funnel/FunnelShell";

function Haken({ text }: { text: string }) {
  return (
    <span className="flex items-center justify-center gap-2 text-center">
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-3 w-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-xs leading-snug text-slate-600">{text}</span>
    </span>
  );
}

export default function ErgebnisPage() {
  const router = useRouter();
  const { daten, zuruecksetzen } = useFormularStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ergebnis = berechne(daten);

  // Ohne gültige Berechnungsdaten (z. B. Direktaufruf) zurück zur Landingpage.
  useEffect(() => {
    if (mounted && !ergebnis) router.replace("/");
  }, [mounted, ergebnis, router]);

  const neuStarten = () => {
    zuruecksetzen();
    router.push("/");
  };

  return (
    <FunnelShell>
      {mounted && ergebnis ? (
        <>
          {/* Ergebnis – volle Kartenbreite, maximale visuelle Präsenz */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[#0e3a4d] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15779b]/25 blur-[110px]" />
            <p className="relative text-base font-medium text-slate-300 sm:text-lg">
              Der aktuell geschätzte Wert deiner Firma liegt bei:
            </p>
            {ergebnis.firmenwert <= 0 ? (
              <>
                <div className="relative mt-6 flex flex-col items-center gap-1.5">
                  <span className="text-4xl font-bold leading-none tabular-nums sm:text-5xl lg:text-6xl">0 €</span>
                </div>
                <p className="relative mt-6 text-base font-medium text-slate-300 sm:text-lg">
                  Damit ist deine Firma aktuell nicht verkaufbar.
                </p>
              </>
            ) : (
              <div className="relative mt-6 flex flex-col items-center gap-1.5">
                <span className="text-4xl font-bold leading-none tabular-nums sm:text-5xl lg:text-6xl">{formatEuro(ergebnis.unterWert)}</span>
                <span className="text-base font-medium text-slate-400">bis</span>
                <span className="text-4xl font-bold leading-none tabular-nums text-[#9ccbdc] sm:text-5xl lg:text-6xl">{formatEuro(ergebnis.oberWert)}</span>
              </div>
            )}
          </div>

          {/* Körper */}
          <div className="px-6 py-8 sm:px-12 sm:py-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                Du möchtest ein noch genaueres Ergebnis deines Firmenwerts erhalten – und zudem erfahren, mit welchen konkreten Hebeln du ihn gezielt nach oben steigerst?
              </h2>
              <p className="mt-4 text-base font-semibold text-[#15779b] sm:text-lg">
                Dann sichere dir jetzt dein kostenloses und unverbindliches Beratungsgespräch.
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Gemeinsam blicken wir hinter den errechneten Wert und schauen uns dein Unternehmen im Detail an. Anhand vieler Faktoren, die kein Rechner der Welt erfassen kann. Du erfährst, was deine Firma wirklich wert ist und mit welchen konkreten Hebeln du diesen Wert aktiv steigerst.
              </p>
            </div>

            {/* CTA-Bereich – klar als natürlicher nächster Schritt */}
            <div className="mt-8 rounded-2xl border border-[#cfe3ea] bg-gradient-to-br from-[#eef5f8] to-[#e2eef3] p-6 sm:p-8">
              <button
                onClick={() => router.push("/erstgespraech")}
                className="block w-full rounded-xl bg-[#15779b] px-6 py-5 text-base font-semibold text-white shadow-lg shadow-[#15779b]/30 transition-all duration-300 hover:bg-[#11607d] hover:shadow-xl hover:shadow-[#15779b]/40 sm:text-lg"
              >
                Jetzt kostenloses Beratungsgespräch vereinbaren
              </button>

              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#cfe3ea]/80 pt-6 sm:grid-cols-3 sm:gap-4">
                <Haken text="100 % kostenlos und unverbindlich" />
                <Haken text="Experten aus dem Mittelstand" />
                <Haken text="Über 125 Mio. € jährliches Transaktionsvolumen" />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={neuStarten}
                className="text-sm text-slate-400 underline-offset-2 transition-colors hover:text-slate-600 hover:underline"
              >
                Neu berechnen
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-[360px]" />
      )}
    </FunnelShell>
  );
}
