"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RechnerLayout from "@/components/layout/RechnerLayout";
import { FormFeld } from "@/components/ui/FormFeld";
import NavButtons from "@/components/ui/NavButtons";
import { useFormularStore } from "@/store/formular-store";

export default function KontaktSeite() {
  const { daten, aktualisiereKontakt, setzeSchritt } = useFormularStore();
  const router = useRouter();

  const [vorname, setVorname] = useState(daten.kontakt.vorname);
  const [nachname, setNachname] = useState(daten.kontakt.nachname);
  const [email, setEmail] = useState(daten.kontakt.email);
  const [mobil, setMobil] = useState(daten.kontakt.mobil);
  const [fehler, setFehler] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const neu: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      neu.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (!mobil) neu.mobil = "Bitte gib deine Mobilnummer ein.";
    if (Object.keys(neu).length) {
      setFehler(neu);
      return;
    }
    aktualisiereKontakt({ vorname, nachname, email, mobil });
    setzeSchritt("ergebnis");
    router.push("/rechner/ergebnis");
  };

  const zurueck = () => {
    setzeSchritt("zukunft");
    router.push("/rechner/zukunft");
  };

  const clear = (key: string) => setFehler((p) => ({ ...p, [key]: "" }));

  return (
    <RechnerLayout titel="" beschreibung="Schritt 5 von 5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormFeld
          label="Vorname"
          placeholder="Max"
          type="text"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
        />

        <FormFeld
          label="Nachname"
          placeholder="Mustermann"
          type="text"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
        />

        <FormFeld
          label="E-Mail-Adresse"
          pflicht
          placeholder="max@musterfirma.de"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clear("email");
          }}
          fehler={fehler.email}
        />

        <FormFeld
          label="Mobilnummer"
          pflicht
          placeholder="+49 151 12345678"
          type="tel"
          value={mobil}
          onChange={(e) => {
            setMobil(e.target.value);
            clear("mobil");
          }}
          fehler={fehler.mobil}
        />

        <NavButtons
          onZurueck={zurueck}
          weiterText="Jetzt Firmenwert erhalten"
        />
      </form>
    </RechnerLayout>
  );
}
