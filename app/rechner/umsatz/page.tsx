"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { FormFeld } from "@/components/ui/FormFeld";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import { ENTWICKLUNG_KACHELN } from "@/lib/berechnung";

export default function UmsatzSeite() {
  const { daten, aktualisiereSchritt2, setzeSchritt } = useFormularStore();
  const router = useRouter();

  const [jahresumsatz, setJahresumsatz] = useState(daten.schritt2.jahresumsatz);
  const [gewinn, setGewinn] = useState(daten.schritt2.gewinnVorSteuern);
  const [entwicklung, setEntwicklung] = useState(daten.schritt2.entwicklung);
  const [fehler, setFehler] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    const gewinnNum = parseFloat(gewinn);
    if (!gewinn || isNaN(gewinnNum) || gewinnNum <= 0)
      neu.gewinn = "Bitte gib einen gültigen Gewinn vor Steuern ein (größer als 0).";
    if (!entwicklung) neu.entwicklung = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) {
      setFehler(neu);
      return;
    }
    aktualisiereSchritt2({ jahresumsatz, gewinnVorSteuern: gewinn, entwicklung });
    setzeSchritt("aufstellung");
    router.push("/rechner/aufstellung");
  };

  const zurueck = () => {
    setzeSchritt("unternehmen");
    router.push("/rechner/unternehmen");
  };

  return (
    <RechnerLayout titel="" beschreibung="Schritt 2 von 5">
      <form onSubmit={handleSubmit} className="space-y-7">
        <FormFeld
          label="Jahresumsatz (letztes Geschäftsjahr)"
          placeholder="z. B. 1.200.000"
          type="number"
          min="0"
          step="1"
          prefix="€"
          value={jahresumsatz}
          onChange={(e) => setJahresumsatz(e.target.value)}
          fehler={fehler.jahresumsatz}
        />

        <FormFeld
          label="Gewinn vor Steuern"
          pflicht
          placeholder="z. B. 400.000"
          type="number"
          min="1"
          step="1"
          prefix="€"
          value={gewinn}
          onChange={(e) => {
            setGewinn(e.target.value);
            setFehler((p) => ({ ...p, gewinn: "" }));
          }}
          fehler={fehler.gewinn}
          hilfetext="Dein Betriebsergebnis vor Zinsen und Steuern – eine grobe Angabe genügt. Dieser Wert ist die Grundlage der Berechnung."
        />

        <AuswahlFeld
          label="Entwicklung der letzten 3 Jahre"
          pflicht
          optionen={ENTWICKLUNG_KACHELN.map((e) => ({ wert: e.wert, label: e.label }))}
          platzhalter="Bitte wählen"
          value={entwicklung}
          onChange={(e) => {
            setEntwicklung(e.target.value);
            setFehler((p) => ({ ...p, entwicklung: "" }));
          }}
          fehler={fehler.entwicklung}
        />

        <NavButtons onZurueck={zurueck} />
      </form>
    </RechnerLayout>
  );
}
