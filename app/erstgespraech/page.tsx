"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormFeld } from "@/components/ui/FormFeld";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import FunnelShell from "@/components/funnel/FunnelShell";

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

export default function ErstgespraechPage() {
  const router = useRouter();
  const { aktualisiereKontakt } = useFormularStore();

  const [schritt, setSchritt] = useState<1 | 2>(1);
  const [fehler, setFehler] = useState<Record<string, string>>({});
  const clear = (k: string) => setFehler((p) => ({ ...p, [k]: "" }));

  const [funnelAntworten, setFunnelAntworten] = useState<Record<string, string>>({});
  const [anmerkung, setAnmerkung] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [mobil, setMobil] = useState("");

  // Kontaktdaten aus dem Rechner (Schritt 5) vorbefüllen – nichts geht verloren.
  useEffect(() => {
    const k = useFormularStore.getState().daten.kontakt;
    setVorname(k.vorname);
    setNachname(k.nachname);
    setEmail(k.email);
    setMobil(k.mobil);
  }, []);

  const wechsleSchritt = (s: 1 | 2) => {
    setFehler({});
    setSchritt(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitFunnel1 = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    FUNNEL_FRAGEN.forEach((f) => {
      if (!funnelAntworten[f.key]) neu[f.key] = "Bitte wähle eine Option aus.";
    });
    if (Object.keys(neu).length) return setFehler(neu);
    wechsleSchritt(2);
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
    router.push("/danke");
  };

  return (
    <FunnelShell>
      {/* Fortschritt im Beratungs-Funnel */}
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-12">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#15779b]">
            Kostenloses Beratungsgespräch
          </span>
          <span className="text-xs font-semibold text-slate-500 max-sm:whitespace-nowrap">
            Schritt {schritt} von 2
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#15779b] to-[#11607d] transition-all duration-500"
            style={{ width: `${(schritt / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-12 sm:py-10">
        {/* ---------- Schritt 1 von 2 ---------- */}
        {schritt === 1 && (
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

            <NavButtons onZurueck={() => router.push("/ergebnis")} weiterText="Weiter zu Schritt 2" />
          </form>
        )}

        {/* ---------- Schritt 2 von 2 ---------- */}
        {schritt === 2 && (
          <form onSubmit={submitFunnel2} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormFeld label="Vorname" pflicht placeholder="Max" value={vorname} onChange={(e) => { setVorname(e.target.value); clear("vorname"); }} fehler={fehler.vorname} />
              <FormFeld label="Nachname" pflicht placeholder="Mustermann" value={nachname} onChange={(e) => { setNachname(e.target.value); clear("nachname"); }} fehler={fehler.nachname} />
            </div>
            <FormFeld label="E-Mail-Adresse" pflicht type="email" placeholder="max@musterfirma.de"
              value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} fehler={fehler.email} />
            <FormFeld label="Telefonnummer" pflicht type="tel" placeholder="+49 151 12345678"
              value={mobil} onChange={(e) => { setMobil(e.target.value); clear("mobil"); }} fehler={fehler.mobil} />
            <NavButtons onZurueck={() => wechsleSchritt(1)} weiterText="Absenden" />
          </form>
        )}
      </div>
    </FunnelShell>
  );
}
