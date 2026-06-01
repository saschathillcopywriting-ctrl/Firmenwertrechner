"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import { BRANCHEN, RECHTSFORMEN, MITARBEITER_KACHELN } from "@/lib/berechnung";

export default function UnternehmenSeite() {
  const { daten, aktualisiereSchritt1, setzeSchritt } = useFormularStore();
  const router = useRouter();

  const [branche, setBranche] = useState(daten.schritt1.branche);
  const [rechtsform, setRechtsform] = useState(daten.schritt1.rechtsform);
  const [mitarbeiter, setMitarbeiter] = useState(daten.schritt1.mitarbeiter);
  const [fehler, setFehler] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!branche) neu.branche = "Bitte wähle eine Branche aus.";
    if (!rechtsform) neu.rechtsform = "Bitte wähle eine Rechtsform aus.";
    if (!mitarbeiter) neu.mitarbeiter = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) {
      setFehler(neu);
      return;
    }
    aktualisiereSchritt1({ branche, rechtsform, mitarbeiter });
    setzeSchritt("umsatz");
    router.push("/rechner/umsatz");
  };

  const clearFehler = (key: string) =>
    setFehler((prev) => ({ ...prev, [key]: "" }));

  return (
    <RechnerLayout
      titel="Erzähl uns kurz von deinem Unternehmen"
      beschreibung="Schritt 1 von 5"
    >
      <form onSubmit={handleSubmit} className="space-y-7">
        <AuswahlFeld
          label="Branche"
          pflicht
          optionen={BRANCHEN.map((b) => ({ wert: b.wert, label: b.label }))}
          platzhalter="Bitte wählen"
          value={branche}
          onChange={(e) => {
            setBranche(e.target.value);
            clearFehler("branche");
          }}
          fehler={fehler.branche}
        />

        <AuswahlFeld
          label="Rechtsform"
          pflicht
          optionen={RECHTSFORMEN.map((r) => ({ wert: r.wert, label: r.label }))}
          platzhalter="Bitte wählen"
          value={rechtsform}
          onChange={(e) => {
            setRechtsform(e.target.value);
            clearFehler("rechtsform");
          }}
          fehler={fehler.rechtsform}
        />

        <AuswahlFeld
          label="Anzahl Mitarbeiter"
          pflicht
          optionen={MITARBEITER_KACHELN.map((m) => ({ wert: m.wert, label: m.label }))}
          platzhalter="Bitte wählen"
          value={mitarbeiter}
          onChange={(e) => {
            setMitarbeiter(e.target.value);
            clearFehler("mitarbeiter");
          }}
          fehler={fehler.mitarbeiter}
        />

        <NavButtons />
      </form>
    </RechnerLayout>
  );
}
