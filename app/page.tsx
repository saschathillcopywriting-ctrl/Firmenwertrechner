"use client";

import { useState } from "react";
import Image from "next/image";
import RechnerWizard from "@/components/rechner/RechnerWizard";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
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
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    titel: "Klarheit über dein größtes Asset",
    text: "Für die meisten Unternehmer steckt ein Großteil ihres Vermögens in der eigenen Firma. Zu wissen, was sie wert ist, ist die Grundlage für jede größere Entscheidung – von der Altersvorsorge bis zur Nachfolge.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    titel: "Vorbereitet sein, bevor es ernst wird",
    text: "Ein Angebot kommt oft schneller, als man denkt. Durch einen Wettbewerber, einen Investor oder einen Nachfolger. Wer seinen Wert kennt, kann einschätzen, ob eine Zahl fair ist, statt aus dem Bauch heraus zu entscheiden.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    titel: "Hebel zur Wertsteigerung erkennen",
    text: "Der Firmenwert ist kein Schicksal. Faktoren wie Inhaberabhängigkeit, wiederkehrende Umsätze oder Kundenstruktur lassen sich gezielt verbessern. Aber nur, wenn du früh genug weißt, wo du stehst.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    titel: "Realistische Erwartung statt Wunschdenken",
    text: "Manche unterschätzen ihre Firma, andere überschätzen sie massiv. Eine erste belastbare Einschätzung holt dich auf den Boden der Tatsachen – in beide Richtungen.",
  },
];

const SCHRITTE_HOW: { titel: string; text: string }[] = [
  { titel: "Eckdaten eingeben", text: "Du trägst Branche, Umsatz und Gewinn ein und beantwortest ein paar kurze Fragen zu deinem Unternehmen. Das Ganze dauert nur wenige Minuten." },
  { titel: "Marktwerte anwenden", text: "Dein Gewinn wird mit dem aktuellen Branchenfaktor multipliziert. Dazu kommen Faktoren, die deinen Wert nach oben oder unten ziehen – zum Beispiel, wie unabhängig dein Betrieb von dir läuft." },
  { titel: "Dein individuelles Ergebnis", text: "Du siehst sofort eine realistische Spanne, in der dein Firmenwert aktuell liegt. Kostenlos und direkt auf der Seite." },
];

const VERTRAUEN: { titel: string; text: string }[] = [
  { titel: "Spezialisiert auf den Mittelstand", text: "Wir kennen die Besonderheiten inhabergeführter Unternehmen – und sprechen deine Sprache." },
  { titel: "Diskret & vertrauensvoll", text: "Dein Vorhaben und deine Zahlen behandeln wir absolut vertraulich. Ohne Ausnahme." },
  { titel: "Von der Bewertung bis zum Abschluss", text: "Wir begleiten dich persönlich durch den gesamten Prozess – fundiert und auf Augenhöhe." },
];

const FAQS: { frage: string; antwort: string }[] = [
  { frage: "Ist die Wertermittlung wirklich kostenlos?", antwort: "Ja, zu 100 %. Du gibst deine Eckdaten ein und erhältst sofort eine erste Einschätzung – ohne Kosten und Verpflichtung." },
  { frage: "Wie genau ist das Ergebnis?", antwort: "Der Rechner liefert eine fundierte erste Orientierung auf Basis aktueller Marktwerte und des anerkannten Multiplikator-Verfahrens. Du bekommst eine realistische Spanne, in der dein Firmenwert aktuell liegt – ideal, um ein belastbares Gefühl für die Größenordnung zu bekommen." },
  { frage: "Was passiert mit meinen Daten?", antwort: "Deine Angaben werden vertraulich behandelt und nicht an Dritte weitergegeben. Sie dienen ausschließlich dazu, deinen Firmenwert zu ermitteln." },
  { frage: "Muss ich meine Firma verkaufen wollen?", antwort: "Nein. Viele nutzen den Rechner einfach, um zu wissen, wo sie stehen, ganz ohne konkrete Verkaufsabsicht. Gerade wer erst in einigen Jahren verkaufen möchte, profitiert davon, seinen Wert früh zu kennen." },
  { frage: "Welche Daten brauche ich für die Berechnung?", antwort: "Die Basis bilden deine Branche, dein Jahresumsatz und dein Gewinn. Dazu kommen ein paar Fragen zu Faktoren wie Inhaberabhängigkeit oder wiederkehrenden Umsätzen, die den Wert mitbestimmen. Das sind alles Zahlen, die du als Unternehmer im Kopf oder griffbereit hast – aufwändige Unterlagen brauchst du nicht." },
  { frage: "Wie lange dauert es?", antwort: "In der Regel unter fünf Minuten. Du klickst dich durch ein paar Schritte und erhältst am Ende direkt dein Ergebnis." },
];

const TRUST = ["100 % kostenlos & unverbindlich", "In wenigen Minuten erledigt", "Basierend auf echten Marktwerten"];

/* ------------------------------------------------------------------ */
/*  FAQ-Item                                                           */
/* ------------------------------------------------------------------ */
function FaqItem({ frage, antwort, offen, onToggle }: { frage: string; antwort: string; offen: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${offen ? "border-blue-200 shadow-lg shadow-blue-900/5" : "border-slate-200 hover:border-slate-300"}`}>
      <button type="button" onClick={onToggle} aria-expanded={offen} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7">
        <span className="text-base font-semibold text-slate-900 sm:text-lg">{frage}</span>
        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${offen ? "rotate-180 bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          <ChevronDown />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${offen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-6 leading-relaxed text-slate-600 sm:px-7">{antwort}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA-Button                                                         */
/* ------------------------------------------------------------------ */
function CtaButton({ onClick, variant = "primary", className = "" }: { onClick: () => void; variant?: "primary" | "dark" | "light"; className?: string }) {
  const styles = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40",
    dark: "bg-slate-900 text-white shadow-lg hover:bg-slate-800",
    light: "bg-white text-slate-900 shadow-lg hover:bg-slate-100",
  }[variant];
  return (
    <button type="button" onClick={onClick} className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300 ${styles} ${className}`}>
      Jetzt Firmenwert ermitteln
      <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Landingpage                                                        */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  const [offeneFaq, setOffeneFaq] = useState<number | null>(null);
  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const zumRechner = () => scrollToId("rechner");

  return (
    <div className="font-sans bg-slate-950">
      {/* ============================================================ */}
      {/*  HEADER                                                      */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center" aria-label="Otter Consult – zum Seitenanfang">
            <Image src="/images/Logo-Otter.png" alt="Otter Consult" width={1500} height={1297} priority className="h-9 w-auto sm:h-10" />
          </button>
          <CtaButton onClick={zumRechner} variant="primary" className="!px-4 !py-2.5 !text-sm sm:!px-6 sm:!py-3 sm:!text-base" />
        </div>
      </header>

      {/* ============================================================ */}
      {/*  SEKTION 1 – HERO                                            */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-12%] h-[560px] w-[900px] max-w-[130%] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black, transparent)",
        }} />

        <div className="relative mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-20">
          <p className="text-sm font-semibold tracking-wide text-blue-300 sm:text-base">
            Für Unternehmer, die ihr Lebenswerk nicht dem Zufall überlassen wollen
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Was würde ein Käufer heute für deine Firma{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">wirklich zahlen?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Gib ein paar Eckdaten zu deinem Unternehmen ein und erhalte sofort eine erste Einschätzung
            deines Firmenwerts – basierend auf aktuellen Marktwerten und dem Verfahren, das auch Käufer
            und Berater nutzen.
          </p>
        </div>

        {/* Berater + Rechner */}
        <div className="relative mx-auto mt-12 max-w-7xl px-4 pb-16 sm:pb-20">
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)_minmax(0,1fr)]">
            {/* Michael links */}
            <div className="relative hidden items-end justify-center lg:flex">
              <div aria-hidden className="absolute bottom-8 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl" />
              <figure className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-blue-950/50 ring-1 ring-white/10">
                <Image src="/images/Michael-Otter.png" alt="Michael Otter, Berater bei Otter Consult" width={1112} height={1667} sizes="320px" className="h-auto w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 pb-5 pt-14">
                  <p className="text-base font-bold text-white">Michael Otter</p>
                  <p className="text-xs text-blue-200">Otter Consult</p>
                </figcaption>
              </figure>
            </div>

            {/* Wizard */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-blue-500/20 blur-3xl" />
              <div className="relative">
                <RechnerWizard />
              </div>
            </div>

            {/* Fabian rechts */}
            <div className="relative hidden items-end justify-center lg:flex">
              <div aria-hidden className="absolute bottom-8 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
              <figure className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-blue-950/50 ring-1 ring-white/10">
                <Image src="/images/Fabian-Otter.png" alt="Fabian Otter, Berater bei Otter Consult" width={1707} height={2560} sizes="320px" className="h-auto w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 pb-5 pt-14">
                  <p className="text-base font-bold text-white">Fabian Otter</p>
                  <p className="text-xs text-blue-200">Otter Consult</p>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Trust-Zeile */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
      {/*  SEKTION 2 – WARUM (4 Gründe)                                */}
      {/* ============================================================ */}
      <section id="warum" className="scroll-mt-20 bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">Gute Gründe</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              4 Gründe, warum du auch ohne Verkaufsabsicht den Wert deiner Firma kennen solltest
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {VORTEILE.map((v) => (
              <div key={v.titel} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10">
                <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 transition-all duration-500 group-hover:scale-[2.2] group-hover:bg-blue-100/60" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105">
                    {v.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">{v.titel}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 3 – VERTRAUEN (Otter Consult)                       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute left-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                <Image src="/images/Fabian-Otter-Frau.png" alt="Das Beraterteam von Otter Consult" width={2560} height={1707} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-400">Otter Consult</span>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Warum Unternehmer bei Firmenverkauf und Nachfolge auf Otter Consult vertrauen
              </h2>
              <p className="mt-5 leading-relaxed text-slate-300">
                Der Verkauf des eigenen Unternehmens ist eine der wichtigsten Entscheidungen im Leben eines
                Unternehmers. Genau deshalb begleiten wir dich mit Erfahrung, Diskretion und einem klaren
                Blick für den wahren Wert deines Lebenswerks.
              </p>

              <ul className="mt-8 space-y-5">
                {VERTRAUEN.map((p) => (
                  <li key={p.titel} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{p.titel}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-bold text-white">125 Mio. €+</p>
                  <p className="mt-1 text-sm text-slate-400">jährliches Transaktionsvolumen</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100 %</p>
                  <p className="mt-1 text-sm text-slate-400">Fokus auf den Mittelstand</p>
                </div>
              </div>

              <div className="mt-10">
                <CtaButton onClick={zumRechner} variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 4 – SO FUNKTIONIERT'S (3 Schritte)                  */}
      {/* ============================================================ */}
      <section id="ablauf" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">So funktioniert&apos;s</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              In nur 3 Schritten zu deinem individuellen Firmenwert
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Unser Rechner nutzt das Verfahren, das auch im professionellen Firmenverkauf der Standard ist:
              das Multiplikator-Verfahren. Dein Wert ergibt sich dabei nicht aus einer Zufallszahl, sondern
              aus realen Marktdaten.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6">
            <div aria-hidden className="absolute left-[16%] right-[16%] top-7 hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 sm:block" />
            {SCHRITTE_HOW.map((s, i) => (
              <div key={s.titel} className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-xl font-bold text-white shadow-lg shadow-blue-600/30 ring-8 ring-slate-50">
                  {i + 1}
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">{s.titel}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-2xl text-center leading-relaxed text-slate-600">
            So bekommst du in nur wenigen Minuten eine fundierte erste Orientierung ganz ohne
            Terminunterlagen oder Kosten.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton onClick={zumRechner} variant="primary" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 5 – FAQ                                             */}
      {/* ============================================================ */}
      <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Bevor du loslegst, das Wichtigste in Kürze
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FaqItem key={f.frage} frage={f.frage} antwort={f.antwort} offen={offeneFaq === i} onToggle={() => setOffeneFaq(offeneFaq === i ? null : i)} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <CtaButton onClick={zumRechner} variant="dark" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t border-white/10 bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3 md:items-start">
            {/* Links: Logo */}
            <div>
              <Image src="/images/Logo-Otter.png" alt="Otter Consult" width={1500} height={1297} className="h-10 w-auto brightness-0 invert" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Deine Spezialisten für Firmenverkauf und Nachfolge im Mittelstand.
              </p>
            </div>

            {/* Mitte: Navigation */}
            <nav className="flex flex-col gap-3 md:items-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Navigation</p>
              <button onClick={() => scrollToId("warum")} className="text-left text-sm text-slate-300 transition-colors hover:text-white">Warum Firmenwert ermitteln</button>
              <button onClick={() => scrollToId("ablauf")} className="text-left text-sm text-slate-300 transition-colors hover:text-white">Wie funktioniert es</button>
              <button onClick={() => scrollToId("faq")} className="text-left text-sm text-slate-300 transition-colors hover:text-white">Fragen &amp; Antworten</button>
            </nav>

            {/* Rechts: CTA */}
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-sm leading-relaxed text-slate-400 md:text-right">
                Erfahre in wenigen Minuten, was dein Unternehmen heute wert ist.
              </p>
              <CtaButton onClick={zumRechner} variant="primary" />
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl leading-relaxed">
              Die Wertermittlung liefert eine unverbindliche erste Orientierung auf Basis des
              Multiplikator-Verfahrens und ersetzt keine individuelle Unternehmensbewertung.
            </p>
            <p>© 2026 Otter Consult</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
