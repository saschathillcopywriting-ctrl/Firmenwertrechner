"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@/lib/berechnung";

type Ansicht = 1 | 2 | 3 | 4 | 5;

/* --- Zahlen-Helfer: Anzeige formatiert, Speicherung als reine Ziffern --- */
const nurZiffern = (s: string) => s.replace(/[^\d]/g, "");
const formatZahl = (roh: string) => {
  const z = nurZiffern(roh);
  return z ? new Intl.NumberFormat("de-DE").format(Number(z)) : "";
};

const opt = (arr: { wert: string; label: string }[]) =>
  arr.map((o) => ({ wert: o.wert, label: o.label }));


function StepTitel({ titel, untertitel }: { titel: string; untertitel?: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{titel}</h3>
      {untertitel && <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{untertitel}</p>}
    </div>
  );
}

export default function RechnerWizard() {
  const router = useRouter();
  const {
    daten,
    aktualisiereSchritt1,
    aktualisiereSchritt2,
    aktualisiereSchritt3,
    aktualisiereSchritt4,
    aktualisiereKontakt,
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
    router.push("/ergebnis");
  };

  return (
    <div id="rechner" className="scroll-mt-24">
      <div className="overflow-hidden rounded-3xl bg-white text-left shadow-2xl shadow-slate-950/40 ring-1 ring-slate-900/5">
        {/* Fortschritt */}
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#15779b]">
              Der KMU-Firmenwertrechner
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Schritt {ansicht} von 5
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#15779b] to-[#11607d] transition-all duration-500"
              style={{ width: `${(ansicht / 5) * 100}%` }}
            />
          </div>
        </div>

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
                label="Ungefährer Jahresumsatz"
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
                label="Ungefährer Gewinn vor Steuern"
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
                value={mobil} onChange={(e) => { setMobil(e.target.value); clear("mobil"); }} fehler={fehler.mobil}
                hilfetext="WICHTIG: Dein genaueres Ergebnis erhältst du per WhatsApp." />
              <NavButtons onZurueck={() => gehZu(4)} weiterText="Jetzt Firmenwert erhalten" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
