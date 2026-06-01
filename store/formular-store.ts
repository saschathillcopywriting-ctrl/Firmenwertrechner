import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormularDaten, SchrittId } from "@/types";

const INITIAL: FormularDaten = {
  schritt1: { branche: "", rechtsform: "", mitarbeiter: "" },
  schritt2: { jahresumsatz: "", gewinnVorSteuern: "", entwicklung: "" },
  schritt3: { inhaberAbhaengigkeit: "", fuehrungsebene: "", kundenKonzentration: "" },
  schritt4: { wiederkehrendeUmsaetze: "", marktposition: "", dokumentation: "" },
  kontakt: { vorname: "", nachname: "", email: "", mobil: "" },
};

interface FormularStore {
  daten: FormularDaten;
  aktuellerSchritt: SchrittId;
  aktualisiereSchritt1: (d: Partial<FormularDaten["schritt1"]>) => void;
  aktualisiereSchritt2: (d: Partial<FormularDaten["schritt2"]>) => void;
  aktualisiereSchritt3: (d: Partial<FormularDaten["schritt3"]>) => void;
  aktualisiereSchritt4: (d: Partial<FormularDaten["schritt4"]>) => void;
  aktualisiereKontakt: (d: Partial<FormularDaten["kontakt"]>) => void;
  setzeSchritt: (schritt: SchrittId) => void;
  zuruecksetzen: () => void;
}

export const useFormularStore = create<FormularStore>()(
  persist(
    (set) => ({
      daten: INITIAL,
      aktuellerSchritt: "unternehmen",
      aktualisiereSchritt1: (d) =>
        set((s) => ({ daten: { ...s.daten, schritt1: { ...s.daten.schritt1, ...d } } })),
      aktualisiereSchritt2: (d) =>
        set((s) => ({ daten: { ...s.daten, schritt2: { ...s.daten.schritt2, ...d } } })),
      aktualisiereSchritt3: (d) =>
        set((s) => ({ daten: { ...s.daten, schritt3: { ...s.daten.schritt3, ...d } } })),
      aktualisiereSchritt4: (d) =>
        set((s) => ({ daten: { ...s.daten, schritt4: { ...s.daten.schritt4, ...d } } })),
      aktualisiereKontakt: (d) =>
        set((s) => ({ daten: { ...s.daten, kontakt: { ...s.daten.kontakt, ...d } } })),
      setzeSchritt: (schritt) => set({ aktuellerSchritt: schritt }),
      zuruecksetzen: () => set({ daten: INITIAL, aktuellerSchritt: "unternehmen" }),
    }),
    { name: "firmenwertrechner-v2" }
  )
);
