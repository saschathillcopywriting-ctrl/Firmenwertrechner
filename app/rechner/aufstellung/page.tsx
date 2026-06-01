"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { AuswahlFeld } from "@/components/ui/AuswahlFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";
import { INHABER_KACHELN, FUEHRUNGSEBENE_KACHELN, KUNDEN_KACHELN } from "@/lib/berechnung";

export default function AufstellungSeite() {
  const { daten, aktualisiereSchritt3, setzeSchritt } = useFormularStore();
  const router = useRouter();

  const [inhaberAbhaengigkeit, setInhaber] = useState(daten.schritt3.inhaberAbhaengigkeit);
  const [fuehrungsebene, setFuehrung] = useState(daten.schritt3.fuehrungsebene);
  const [kundenKonzentration, setKunden] = useState(daten.schritt3.kundenKonzentration);
  const [fehler, setFehler] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!inhaberAbhaengigkeit) neu.inhaber = "Bitte wähle eine Option aus.";
    if (!fuehrungsebene) neu.fuehrung = "Bitte wähle eine Option aus.";
    if (!kundenKonzentration) neu.kunden = "Bitte wähle eine Option aus.";
    if (Object.keys(neu).length) {
      setFehler(neu);
      return;
    }
    aktualisiereSchritt3({ inhaberAbhaengigkeit, fuehrungsebene, kundenKonzentration });
    setzeSchritt("zukunft");
    router.push("/rechner/zukunft");
  };

  const zurueck = () => {
    setzeSchritt("umsatz");
    router.push("/rechner/umsatz");
  };

  const clear = (key: string) => setFehler((p) => ({ ...p, [key]: "" }));

  return (
    <RechnerLayout titel="" beschreibung="Schritt 3 von 5">
      <form onSubmit={handleSubmit} className="space-y-7">
        <AuswahlFeld
          label="Wie stark hängt das Tagesgeschäft von dir persönlich ab?"
          pflicht
          optionen={INHABER_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={inhaberAbhaengigkeit}
          onChange={(e) => { setInhaber(e.target.value); clear("inhaber"); }}
          fehler={fehler.inhaber}
        />

        <AuswahlFeld
          label="Gibt es eine zweite Führungsebene?"
          pflicht
          optionen={FUEHRUNGSEBENE_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={fuehrungsebene}
          onChange={(e) => { setFuehrung(e.target.value); clear("fuehrung"); }}
          fehler={fehler.fuehrung}
        />

        <AuswahlFeld
          label="Umsatzanteil deines größten Kunden"
          pflicht
          optionen={KUNDEN_KACHELN.map((o) => ({ wert: o.wert, label: o.label }))}
          platzhalter="Bitte wählen"
          value={kundenKonzentration}
          onChange={(e) => { setKunden(e.target.value); clear("kunden"); }}
          fehler={fehler.kunden}
        />

        <NavButtons onZurueck={zurueck} />
      </form>
    </RechnerLayout>
  );
}
