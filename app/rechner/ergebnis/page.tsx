"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { useFormularStore } from "@/store/formular-store";
import { berechne, formatEuro } from "@/lib/berechnung";

function Haken({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg
          className="h-2.5 w-2.5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-xs text-gray-500">{text}</span>
    </div>
  );
}

export default function ErgebnisSeite() {
  const { daten, zuruecksetzen, setzeSchritt } = useFormularStore();
  const router = useRouter();
  const [danke, setDanke] = useState(false);

  const ergebnis = berechne(daten);

  useEffect(() => {
    if (!ergebnis) {
      router.replace("/rechner/unternehmen");
    }
  }, [ergebnis, router]);

  if (!ergebnis) return null;

  const neuBerechnen = () => {
    zuruecksetzen();
    setzeSchritt("unternehmen");
    router.push("/rechner/unternehmen");
  };

  return (
    <RechnerLayout titel="" zeigeFortschritt={false}>
      {/* Wert-Hero */}
      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 rounded-t-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-10 text-white sm:px-8 sm:py-12 text-center">
        <p className="text-lg font-semibold text-slate-200 leading-snug sm:text-xl">
          Der aktuell geschätzte Wert deiner Firma beträgt:
        </p>
        <div className="mt-5 space-y-1">
          <p className="text-4xl font-bold tabular-nums sm:text-5xl text-white">
            {formatEuro(ergebnis.unterWert)}
          </p>
          <p className="text-slate-400 text-sm font-medium">bis</p>
          <p className="text-4xl font-bold tabular-nums sm:text-5xl text-blue-300">
            {formatEuro(ergebnis.oberWert)}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {/* CTA */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          {danke ? (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  className="h-7 w-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Vielen Dank.</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 max-w-sm">
                Wir haben deine Angaben erhalten und melden uns innerhalb von 24 bis 48 Stunden
                bei dir.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-gray-700">
                Dieser Wert basiert auf deinen Angaben und den aktuellen Marktwerten deiner
                Branche. Er liefert dir eine erste Orientierung darüber, was dein Unternehmen
                heute wert sein könnte.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Der tatsächliche Verkaufspreis wird jedoch von vielen weiteren Faktoren beeinflusst.
                Genau hier entstehen häufig die größten Unterschiede – und oft auch die größten
                Potenziale.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                In einem kostenlosen und unverbindlichen Gespräch analysieren wir gemeinsam deine
                individuelle Situation. Du erfährst, welchen Wert dein Unternehmen realistisch
                erzielen kann und welche Maßnahmen den Unternehmenswert oft schon innerhalb kurzer
                Zeit deutlich steigern können.
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setDanke(true)}
                  className="w-full rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
                >
                  Jetzt kostenloses Beratungsgespräch vereinbaren
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
                <Haken text="100 % kostenlos und unverbindlich" />
                <Haken text="Experten aus dem Mittelstand" />
                <Haken text="Über 125 Mio. € jährliches Transaktionsvolumen" />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-2">
          <button
            onClick={neuBerechnen}
            className="text-sm text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline transition-colors"
          >
            Neu berechnen
          </button>
        </div>
      </div>
    </RechnerLayout>
  );
}
