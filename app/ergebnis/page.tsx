"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormularStore } from "@/store/formular-store";
import { berechne, formatEuro } from "@/lib/berechnung";
import FunnelShell from "@/components/funnel/FunnelShell";

function Haken({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-2.5 w-2.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-xs text-slate-500">{text}</span>
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
      <div className="p-6 sm:p-8">
        {mounted && ergebnis ? (
          <div>
            <div className="-mx-6 -mt-6 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0e3a4d] px-6 py-10 text-center text-white sm:-mx-8 sm:-mt-8 sm:px-8 sm:py-12">
              <p className="mt-5 text-base font-medium text-slate-300 sm:text-lg">
                Der aktuell geschätzte Wert deiner Firma liegt bei:
              </p>
              <div className="mt-4 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
                <span className="text-3xl font-bold tabular-nums sm:text-4xl">{formatEuro(ergebnis.unterWert)}</span>
                <span className="pb-1 text-slate-400">bis</span>
                <span className="text-3xl font-bold tabular-nums text-[#9ccbdc] sm:text-4xl">{formatEuro(ergebnis.oberWert)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-[#cfe3ea] bg-[#eef5f8] p-6">
                <p className="text-sm leading-relaxed text-slate-700">
                  Dieser Wert basiert auf deinen Angaben und den aktuellen Marktwerten deiner Branche. Er liefert dir eine erste Orientierung darüber, was dein Unternehmen heute wert sein könnte.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Der tatsächliche Verkaufspreis wird jedoch von vielen weiteren Faktoren beeinflusst. Genau hier entstehen häufig die größten Unterschiede und oft auch die größten Potenziale.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  In einem kostenlosen und unverbindlichen Gespräch analysieren wir gemeinsam deine individuelle Situation. Du erfährst, welchen Wert dein Unternehmen realistisch erzielen kann und welche Maßnahmen den Unternehmenswert oft schon innerhalb kurzer Zeit deutlich steigern können.
                </p>

                <button
                  onClick={() => router.push("/erstgespraech")}
                  className="mt-5 -mx-5 w-[calc(100%_+_2.5rem)] rounded-xl bg-[#15779b] px-5 py-4 text-base font-semibold text-white shadow-lg shadow-[#15779b]/30 transition-colors hover:bg-[#11607d]"
                >
                  Jetzt kostenloses Beratungsgespräch vereinbaren
                </button>

                <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
                  <Haken text="100 % kostenlos und unverbindlich" />
                  <Haken text="Experten aus dem Mittelstand" />
                  <Haken text="Über 125 Mio. € jährliches Transaktionsvolumen" />
                </div>
              </div>

              <div className="flex justify-center pt-1">
                <button
                  onClick={neuStarten}
                  className="text-sm text-slate-400 underline-offset-2 transition-colors hover:text-slate-600 hover:underline"
                >
                  Neu berechnen
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[320px]" />
        )}
      </div>
    </FunnelShell>
  );
}
