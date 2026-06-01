"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { useFormularStore } from "@/store/formular-store";
import { berechne, formatEuro } from "@/lib/berechnung";

function Haken({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
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

  const positiveFaktoren = ergebnis.faktoren.filter((f) => f.delta > 0);
  const negativeFaktoren = ergebnis.faktoren.filter((f) => f.delta < 0);

  const neuBerechnen = () => {
    zuruecksetzen();
    setzeSchritt("unternehmen");
    router.push("/rechner/unternehmen");
  };

  return (
    <RechnerLayout titel="" zeigeFortschritt={false}>
      {/* Wert-Hero */}
      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 rounded-t-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-10 text-white sm:px-8 sm:py-12">
        <p className="text-sm font-medium text-slate-300 leading-snug">
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
        {/* Faktoren */}
        {(positiveFaktoren.length > 0 || negativeFaktoren.length > 0) && (
          <div className="rounded-xl border border-gray-100 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              Wertbeeinflussende Faktoren
            </h3>
            <div className="space-y-2">
              {positiveFaktoren.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        className="h-3 w-3 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">{f.label}</span>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    +{f.delta.toFixed(2)}x
                  </span>
                </div>
              ))}
              {negativeFaktoren.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-3 w-3 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">{f.label}</span>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                    {f.delta.toFixed(2)}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
                Wir haben deine Angaben erhalten und melden uns innerhalb von 24–48 Stunden bei
                dir.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-gray-700">
                Dieser Wert basiert auf deinen Angaben und den aktuellen Marktwerten deiner
                Branche. Er gibt dir eine erste Orientierung, in welcher Größenordnung dein
                Unternehmen aktuell liegt.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Der tatsächlich erzielbare Verkaufspreis liegt in der Praxis jedoch oft deutlich
                höher oder niedriger. Er hängt von Faktoren ab, die sich über ein paar Fragen
                nicht erfassen lassen. Von der Aufbereitung deiner Zahlen über die aktuelle
                Marktlage bis hin zu den Hebeln, mit denen du deinen Wert gezielt steigern kannst.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Und genau diese Faktoren können wir uns gemeinsam in einem kostenlosen und
                unverbindlichen Gespräch anschauen. Darin ermitteln wir, was deine Firma wirklich
                wert ist, und wir zeigen dir transparent, an welchen Stellschrauben du drehen
                kannst, um diesen Wert zu erhöhen.
              </p>
              <button
                onClick={() => setDanke(true)}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Kostenloses Gespräch vereinbaren
              </button>
              <div className="mt-4 flex flex-col gap-2">
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
