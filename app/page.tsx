"use client";

import { useState } from "react";
import UnternehmenSeite from "@/app/rechner/unternehmen/page";
import { EingebettetContext } from "@/components/layout/RechnerLayout";

/* ------------------------------------------------------------------ */
/*  Icons (Heroicons-Stil, inline – keine externen Abhängigkeiten)     */
/* ------------------------------------------------------------------ */

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ChevronDown({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function ArrowUpIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Inhalte                                                            */
/* ------------------------------------------------------------------ */

const VORTEILE: { icon: React.ReactNode; titel: string; text: string }[] = [
  {
    // Klarheit / größtes Asset – Balkendiagramm
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    titel: "Klarheit über dein größtes Asset",
    text: "Für die meisten Unternehmer steckt ein Großteil ihres Vermögens in der eigenen Firma. Zu wissen, was sie wert ist, ist die Grundlage für jede größere Entscheidung – von der Altersvorsorge bis zur Nachfolge.",
  },
  {
    // Vorbereitet sein – Schild mit Haken
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    titel: "Vorbereitet sein, bevor es ernst wird",
    text: "Ein Angebot kommt oft schneller, als man denkt. Durch einen Wettbewerber, einen Investor oder einen Nachfolger. Wer seinen Wert kennt, kann einschätzen, ob eine Zahl fair ist, statt aus dem Bauch heraus zu entscheiden.",
  },
  {
    // Hebel zur Wertsteigerung – Trend nach oben
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
    titel: "Hebel zur Wertsteigerung erkennen",
    text: "Der Firmenwert ist kein Schicksal. Faktoren wie Inhaberabhängigkeit, wiederkehrende Umsätze oder Kundenstruktur lassen sich gezielt verbessern. Aber nur, wenn du früh genug weißt, wo du stehst.",
  },
  {
    // Realistische Erwartung – Waage
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
        />
      </svg>
    ),
    titel: "Realistische Erwartung statt Wunschdenken",
    text: "Manche unterschätzen ihre Firma, andere überschätzen sie massiv. Eine erste belastbare Einschätzung holt dich auf den Boden der Tatsachen – in beide Richtungen.",
  },
];

const SCHRITTE_HOW: { titel: string; text: string }[] = [
  {
    titel: "Eckdaten eingeben",
    text: "Du trägst Branche, Umsatz und Gewinn ein und beantwortest ein paar kurze Fragen zu deinem Unternehmen. Das Ganze dauert nur wenige Minuten.",
  },
  {
    titel: "Marktwerte anwenden",
    text: "Dein Gewinn wird mit dem aktuellen Branchenfaktor multipliziert. Dazu kommen Faktoren, die deinen Wert nach oben oder unten ziehen – zum Beispiel, wie unabhängig dein Betrieb von dir läuft.",
  },
  {
    titel: "Dein individuelles Ergebnis",
    text: "Du siehst sofort eine realistische Spanne, in der dein Firmenwert aktuell liegt. Kostenlos und direkt auf der Seite.",
  },
];

const FAQS: { frage: string; antwort: string }[] = [
  {
    frage: "Ist die Wertermittlung wirklich kostenlos?",
    antwort:
      "Ja, zu 100 %. Du gibst deine Eckdaten ein und erhältst sofort eine erste Einschätzung – ohne Kosten und Verpflichtung.",
  },
  {
    frage: "Wie genau ist das Ergebnis?",
    antwort:
      "Der Rechner liefert eine fundierte erste Orientierung auf Basis aktueller Marktwerte und des anerkannten Multiplikator-Verfahrens. Du bekommst eine realistische Spanne, in der dein Firmenwert aktuell liegt – ideal, um ein belastbares Gefühl für die Größenordnung zu bekommen.",
  },
  {
    frage: "Was passiert mit meinen Daten?",
    antwort:
      "Deine Angaben werden vertraulich behandelt und nicht an Dritte weitergegeben. Sie dienen ausschließlich dazu, deinen Firmenwert zu ermitteln.",
  },
  {
    frage: "Muss ich meine Firma verkaufen wollen?",
    antwort:
      "Nein. Viele nutzen den Rechner einfach, um zu wissen, wo sie stehen, ganz ohne konkrete Verkaufsabsicht. Gerade wer erst in einigen Jahren verkaufen möchte, profitiert davon, seinen Wert früh zu kennen.",
  },
  {
    frage: "Welche Daten brauche ich für die Berechnung?",
    antwort:
      "Die Basis bilden deine Branche, dein Jahresumsatz und dein Gewinn. Dazu kommen ein paar Fragen zu Faktoren wie Inhaberabhängigkeit oder wiederkehrenden Umsätzen, die den Wert mitbestimmen. Das sind alles Zahlen, die du als Unternehmer im Kopf oder griffbereit hast – aufwändige Unterlagen brauchst du nicht.",
  },
  {
    frage: "Wie lange dauert es?",
    antwort:
      "In der Regel unter fünf Minuten. Du klickst dich durch ein paar Schritte und erhältst am Ende direkt dein Ergebnis.",
  },
];

const TRUST = [
  "100 % kostenlos & unverbindlich",
  "In wenigen Minuten erledigt",
  "Basierend auf echten Marktwerten",
];

/* ------------------------------------------------------------------ */
/*  FAQ-Akkordeon                                                      */
/* ------------------------------------------------------------------ */

function FaqItem({
  frage,
  antwort,
  offen,
  onToggle,
}: {
  frage: string;
  antwort: string;
  offen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-slate-300">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={offen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
      >
        <span className="text-base font-semibold text-slate-900 sm:text-lg">{frage}</span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 ${
            offen ? "rotate-180 bg-blue-600 text-white" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          offen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-7">{antwort}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Landingpage                                                        */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const [offeneFaq, setOffeneFaq] = useState<number | null>(null);

  const zumRechner = () => {
    document.getElementById("rechner")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="font-sans">
      {/* ============================================================ */}
      {/*  SEKTION 1 – HERO                                            */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Hintergrund-Dekor */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-15%] h-[520px] w-[820px] max-w-[120%] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-16 text-center sm:pb-28 sm:pt-20">
          {/* Pre-Headline */}
          <p className="text-sm font-semibold tracking-wide text-blue-300 sm:text-base">
            Für Unternehmer, die ihr Lebenswerk nicht dem Zufall überlassen wollen
          </p>

          {/* Headline */}
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Was würde ein Käufer heute für deine Firma{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              wirklich zahlen?
            </span>
          </h1>

          {/* Sub-Headline */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Gib ein paar Eckdaten zu deinem Unternehmen ein und erhalte sofort eine erste
            Einschätzung deines Firmenwerts – basierend auf aktuellen Marktwerten und dem Verfahren,
            das auch Käufer und Berater nutzen.
          </p>

          {/* Eingebetteter Rechner */}
          <div id="rechner" className="relative mx-auto mt-10 max-w-2xl scroll-mt-6 sm:mt-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-blue-500/20 blur-3xl"
            />
            <div className="relative">
              <EingebettetContext.Provider value={true}>
                <UnternehmenSeite />
              </EingebettetContext.Provider>
            </div>
          </div>

          {/* Trust-Zeile */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-sm text-slate-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 2 – WARUM                                           */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              4 Gründe, warum du auch ohne Verkaufsabsicht den Wert deiner Firma kennen solltest:
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {VORTEILE.map((v) => (
              <div
                key={v.titel}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {v.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{v.titel}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 3 – SO FUNKTIONIERT'S                               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              In nur 3 Schritten zu deinem individuellen Firmenwert
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Unser Rechner nutzt das Verfahren, das auch im professionellen Firmenverkauf der
              Standard ist: das Multiplikator-Verfahren. Dein Wert ergibt sich dabei nicht aus einer
              Zufallszahl, sondern aus realen Marktdaten.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {SCHRITTE_HOW.map((s, i) => (
              <div
                key={s.titel}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm sm:text-left"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-xl font-bold text-white shadow-lg shadow-blue-900/40 sm:mx-0">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{s.titel}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-2xl text-center leading-relaxed text-slate-300">
            So bekommst du in nur wenigen Minuten eine fundierte erste Orientierung ganz ohne
            Terminunterlagen oder Kosten.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={zumRechner}
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
            >
              Jetzt Firmenwert ermitteln
              <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 4 – FAQ                                             */}
      {/* ============================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Bevor du loslegst, das Wichtigste in Kürze
          </h2>

          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.frage}
                frage={f.frage}
                antwort={f.antwort}
                offen={offeneFaq === i}
                onToggle={() => setOffeneFaq(offeneFaq === i ? null : i)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={zumRechner}
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800"
            >
              Jetzt Firmenwert ermitteln
              <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t border-white/10 bg-slate-950 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-400">
              Firmenwertrechner
            </span>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
              Die Wertermittlung liefert eine unverbindliche erste Orientierung auf Basis des
              Multiplikator-Verfahrens und ersetzt keine individuelle Unternehmensbewertung.
            </p>
          </div>
          <p className="text-xs text-slate-500">© 2026 Firmenwertrechner</p>
        </div>
      </footer>
    </div>
  );
}
