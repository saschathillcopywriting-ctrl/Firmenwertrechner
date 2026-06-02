import type { FormularDaten } from "@/types";

export interface Branche {
  wert: string;
  label: string;
  multiplikator: number;
}

export const BRANCHEN: Branche[] = [
  // Bestehende Branchen – Multiplikatoren unverändert
  { wert: "bau_handwerk", label: "Bau & Handwerk", multiplikator: 4.0 },
  { wert: "beratung_dienstleistung", label: "Beratung & Dienstleistung", multiplikator: 4.5 },
  { wert: "handel_ecommerce", label: "Handel & E-Commerce", multiplikator: 4.5 },
  { wert: "gesundheit_pflege", label: "Gesundheit & Pflege", multiplikator: 5.5 },
  { wert: "it_software_tech", label: "IT, Software & Tech", multiplikator: 7.0 },
  { wert: "maschinen_anlagenbau", label: "Maschinen- & Anlagenbau", multiplikator: 5.5 },
  { wert: "produktion_industrie", label: "Produktion & Industrie", multiplikator: 5.0 },
  { wert: "transport_logistik", label: "Transport & Logistik", multiplikator: 4.5 },
  // Ergänzte Branchen (sinnvolle Marktmultiplikatoren)
  { wert: "bildung_coaching", label: "Bildung, Training & Coaching", multiplikator: 4.0 },
  { wert: "chemie_kunststoff", label: "Chemie & Kunststoffe", multiplikator: 5.5 },
  { wert: "elektrotechnik", label: "Elektrotechnik & Elektroinstallation", multiplikator: 5.0 },
  { wert: "energie_umwelt", label: "Energie & Umwelttechnik", multiplikator: 6.0 },
  { wert: "finanzdienstleistung", label: "Finanz- & Versicherungsdienstleistung", multiplikator: 5.5 },
  { wert: "gastronomie_hotellerie", label: "Gastronomie & Hotellerie", multiplikator: 3.5 },
  { wert: "immobilien", label: "Immobilien & Hausverwaltung", multiplikator: 5.0 },
  { wert: "kfz", label: "KFZ-Handel & Werkstätten", multiplikator: 3.5 },
  { wert: "landwirtschaft", label: "Land- & Forstwirtschaft", multiplikator: 4.0 },
  { wert: "lebensmittel", label: "Lebensmittel & Getränke", multiplikator: 4.5 },
  { wert: "marketing_werbung", label: "Marketing, Werbung & Kreativwirtschaft", multiplikator: 5.0 },
  { wert: "medizintechnik", label: "Medizin- & Labortechnik", multiplikator: 6.5 },
  { wert: "personaldienstleistung", label: "Personaldienstleistung & HR", multiplikator: 4.0 },
  { wert: "pharma_biotech", label: "Pharma & Biotechnologie", multiplikator: 7.5 },
  { wert: "reinigung_facility", label: "Reinigung & Facility Management", multiplikator: 4.0 },
  { wert: "telekommunikation", label: "Telekommunikation & Medien", multiplikator: 6.0 },
  { wert: "textil_mode", label: "Textil, Mode & Möbel", multiplikator: 4.0 },
  { wert: "tourismus", label: "Tourismus, Reise & Freizeit", multiplikator: 4.0 },
  { wert: "sonstige", label: "Sonstige", multiplikator: 4.5 },
];

export const RECHTSFORMEN = [
  { wert: "einzelunternehmen", label: "Einzelunternehmen" },
  { wert: "gbr", label: "GbR" },
  { wert: "ug", label: "UG" },
  { wert: "gmbh", label: "GmbH" },
  { wert: "gmbh_co_kg", label: "GmbH & Co. KG" },
  { wert: "kg", label: "KG" },
  { wert: "ohg", label: "OHG" },
  { wert: "ag", label: "AG" },
  { wert: "sonstige", label: "Sonstige" },
];

export interface KachelOpt {
  wert: string;
  label: string;
  beschreibung?: string;
  delta: number;
}

export const MITARBEITER_KACHELN: KachelOpt[] = [
  { wert: "keine", label: "Keine Mitarbeiter", delta: -0.5 },
  { wert: "1_5", label: "1 bis 5", delta: -0.25 },
  { wert: "6_10", label: "6 bis 10", delta: -0.25 },
  { wert: "11_20", label: "11 bis 20", delta: 0 },
  { wert: "21_50", label: "21 bis 50", delta: 0 },
  { wert: "51_250", label: "51 bis 250", delta: 0.25 },
  { wert: "ueber_250", label: "Über 250", delta: 0.5 },
];

export const ENTWICKLUNG_KACHELN: KachelOpt[] = [
  { wert: "stark_gestiegen", label: "Stark gestiegen", delta: 0.75 },
  { wert: "leicht_gestiegen", label: "Leicht gestiegen", delta: 0.25 },
  { wert: "gleich_geblieben", label: "Gleich geblieben", delta: 0 },
  { wert: "leicht_gesunken", label: "Leicht gesunken", delta: -0.25 },
  { wert: "stark_gesunken", label: "Stark gesunken", delta: -0.75 },
];

export const INHABER_KACHELN: KachelOpt[] = [
  { wert: "komplett_ohne", label: "Läuft komplett ohne mich", delta: 0.75 },
  { wert: "groesstenteils_ohne", label: "Größtenteils ohne mich", delta: 0.25 },
  { wert: "wenig_ohne", label: "Wenig geht ohne mich", delta: -0.5 },
  { wert: "nichts_ohne", label: "Nichts geht ohne mich", delta: -1.25 },
];

export const FUEHRUNGSEBENE_KACHELN: KachelOpt[] = [
  { wert: "ja_voll", label: "Ja, voll handlungsfähig", delta: 0.5 },
  { wert: "teilweise", label: "Teilweise vorhanden", delta: 0.25 },
  { wert: "nein", label: "Nein, nicht vorhanden", delta: 0 },
];

export const KUNDEN_KACHELN: KachelOpt[] = [
  { wert: "unter_10", label: "Unter 10 %", delta: 0.25 },
  { wert: "10_25", label: "10 bis 25 %", delta: 0 },
  { wert: "25_50", label: "25 bis 50 %", delta: -0.5 },
  { wert: "ueber_50", label: "Über 50 %", delta: -1.0 },
];

export const WIEDERKEHREND_KACHELN: KachelOpt[] = [
  { wert: "sehr_hoch", label: "Sehr hoch (über 50 %)", beschreibung: "Verträge, Abos, Wartung", delta: 0.75 },
  { wert: "mittel", label: "Mittel (20 bis 50 %)", beschreibung: "Verträge, Abos, Wartung", delta: 0.25 },
  { wert: "gering", label: "Gering (unter 20 %)", beschreibung: "Verträge, Abos, Wartung", delta: 0 },
  { wert: "keine", label: "Keine", delta: -0.5 },
];

export const MARKTPOSITION_KACHELN: KachelOpt[] = [
  { wert: "marktfuehrer", label: "Marktführer / sehr stark", delta: 0.75 },
  { wert: "solide", label: "Solide etabliert", delta: 0.25 },
  { wert: "durchschnittlich", label: "Durchschnittlich", delta: 0 },
  { wert: "schwierig", label: "Eher schwierig", delta: -0.75 },
];

export const DOKUMENTATION_KACHELN: KachelOpt[] = [
  { wert: "sehr_sauber", label: "Sehr sauber & aktuell", delta: 0.25 },
  { wert: "groesstenteils", label: "Größtenteils in Ordnung", delta: 0 },
  { wert: "unvollstaendig", label: "Eher unvollständig", delta: -0.5 },
];

export interface Faktor {
  label: string;
  kategorie: string;
  delta: number;
}

export interface Berechnungsergebnis {
  gewinnVorSteuern: number;
  jahresumsatz: number;
  brancheLabel: string;
  branchenMultiplikator: number;
  endMultiplikator: number;
  firmenwert: number;
  unterWert: number;
  oberWert: number;
  faktoren: Faktor[];
}

function findeDelta(
  kacheln: KachelOpt[],
  key: string,
  kategorie: string
): Faktor | null {
  const opt = kacheln.find((k) => k.wert === key);
  if (!opt || opt.delta === 0) return null;
  return { label: opt.label, kategorie, delta: opt.delta };
}

export function berechne(daten: FormularDaten): Berechnungsergebnis | null {
  const gewinn = parseFloat(daten.schritt2.gewinnVorSteuern);
  if (isNaN(gewinn) || gewinn <= 0) return null;

  const branche = BRANCHEN.find((b) => b.wert === daten.schritt1.branche);
  if (!branche) return null;

  const faktoren: Faktor[] = [];

  const pruefe = (kacheln: KachelOpt[], key: string, kat: string) => {
    const f = findeDelta(kacheln, key, kat);
    if (f) faktoren.push(f);
  };

  pruefe(MITARBEITER_KACHELN, daten.schritt1.mitarbeiter, "Mitarbeiteranzahl");
  pruefe(ENTWICKLUNG_KACHELN, daten.schritt2.entwicklung, "Umsatzentwicklung");
  pruefe(INHABER_KACHELN, daten.schritt3.inhaberAbhaengigkeit, "Inhaberabhängigkeit");
  pruefe(FUEHRUNGSEBENE_KACHELN, daten.schritt3.fuehrungsebene, "Führungsebene");
  pruefe(KUNDEN_KACHELN, daten.schritt3.kundenKonzentration, "Kundenkonzentration");
  pruefe(WIEDERKEHREND_KACHELN, daten.schritt4.wiederkehrendeUmsaetze, "Wiederkehrende Umsätze");
  pruefe(MARKTPOSITION_KACHELN, daten.schritt4.marktposition, "Marktposition");
  pruefe(DOKUMENTATION_KACHELN, daten.schritt4.dokumentation, "Dokumentation");

  const summe = faktoren.reduce((s, f) => s + f.delta, 0);
  const rohMultiplikator = branche.multiplikator + summe;
  const endMultiplikator = Math.max(2.5, Math.round(rohMultiplikator * 10) / 10);

  const firmenwert = gewinn * endMultiplikator;
  const jahresumsatz = parseFloat(daten.schritt2.jahresumsatz) || 0;

  return {
    gewinnVorSteuern: gewinn,
    jahresumsatz,
    brancheLabel: branche.label,
    branchenMultiplikator: branche.multiplikator,
    endMultiplikator,
    firmenwert,
    unterWert: Math.round(firmenwert * 0.9),
    oberWert: Math.round(firmenwert * 1.1),
    faktoren,
  };
}

export function formatEuro(wert: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(wert);
}
