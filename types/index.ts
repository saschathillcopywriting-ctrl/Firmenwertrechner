export interface SchrittEinsDaten {
  branche: string;
  rechtsform: string;
  mitarbeiter: string;
}

export interface SchrittZweiDaten {
  jahresumsatz: string;
  gewinnVorSteuern: string;
  entwicklung: string;
}

export interface SchrittDreiDaten {
  inhaberAbhaengigkeit: string;
  fuehrungsebene: string;
  kundenKonzentration: string;
}

export interface SchrittVierDaten {
  wiederkehrendeUmsaetze: string;
  marktposition: string;
  dokumentation: string;
}

export interface KontaktDaten {
  vorname: string;
  nachname: string;
  email: string;
  mobil: string;
}

export interface FormularDaten {
  schritt1: SchrittEinsDaten;
  schritt2: SchrittZweiDaten;
  schritt3: SchrittDreiDaten;
  schritt4: SchrittVierDaten;
  kontakt: KontaktDaten;
}

export type SchrittId =
  | "unternehmen"
  | "umsatz"
  | "aufstellung"
  | "zukunft"
  | "kontakt"
  | "ergebnis";

export const SCHRITTE = [
  { id: "unternehmen" as SchrittId, label: "Unternehmen", nummer: 1 },
  { id: "umsatz" as SchrittId, label: "Zahlen", nummer: 2 },
  { id: "aufstellung" as SchrittId, label: "Aufstellung", nummer: 3 },
  { id: "zukunft" as SchrittId, label: "Zukunft", nummer: 4 },
  { id: "kontakt" as SchrittId, label: "Kontakt", nummer: 5 },
];
