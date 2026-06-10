import type { FormularDaten } from "@/types";

export interface Branche {
  wert: string;
  label: string;
  multiplikator: number;
}

export const BRANCHEN: Branche[] = [
  { wert: "maschinen_anlagenbau", label: "Maschinen- und Anlagenbau", multiplikator: 4.45 },
  { wert: "fahrzeugbau_automotive", label: "Fahrzeugbau & Automotive", multiplikator: 3.6 },
  { wert: "elektrotechnik_elektronik", label: "Elektrotechnik & Elektronik", multiplikator: 5.1 },
  { wert: "metallverarbeitung_fertigung", label: "Metallverarbeitung & Fertigungstechnik", multiplikator: 3.8 },
  { wert: "chemie_kunststoffe_verpackung", label: "Chemie, Kunststoffe & Verpackung", multiplikator: 4.1 },
  { wert: "medizintechnik_lifesciences", label: "Medizintechnik & Life Sciences", multiplikator: 6.7 },
  { wert: "software_plattformen", label: "Software & Digitale Plattformen", multiplikator: 6.95 },
  { wert: "it_services_systemhaeuser", label: "IT-Services & Systemhäuser", multiplikator: 5.95 },
  { wert: "medien_marketing_agenturen", label: "Medien, Marketing & Agenturen", multiplikator: 3.75 },
  { wert: "telekommunikation_infrastruktur", label: "Telekommunikation & Infrastruktur", multiplikator: 5.65 },
  { wert: "gesundheit_pflege_dienstleister", label: "Gesundheitswesen: Pflege & Dienstleister", multiplikator: 5.5 },
  { wert: "unternehmensnahe_dienstleistungen_b2b", label: "Unternehmensnahe Dienstleistungen (B2B)", multiplikator: 4.45 },
  { wert: "bau_handwerk", label: "Bauhaupt- & Baunebengewerbe (Handwerk)", multiplikator: 4.4 },
  { wert: "immobilien_facility", label: "Immobilien-Dienstl. & Facility Mgmt.", multiplikator: 4.55 },
  { wert: "finanz_versicherung", label: "Finanzdienstleistungen & Vers.-Makler", multiplikator: 5.75 },
  { wert: "nahrung_genussmittel", label: "Nahrungs- & Genussmittel", multiplikator: 5.05 },
  { wert: "konsumgueter_nonfood", label: "Konsumgüter (Non-Food)", multiplikator: 3.2 },
  { wert: "handel_ecommerce_versand", label: "Handel: E-Commerce & Versand", multiplikator: 5.3 },
  { wert: "handel_gross_einzel_stationaer", label: "Handel: Groß- & Einzelhandel (Stationär)", multiplikator: 3.75 },
  { wert: "transport_logistik_spedition", label: "Transport, Logistik & Spedition", multiplikator: 4.15 },
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
  { wert: "keine", label: "Keine Mitarbeiter", delta: -2.5 },
  { wert: "1_5", label: "1 bis 5", delta: -1 },
  { wert: "6_10", label: "6 bis 10", delta: -0.5 },
  { wert: "11_20", label: "11 bis 20", delta: 0 },
  { wert: "21_50", label: "21 bis 50", delta: 0 },
  { wert: "51_250", label: "51 bis 250", delta: 0.25 },
  { wert: "ueber_250", label: "Über 250", delta: 0.5 },
];

export const ENTWICKLUNG_KACHELN: KachelOpt[] = [
  { wert: "stark_gestiegen", label: "Stark gestiegen", delta: 0.75 },
  { wert: "leicht_gestiegen", label: "Leicht gestiegen", delta: 0.25 },
  { wert: "gleich_geblieben", label: "Gleich geblieben", delta: 0 },
  { wert: "leicht_gesunken", label: "Leicht gesunken", delta: -0.5 },
  { wert: "stark_gesunken", label: "Stark gesunken", delta: -2 },
];

export const INHABER_KACHELN: KachelOpt[] = [
  { wert: "komplett_ohne", label: "Läuft komplett ohne mich", delta: 1 },
  { wert: "groesstenteils_ohne", label: "Größtenteils ohne mich", delta: 0.5 },
  { wert: "wenig_ohne", label: "Wenig geht ohne mich", delta: -0.5 },
  { wert: "nichts_ohne", label: "Nichts geht ohne mich", delta: -1.5 },
];

export const FUEHRUNGSEBENE_KACHELN: KachelOpt[] = [
  { wert: "ja_voll", label: "Ja, voll handlungsfähig", delta: 0.75 },
  { wert: "teilweise", label: "Teilweise vorhanden", delta: 0.25 },
  { wert: "nein", label: "Nein, nicht vorhanden", delta: -0.25 },
];

export const KUNDEN_KACHELN: KachelOpt[] = [
  { wert: "unter_10", label: "Unter 10 %", delta: 0.25 },
  { wert: "10_25", label: "10 bis 25 %", delta: -0.5 },
  { wert: "25_50", label: "25 bis 50 %", delta: -1.5 },
  { wert: "ueber_50", label: "Über 50 %", delta: -2.5 },
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
  const endMultiplikator = branche.multiplikator + summe;

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
