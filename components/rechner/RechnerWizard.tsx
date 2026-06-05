"use client";

import { useState } from "react";
import Image from "next/image";
import { FormFeld } from "@/components/ui/FormFeld";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import {
  BRANCHEN,
  RECHTSFORMEN,
  MITARBEITER_KACHELN,
  ENTWICKLUNG_KACHELN,
  INHABER_KACHELN,
  FUEHRUNGSEBENE_KACHELN,
  KUNDEN_KACHELN,
  WIEDERKEHREND_KACHELN,
  MARKTPOSITION_KACHELN,
  DOKUMENTATION_KACHELN,
  berechne,
  formatEuro,
} from "@/lib/berechnung";

type Ansicht = 1 | 2 | 3 | 4 | 5 | "ergebnis" | "funnel1" | "funnel2" | "danke";

const FUNNEL_FRAGEN = [
  {
    key: "verkaufszeitpunkt",
    frage: "Wann planst du aktuell einen möglichen Verkauf oder eine Nachfolge?",
    antworten: [
      "Innerhalb der nächsten 12 Monate",
      "In 1 bis 3 Jahren",
      "In 3 bis 5 Jahren",
      "In mehr als 5 Jahren",
      "Aktuell nicht geplant – ich möchte meinen Firmenwert kennen",
    ],
  },
  {
    key: "hauptgrund",
    frage: "Was ist dein Hauptgrund für die Firmenwertermittlung?",
    antworten: [
      "Unternehmensverkauf vorbereiten",
      "Nachfolge planen",
      "Vermögensübersicht erhalten",
      "Unternehmenswert steigern",
      "Investoren / Partner gewinnen",
      "Sonstiges",
    ],
  },
];

const GESPRAECH_VORTEILE = [
  "Welche Faktoren deinen Firmenwert aktuell erhöhen oder senken",
  "Welche Maßnahmen den Unternehmenswert oft deutlich steigern können",
  "Welche Verkaufspreise aktuell in deiner Branche realistisch sind",
  "Welche Optionen du für Nachfolge, Verkauf oder strategische Vorbereitung hast",
  "Und du bekommst Antworten auf all deine Fragen.",
];

const DANKE_VORTEILE = [
  "Ein Blick hinter deinen geschätzten Firmenwert",
  "Eine Einordnung deines Unternehmenswertes anhand deiner individuellen Situation",
  "Hinweise auf Werttreiber und mögliche Risiken in deinem Unternehmen",
  "Erste Empfehlungen, wie sich der Firmenwert häufig steigern lässt",
  "Antworten auf deine Fragen zu Nachfolge, Verkauf oder Unternehmensentwicklung sowie Antworten auf alle deine Fragen.",
];

/* --- Zahlen-Helfer: Anzeige formatiert, Speicherung als reine Ziffern --- */
const nurZiffern = (s: string) => s.replace(/[^\d]/g, "");
const formatZahl = (roh: string) => {
  const z = nurZiffern(roh);
  return z ? new Intl.NumberFormat("de-DE").format(Number(z)) : "";
};

const opt = (arr: { wert: string; label: string }[]) =>
  arr.map((o) => ({ wert: o.wert, label: o.label }));

const SCHRITT_LABELS = ["Unternehmen", "Zahlen", "Aufstellung", "Zukunft", "Kontakt"];

function StepTitel({ titel, untertitel }: { titel: string; untertitel?: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{titel}</h3>
      {untertitel && <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{untertitel}</p>}
    </div>
  );
}

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

export default function RechnerWizard() {
  const {
    daten,
    aktualisiereSchritt1,
    aktualisiereSchritt2,
    aktualisiereSchritt3,
    aktualisiereSchritt4,
    aktualisiereKontakt,
    zuruecksetzen,
  } = useFormularStore();

  const [ansicht, setAnsicht] = useState<Ansicht>(1);
  const [fehler, setFehler] = useState<Record<string, string>>({});
  const clear = (k: string) => setFehler((p) => ({ ...p, [k]: "" }));

  // Schritt 1
  const [branche, setBranche] = useState(daten.schritt1.branche);
  const [rechtsform, setRechtsform] = useState(daten.schritt1.rechtsform);
  const [mitarbeiter, setMitarbeiter] = useState(daten.schritt1.mitarbeiter);
  // Schritt 2
  const [umsatzAnzeige, setUmsatzAnzeige] = useState(formatZahl(daten.schritt2.jahresumsatz));
  const [gewinnAnzeige, setGewinnAnzeige] = useState(formatZahl(daten.schritt2.gewinnVorSteuern));
  const [entwicklung, setEntwicklung] = useState(daten.schritt2.entwicklung);
  // Schritt 3
  const [inhaber, setInhaber] = useState(daten.schritt3.inhaberAbhaengigkeit);
  const [fuehrung, setFuehrung] = useState(daten.schritt3.fuehrungsebene);
  const [kunden, setKunden] = useState(daten.schritt3.kundenKonzentration);
  // Schritt 4
  const [wiederkehrend, setWiederkehrend] = useState(daten.schritt4.wiederkehrendeUmsaetze);
  const [marktposition, setMarktposition] = useState(daten.schritt4.marktposition);
  const [dokumentation, setDokumentation] = useState(daten.schritt4.dokumentation);
  // Schritt 5
  const [vorname, setVorname] = useState(daten.kontakt.vorname);
  const [nachname, setNachname] = useState(daten.kontakt.nachname);
  const [email, setEmail] = useState(daten.kontakt.email);
  const [mobil, setMobil] = useState(daten.kontakt.mobil);
  // Beratungs-Funnel nach der Ergebnisseite
  const [funnelAntworten, setFunnelAntworten] = useState<Record<string, string>>({});
  const [anmerkung, setAnmerkung] = useState("");

  const ergebnis = berechne(daten);

  const gehZu = (a: Ansicht) => {
    setFehler({});
    setAnsicht(a);
    if (typeof document !== "undefined") {
      document.getElementById("rechner")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const submit1 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!branche) neu.branche = "Bitte wähle eine Branche aus.";
    if (!rechtsform) neu.rechtsform = "Bitte wähle eine Rechtsform aus.";
    if (!mitarbeiter) neu.mitarbeiter = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereSchritt1({ branche, rechtsform, mitarbeiter });
    gehZu(2);
  };

  const submit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    const umsatzClean = nurZiffern(umsatzAnzeige);
    const gewinnClean = nurZiffern(gewinnAnzeige);
    if (!umsatzClean || Number(umsatzClean) <= 0)
      neu.umsatz = "Bitte gib einen gültigen Jahresumsatz ein.";
    if (!gewinnClean || Number(gewinnClean) <= 0)
      neu.gewinn = "Bitte gib einen gültigen Gewinn vor Steuern ein (größer als 0).";
    if (!entwicklung) neu.entwicklung = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereSchritt2({ jahresumsatz: umsatzClean, gewinnVorSteuern: gewinnClean, entwicklung });
    gehZu(3);
  };

  const submit3 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!inhaber) neu.inhaber = "Bitte wähle eine Option aus.";
    if (!fuehrung) neu.fuehrung = "Bitte wähle eine Option aus.";
    if (!kunden) neu.kunden = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereSchritt3({ inhaberAbhaengigkeit: inhaber, fuehrungsebene: fuehrung, kundenKonzentration: kunden });
    gehZu(4);
  };

  const submit4 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!wiederkehrend) neu.wiederkehrend = "Bitte wähle eine Option aus.";
    if (!marktposition) neu.marktposition = "Bitte wähle eine Option aus.";
    if (!dokumentation) neu.dokumentation = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereSchritt4({ wiederkehrendeUmsaetze: wiederkehrend, marktposition, dokumentation });
    gehZu(5);
  };

  const submit5 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!vorname) neu.vorname = "Bitte gib deinen Vornamen ein.";
    if (!nachname) neu.nachname = "Bitte gib deinen Nachnamen ein.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      neu.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (!mobil) neu.mobil = "Bitte gib deine Mobilnummer ein.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereKontakt({ vorname, nachname, email, mobil });
    gehZu("ergebnis");
  };

  const submitFunnel1 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    FUNNEL_FRAGEN.forEach((f) => {
      if (!funnelAntworten[f.key]) neu[f.key] = "Bitte wähle eine Option aus.";
    });
    if (Object.keys(neu).length) return setFehler(neu);
    gehZu("funnel2");
  };

  const submitFunnel2 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!vorname) neu.vorname = "Bitte gib deinen Vornamen ein.";
    if (!nachname) neu.nachname = "Bitte gib deinen Nachnamen ein.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      neu.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (!mobil) neu.mobil = "Bitte gib deine Telefonnummer ein.";
    if (Object.keys(neu).length) return setFehler(neu);
    aktualisiereKontakt({ vorname, nachname, email, mobil });
    gehZu("danke");
  };

  const neuStarten = () => {
    zuruecksetzen();
    setBranche(""); setRechtsform(""); setMitarbeiter("");
    setUmsatzAnzeige(""); setGewinnAnzeige(""); setEntwicklung("");
    setInhaber(""); setFuehrung(""); setKunden("");
    setWiederkehrend(""); setMarktposition(""); setDokumentation("");
    setVorname(""); setNachname(""); setEmail(""); setMobil("");
    setFunnelAntworten({}); setAnmerkung("");
    gehZu(1);
  };

  return (
    <div id="rechner" className="scroll-mt-24">
      <div className="overflow-hidden rounded-3xl bg-white text-left shadow-2xl shadow-slate-950/40 ring-1 ring-slate-900/5">
        {/* Fortschritt nur in den Schritten */}
        {typeof ansicht === "number" && (
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#15779b]">
                Firmenwertrechner
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Schritt {ansicht} von 5 · {SCHRITT_LABELS[ansicht - 1]}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#15779b] to-[#11607d] transition-all duration-500"
                style={{ width: `${(ansicht / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Fortschritt im Beratungs-Funnel */}
        {(ansicht === "funnel1" || ansicht === "funnel2") && (
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#15779b]">
                Kostenloses Beratungsgespräch
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Schritt {ansicht === "funnel1" ? 1 : 2} von 2
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#15779b] to-[#11607d] transition-all duration-500"
                style={{ width: `${((ansicht === "funnel1" ? 1 : 2) / 2) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* ---------- Schritt 1 ---------- */}
          {ansicht === 1 && (
            <form onSubmit={submit1} className="space-y-6">
              <StepTitel titel="Erzähl uns kurz von deinem Unternehmen" />
              <AuswahlFeld label="Branche" pflicht optionen={opt(BRANCHEN)} platzhalter="Bitte wählen"
                value={branche} onChange={(e) => { setBranche(e.target.value); clear("branche"); }} fehler={fehler.branche} />
              <AuswahlFeld label="Rechtsform" pflicht optionen={opt(RECHTSFORMEN)} platzhalter="Bitte wählen"
                value={rechtsform} onChange={(e) => { setRechtsform(e.target.value); clear("rechtsform"); }} fehler={fehler.rechtsform} />
              <AuswahlFeld label="Anzahl Mitarbeiter" pflicht optionen={opt(MITARBEITER_KACHELN)} platzhalter="Bitte wählen"
                value={mitarbeiter} onChange={(e) => { setMitarbeiter(e.target.value); clear("mitarbeiter"); }} fehler={fehler.mitarbeiter} />
              <NavButtons />
            </form>
          )}

          {/* ---------- Schritt 2 ---------- */}
          {ansicht === 2 && (
            <form onSubmit={submit2} className="space-y-6">
              <FormFeld
                label="Ungefährer Jahresumsatz (keine Kommastellen)"
                pflicht
                inputMode="numeric"
                placeholder="z. B. 1.200.000"
                prefix="€"
                value={umsatzAnzeige}
                onChange={(e) => { setUmsatzAnzeige(e.target.value); clear("umsatz"); }}
                onBlur={() => setUmsatzAnzeige(formatZahl(umsatzAnzeige))}
                fehler={fehler.umsatz}
              />
              <FormFeld
                label="Ungefährer Gewinn vor Steuern (keine Kommastellen)"
                pflicht
                inputMode="numeric"
                placeholder="z. B. 400.000"
                prefix="€"
                value={gewinnAnzeige}
                onChange={(e) => { setGewinnAnzeige(e.target.value); clear("gewinn"); }}
                onBlur={() => setGewinnAnzeige(formatZahl(gewinnAnzeige))}
                fehler={fehler.gewinn}
              />
              <AuswahlFeld label="Entwicklung der letzten 3 Jahre" pflicht optionen={opt(ENTWICKLUNG_KACHELN)} platzhalter="Bitte wählen"
                value={entwicklung} onChange={(e) => { setEntwicklung(e.target.value); clear("entwicklung"); }} fehler={fehler.entwicklung} />
              <NavButtons onZurueck={() => gehZu(1)} />
            </form>
          )}

          {/* ---------- Schritt 3 ---------- */}
          {ansicht === 3 && (
            <form onSubmit={submit3} className="space-y-6">
              <AuswahlFeld label="Wie stark hängt das Tagesgeschäft von dir persönlich ab?" pflicht optionen={opt(INHABER_KACHELN)} platzhalter="Bitte wählen"
                value={inhaber} onChange={(e) => { setInhaber(e.target.value); clear("inhaber"); }} fehler={fehler.inhaber} />
              <AuswahlFeld label="Gibt es eine zweite Führungsebene?" pflicht optionen={opt(FUEHRUNGSEBENE_KACHELN)} platzhalter="Bitte wählen"
                value={fuehrung} onChange={(e) => { setFuehrung(e.target.value); clear("fuehrung"); }} fehler={fehler.fuehrung} />
              <AuswahlFeld label="Umsatzanteil deines größten Kunden" pflicht optionen={opt(KUNDEN_KACHELN)} platzhalter="Bitte wählen"
                value={kunden} onChange={(e) => { setKunden(e.target.value); clear("kunden"); }} fehler={fehler.kunden} />
              <NavButtons onZurueck={() => gehZu(2)} />
            </form>
          )}

          {/* ---------- Schritt 4 ---------- */}
          {ansicht === 4 && (
            <form onSubmit={submit4} className="space-y-6">
              <AuswahlFeld label="Anteil wiederkehrender Umsätze" pflicht optionen={opt(WIEDERKEHREND_KACHELN)} platzhalter="Bitte wählen"
                value={wiederkehrend} onChange={(e) => { setWiederkehrend(e.target.value); clear("wiederkehrend"); }} fehler={fehler.wiederkehrend} />
              <AuswahlFeld label="Marktposition" pflicht optionen={opt(MARKTPOSITION_KACHELN)} platzhalter="Bitte wählen"
                value={marktposition} onChange={(e) => { setMarktposition(e.target.value); clear("marktposition"); }} fehler={fehler.marktposition} />
              <AuswahlFeld label="Wie sauber sind deine Zahlen dokumentiert?" pflicht optionen={opt(DOKUMENTATION_KACHELN)} platzhalter="Bitte wählen"
                value={dokumentation} onChange={(e) => { setDokumentation(e.target.value); clear("dokumentation"); }} fehler={fehler.dokumentation} />
              <NavButtons onZurueck={() => gehZu(3)} />
            </form>
          )}

          {/* ---------- Schritt 5 ---------- */}
          {ansicht === 5 && (
            <form onSubmit={submit5} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormFeld label="Vorname" pflicht placeholder="Max" value={vorname} onChange={(e) => { setVorname(e.target.value); clear("vorname"); }} fehler={fehler.vorname} />
                <FormFeld label="Nachname" pflicht placeholder="Mustermann" value={nachname} onChange={(e) => { setNachname(e.target.value); clear("nachname"); }} fehler={fehler.nachname} />
              </div>
              <FormFeld label="E-Mail-Adresse" pflicht type="email" placeholder="max@musterfirma.de"
                value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} fehler={fehler.email} />
              <FormFeld label="Mobilnummer" pflicht type="tel" placeholder="+49 151 12345678"
                value={mobil} onChange={(e) => { setMobil(e.target.value); clear("mobil"); }} fehler={fehler.mobil} />
              <NavButtons onZurueck={() => gehZu(4)} weiterText="Jetzt Firmenwert erhalten" />
            </form>
          )}

          {/* ---------- Ergebnis ---------- */}
          {ansicht === "ergebnis" && ergebnis && (
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
                    onClick={() => gehZu("funnel1")}
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
          )}

          {/* ---------- Funnel Schritt 1 von 2 ---------- */}
          {ansicht === "funnel1" && (
            <form onSubmit={submitFunnel1} className="space-y-7">
              <div>
                <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                  Du hast jetzt deinen ungefähren Firmenwert gesehen. Lass uns jetzt einen Blick hinter die Zahl werfen.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Denn der tatsächliche Verkaufspreis hängt von vielen Faktoren ab, die ein Rechner nicht vollständig berücksichtigen kann.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  In einem kostenfreien und unverbindlichen Gespräch schauen wir gemeinsam auf dein Unternehmen und zeigen dir:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {GESPRAECH_VORTEILE.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#e0eef3] text-[#15779b]">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-7 border-t border-slate-100 pt-7">
                {FUNNEL_FRAGEN.map((f) => (
                  <AuswahlFeld
                    key={f.key}
                    label={f.frage}
                    pflicht
                    optionen={f.antworten.map((a) => ({ wert: a, label: a }))}
                    platzhalter="Bitte wählen"
                    value={funnelAntworten[f.key] ?? ""}
                    onChange={(e) => { setFunnelAntworten((p) => ({ ...p, [f.key]: e.target.value })); clear(f.key); }}
                    fehler={fehler[f.key]}
                  />
                ))}

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Gibt es etwas, das wir vor dem Gespräch wissen sollten?{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    rows={1}
                    value={anmerkung}
                    onChange={(e) => setAnmerkung(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#15779b]"
                  />
                </div>
              </div>

              <NavButtons onZurueck={() => gehZu("ergebnis")} weiterText="Weiter zu Schritt 2" />
            </form>
          )}

          {/* ---------- Funnel Schritt 2 von 2 ---------- */}
          {ansicht === "funnel2" && (
            <form onSubmit={submitFunnel2} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormFeld label="Vorname" pflicht placeholder="Max" value={vorname} onChange={(e) => { setVorname(e.target.value); clear("vorname"); }} fehler={fehler.vorname} />
                <FormFeld label="Nachname" pflicht placeholder="Mustermann" value={nachname} onChange={(e) => { setNachname(e.target.value); clear("nachname"); }} fehler={fehler.nachname} />
              </div>
              <FormFeld label="E-Mail-Adresse" pflicht type="email" placeholder="max@musterfirma.de"
                value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} fehler={fehler.email} />
              <FormFeld label="Telefonnummer" pflicht type="tel" placeholder="+49 151 12345678"
                value={mobil} onChange={(e) => { setMobil(e.target.value); clear("mobil"); }} fehler={fehler.mobil} />
              <NavButtons onZurueck={() => gehZu("funnel1")} weiterText="Absenden" />
            </form>
          )}

          {/* ---------- Danke ---------- */}
          {ansicht === "danke" && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mx-auto mt-5 max-w-xl text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                Deine Anfrage wurde erfolgreich übermittelt.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                Ein Experte aus dem Team der Otter Consult wird sich innerhalb der nächsten 24 bis 48 Stunden persönlich bei dir melden.
              </p>

              {/* Dekorative Bilder: leicht überlappend & versetzt */}
              <div className="relative mx-auto mt-10 h-52 max-w-md sm:h-60">
                <div className="absolute left-1 top-6 w-[60%] -rotate-3 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-1">
                  <Image src="/images/Dankeseite-2.png" alt="" width={2560} height={1707} className="h-auto w-full" />
                </div>
                <div className="absolute right-1 top-0 w-[56%] rotate-3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-1">
                  <Image src="/images/Dankeseite-1.png" alt="" width={1200} height={675} className="h-auto w-full" />
                </div>
              </div>

              {/* Das erwartet dich im Gespräch */}
              <div className="mt-10 rounded-2xl border border-[#cfe3ea] bg-[#eef5f8] p-6 text-left">
                <h4 className="text-base font-bold text-slate-900 sm:text-lg">Das erwartet dich im Gespräch:</h4>
                <ul className="mt-4 space-y-3">
                  {DANKE_VORTEILE.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto mt-8 max-w-lg space-y-3 text-sm leading-relaxed text-slate-600">
                <p>
                  Nach diesem unverbindlichen Gespräch weißt du ganz transparent, was deine Firma heute wert ist und an welchen Stellschrauben du drehen kannst, um den Wert in den nächsten Jahren deutlich zu steigern.
                </p>
                <p>Wir freuen uns auf das Gespräch mit dir.</p>
                <p className="font-semibold text-slate-900">Dein Team von der Otter Consult</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
