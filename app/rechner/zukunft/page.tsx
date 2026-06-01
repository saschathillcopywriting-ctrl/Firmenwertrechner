"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import {
  WIEDERKEHREND_KACHELN,
  MARKTPOSITION_KACHELN,
  DOKUMENTATION_KACHELN,
} from "@/lib/berechnung";

export default function ZukunftSeite() {
  const { daten, aktualisiereSchritt4, setzeSchritt } = useFormularStore();
  const router = useRouter();

  const [wiederkehrend, setWiederkehrend] = useState(daten.schritt4.wiederkehrendeUmsaetze);
  const [marktposition, setMarktposition] = useState(daten.schritt4.marktposition);
  const [dokumentation, setDokumentation] = useState(daten.schritt4.dokumentation);
  const [fehler, setFehler] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!wiederkehrend) neu.wiederkehrend = "Bitte wähle eine Option aus.";
    if (!marktposition) neu.marktposition = "Bitte wähle eine Option aus.";
    if (!dokumentation) neu.dokumentation = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) {
      setFehler(neu);
      return;
    }
    aktualisiereSchritt4({
      wiederkehrendeUmsaetze: wiederkehrend,
      marktposition,
      dokumentation,
    });
    setzeSchritt("kontakt");
    router.push("/rechner/kontakt");
  };

  const zurueck = () => {
    setzeSchritt("aufstellung");
    router.push("/rechner/aufstellung");
  };

  const clear = (key: string) => setFehler((p) => ({ ...p, [key]: "" }));

  return (
    <RechnerLayout titel="" beschreibung="Schritt 4 von 5">
      <form onSubmit={handleSubmit} className="space-y-7">
        <AuswahlFeld
          label="Anteil wiederkehrender Umsätze"
          pflicht
          optionen={WIEDERKEHREND_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={wiederkehrend}
          onChange={(e) => { setWiederkehrend(e.target.value); clear("wiederkehrend"); }}
          fehler={fehler.wiederkehrend}
        />

        <AuswahlFeld
          label="Marktposition"
          pflicht
          optionen={MARKTPOSITION_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={marktposition}
          onChange={(e) => { setMarktposition(e.target.value); clear("marktposition"); }}
          fehler={fehler.marktposition}
        />

        <AuswahlFeld
          label="Wie sauber sind deine Zahlen dokumentiert?"
          pflicht
          optionen={DOKUMENTATION_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={dokumentation}
          onChange={(e) => { setDokumentation(e.target.value); clear("dokumentation"); }}
          fehler={fehler.dokumentation}
        />

        <NavButtons onZurueck={zurueck} />
      </form>
    </RechnerLayout>
  );
}
