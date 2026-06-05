"use client";

import { useState } from "react";
import Image from "next/image";
import RechnerWizard from "@/components/rechner/RechnerWizard";
import { CtaButton } from "@/components/ui/CtaButton";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

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
    titel: "Klarheit über dein größtes Asset.",
    text: "Für die meisten Unternehmer steckt ein Großteil ihres Vermögens in der eigenen Firma. Trotzdem kennen viele den eigenen Unternehmenswert nicht. Dabei ist genau dieser Wert die Grundlage für wichtige Entscheidungen – von der Altersvorsorge bis zur Nachfolge. Der eigenentwickelte KMU-Firmenwertrechner von der Otter Consult liefert dafür eine erste realistische Orientierung auf der Basis von Hunderten Unternehmensverkäufen im Mittelstand.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    titel: "Vorbereitet sein, bevor es ernst wird.",
    text: "Ein Angebot kommt oft schneller, als man denkt. Durch einen Wettbewerber, einen Investor oder einen Nachfolger. Wer seinen Unternehmenswert kennt, kann einschätzen, ob eine Zahl fair ist, statt aus dem Bauch heraus zu entscheiden. Der KMU-Firmenwertrechner basiert dabei auf einer eigenen Datenbank von realen Transaktionen und liefert dir eine fundierte erste Orientierung, bevor konkrete Verhandlungen überhaupt beginnen.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    titel: "Hebel zur Wertsteigerung erkennen.",
    text: "Der Firmenwert ist kein Schicksal. Faktoren wie Inhaberabhängigkeit, wiederkehrende Umsätze oder Kundenstruktur lassen sich gezielt verbessern und den Firmenwert steigern. Genau diese und weitere Faktoren fließen auch in die Bewertung des KMU-Firmenwertrechners mit ein und helfen dir dabei, zu erkennen, mit welchen Stellschrauben du den Wert deines Unternehmens erhöhen kannst.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    titel: "Realistische Erwartung statt Wunschdenken.",
    text: "Manche Unternehmer unterschätzen ihre Firma, andere überschätzen sie massiv. Beides kann später zu teuren Fehlentscheidungen führen. Viele Firmenwertrechner arbeiten mit pauschalen Multiplikatoren oder theoretischen Standardwerten. Der KMU-Firmenwertrechner von der Otter Consult orientiert sich dagegen an realen Zahlen der letzten Jahre und hilft dir dabei, den Wert deines Unternehmens deutlich realistischer einzuordnen.",
  },
];

const SCHRITTE_HOW: { titel: string; text: string }[] = [
  { titel: "Eckdaten eingeben.", text: "Du trägst deine Branche, Umsatz und Gewinn ein und beantwortest ein paar kurze Fragen zu deinem Unternehmen. Das Ganze dauert nur wenige Minuten." },
  { titel: "Praxisdaten statt Standardwerte.", text: "Neben deinen Unternehmenszahlen berücksichtigt der Rechner Faktoren, die auch in realen Verkaufsprozessen eine wichtige Rolle spielen – zum Beispiel Inhaberabhängigkeit, Kundenstruktur oder wiederkehrende Umsätze." },
  { titel: "Dein individuelles Ergebnis.", text: "Du erhältst sofort auf der Seite eine realistische erste Einschätzung deines Firmenwerts – basierend auf Erfahrungen aus Hunderten Unternehmensverkäufen im Mittelstand." },
];

const FAQS: { frage: string; antwort: string }[] = [
  { frage: "Ist die Wertermittlung wirklich kostenlos?", antwort: "Ja, zu 100 %. Du gibst deine Eckdaten ein und erhältst sofort eine erste Einschätzung – ohne Kosten und Verpflichtung." },
  { frage: "Wie genau ist das Ergebnis?", antwort: "Der KMU-Firmenwertrechner von der Otter Consult wurde auf Basis einer eigenen Datenbank sowie der Erfahrungen aus Hunderten Unternehmensverkäufen im Mittelstand entwickelt. Statt auf pauschale Multiplikatoren oder theoretische Standardwerte zu setzen, basiert die Einschätzung auf Erkenntnissen aus realen Transaktionen und tatsächlich erzielten Verkaufspreisen. Dadurch erhältst du eine deutlich praxisnähere Orientierung als bei vielen klassischen Firmenwertrechnern." },
  { frage: "Ich habe meinen Firmenwert bereits mit einem anderen Rechner ermittelt. Lohnt sich das trotzdem?", antwort: "Ja. Viele Firmenwertrechner arbeiten mit pauschalen Multiplikatoren und allgemeinen Annahmen. Der KMU-Firmenwertrechner von der Otter Consult basiert dagegen auf einer eigenen Datenbank sowie den Erfahrungen aus Hunderten Unternehmensverkäufen im Mittelstand. Dadurch erhältst du eine zweite Einschätzung auf Basis realer Transaktionen und kannst besser beurteilen, welcher Firmenwert am Markt tatsächlich durchsetzbar sein könnte." },
  { frage: "Was passiert mit meinen Daten?", antwort: "Deine Angaben werden vertraulich behandelt und nicht an Dritte weitergegeben. Sie dienen ausschließlich dazu, deinen Firmenwert zu ermitteln." },
  { frage: "Muss ich meine Firma verkaufen wollen?", antwort: "Nein. Viele nutzen den Rechner einfach, um zu wissen, wo sie stehen, ganz ohne konkrete Verkaufsabsicht. Gerade wer erst in einigen Jahren verkaufen möchte, profitiert davon, seinen Wert früh zu kennen." },
  { frage: "Welche Daten brauche ich für die Berechnung?", antwort: "Die Basis bilden deine Branche, dein Jahresumsatz und dein Gewinn. Dazu kommen ein paar Fragen zu Faktoren wie Inhaberabhängigkeit oder wiederkehrenden Umsätzen, die den Wert mitbestimmen. Das sind alles Zahlen, die du als Unternehmer im Kopf oder griffbereit hast – aufwändige Unterlagen brauchst du nicht." },
  { frage: "Wie lange dauert es?", antwort: "In der Regel nicht länger als 3 Minuten. Du klickst dich durch ein paar Schritte und erhältst am Ende direkt dein Ergebnis." },
];

const TRUST = ["100 % kostenlos & unverbindlich", "In 3 Minuten erledigt", "Entwickelt auf Basis Hunderter Transaktionen im Mittelstand"];

/* ------------------------------------------------------------------ */
/*  FAQ-Item                                                           */
/* ------------------------------------------------------------------ */
function FaqItem({ frage, antwort, offen, onToggle }: { frage: string; antwort: string; offen: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-200 ${offen ? "border-[#15779b]/40 bg-white shadow-lg shadow-[#15779b]/5" : "border-slate-200 bg-white/90 hover:border-slate-300"}`}>
      <button type="button" onClick={onToggle} aria-expanded={offen} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7">
        <span className="text-base font-semibold text-slate-900 sm:text-lg">{frage}</span>
        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${offen ? "rotate-180 bg-[#15779b] text-white" : "bg-slate-100 text-slate-500"}`}>
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
/*  Landingpage                                                        */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  const [offeneFaq, setOffeneFaq] = useState<number | null>(null);
  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const zumRechner = () => scrollToId("rechner");

  return (
    <div className="font-sans bg-white">
      <SiteHeader />

      {/* ============================================================ */}
      {/*  SEKTION 1 – HERO                                            */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4f7f8]">
        <div aria-hidden className="pointer-events-none absolute right-[-8%] top-[-12%] h-[420px] w-[420px] rounded-full bg-[#15779b]/[0.06] blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute left-[-6%] top-1/3 h-[360px] w-[360px] rounded-full bg-[#15779b]/[0.04] blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-4 pt-12 text-center sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#15779b]">
            Der KMU-Firmenwertrechner – von Mittelständlern für Mittelständler entwickelt
          </p>
          <h1 className="mx-auto mt-4 max-w-5xl font-serif text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Was würde ein Käufer heute für deine Firma{" "}
            <span className="text-[#15779b]">wirklich zahlen?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Gib ein paar Eckdaten zu deinem Unternehmen an und erhalte sofort eine erste Einschätzung
            deines Firmenwerts – basierend auf Hunderten Unternehmensverkäufen im Mittelstand.
          </p>
        </div>

        {/* Berater + Rechner */}
        <div className="relative mx-auto mt-10 max-w-7xl px-4 pb-14 sm:pb-16">
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)_minmax(0,1fr)]">
            {/* Michael links */}
            <div className="relative hidden items-end justify-center lg:flex">
              <figure className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                <Image src="/images/Michael-Otter.png" alt="Michael Polit, Berater bei Otter Consult" width={1112} height={1667} sizes="320px" className="h-auto w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 pb-5 pt-14">
                  <p className="text-base font-bold text-white">Michael Polit</p>
                  <p className="text-xs text-[#9ccbdc]">Otter Consult</p>
                </figcaption>
              </figure>
            </div>

            {/* Wizard */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <RechnerWizard />
            </div>

            {/* Fabian rechts */}
            <div className="relative hidden items-end justify-center lg:flex">
              <figure className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                <Image src="/images/Fabian-Otter.png" alt="Fabian Zamzau, Berater bei Otter Consult" width={1707} height={2560} sizes="320px" className="h-auto w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 pb-5 pt-14">
                  <p className="text-base font-bold text-white">Fabian Zamzau</p>
                  <p className="text-xs text-[#9ccbdc]">Otter Consult</p>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Trust-Zeile – zentriert, horizontale Reihe, gleichmäßige Abstände */}
          <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-10">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-sm text-slate-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#15779b]/10 text-[#15779b]">
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
      <section id="warum" className="scroll-mt-24 bg-[#f6f3ec] py-20 sm:py-28">

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              4 Gründe, warum Mittelständler den eigenentwickelten{" "}
              <span className="whitespace-nowrap text-[#15779b]">KMU-Firmenwertrechner</span>{" "}
              von der Otter Consult nutzen sollten:
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {VORTEILE.map((v) => (
              <div key={v.titel} className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(13,33,55,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#15779b]/30 hover:shadow-[0_22px_45px_-18px_rgba(13,33,55,0.22)]">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15779b] text-white shadow-[0_8px_20px_-6px_rgba(21,119,155,0.45)] transition-transform duration-300 group-hover:scale-105">
                    {v.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">{v.titel}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-6xl">
            <div className="relative rounded-3xl bg-white px-6 py-10 text-center shadow-[0_18px_50px_-24px_rgba(13,33,55,0.20)] ring-1 ring-stone-200/70 sm:px-8 sm:py-12">
              <div aria-hidden className="mx-auto mb-6 h-px w-16 bg-[#15779b]/50" />
              <div className="space-y-4 leading-relaxed text-slate-700">
                <p className="text-base font-medium text-slate-800">
                  Die meisten Unternehmer kennen den Wert ihrer Firma nicht, obwohl genau dieser Wert oft den größten Teil ihres Vermögens ausmacht.
                </p>
                <p className="text-base text-slate-600">
                  Genau deshalb wurde der KMU-Firmenwertrechner von der Otter Consult entwickelt. Basierend auf einer eigenen Datenbank sowie den Erfahrungen aus Hunderten Unternehmensverkäufen im Mittelstand liefert er dir in 3 Minuten eine fundierte erste Orientierung über den möglichen Wert deines Unternehmens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 3 – SO FUNKTIONIERT'S (3 Schritte)                  */}
      {/* ============================================================ */}
      <section id="ablauf" className="relative scroll-mt-24 overflow-hidden bg-[#f4f7f8] py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute right-[-6%] top-12 h-[360px] w-[360px] rounded-full bg-[#15779b]/[0.05] blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-6xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#15779b]">So funktioniert&apos;s</span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              In nur 3 Schritten zu deinem individuellen Firmenwert mit DEM KMU-Firmenwertrechner für den Mittelstand
            </h2>
            <p className="mx-auto mt-5 max-w-6xl text-base leading-relaxed text-slate-600">
              Der KMU-Firmenwertrechner von der Otter Consult basiert auf den Erfahrungen aus Hunderten
              Unternehmensverkäufen im Mittelstand sowie auf einer umfangreichen Datenbank realer
              Transaktionen. Dadurch orientiert sich die Bewertung nicht an pauschalen Standardwerten oder
              theoretischen Modellrechnungen, sondern an Erkenntnissen aus echten Unternehmensverkäufen, die
              tatsächlich am Markt stattgefunden haben.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl space-y-6">
            {SCHRITTE_HOW.map((s, i) => (
              <div key={s.titel} className="flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(15,33,55,0.12)] sm:flex-row sm:items-center sm:gap-8 sm:p-10">
                <div className="flex flex-shrink-0 items-baseline gap-3 sm:w-32 sm:flex-col sm:items-start sm:gap-1">
                  <span className="font-serif text-5xl font-bold leading-none text-[#15779b]/25">0{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#15779b]">Schritt {i + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{s.titel}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-5xl text-center leading-relaxed text-slate-600">
            In weniger als 5 Minuten erhältst du eine fundierte erste Orientierung darüber, was dein
            Unternehmen heute wert sein könnte – kostenlos, unverbindlich und ohne aufwändige Unterlagen.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton onClick={zumRechner} variant="primary" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEKTION 4 – FAQ (mit Bild-Wasserzeichen)                    */}
      {/* ============================================================ */}
      <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-slate-100 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image src="/images/Fabian-Otter-Frau.png" alt="" fill sizes="100vw" className="scale-150 object-cover object-center opacity-[0.55] blur-[2px] contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-transparent to-slate-100" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Bevor du loslegst, das Wichtigste in Kürze
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FaqItem key={f.frage} frage={f.frage} antwort={f.antwort} offen={offeneFaq === i} onToggle={() => setOffeneFaq(offeneFaq === i ? null : i)} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <CtaButton onClick={zumRechner} variant="primary" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
