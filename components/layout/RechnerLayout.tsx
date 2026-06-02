"use client";

import { createContext, useContext } from "react";
import Fortschrittsanzeige from "./Fortschrittsanzeige";

/**
 * Steuert, ob RechnerLayout in die Landingpage eingebettet gerendert wird.
 * Standard = false  -> bestehende Rechner-Routen verhalten sich EXAKT wie bisher
 *                      (Sticky-Header, Fortschrittsanzeige, Vollbild-Hintergrund).
 * true              -> schlankes, in sich geschlossenes Widget ohne Seiten-Chrome,
 *                      damit der Rechner als integrierter Bestandteil der
 *                      Landingpage erscheint. Inhalt/Logik bleiben unverändert.
 */
export const EingebettetContext = createContext(false);

interface RechnerLayoutProps {
  children: React.ReactNode;
  titel: string;
  beschreibung?: string;
  zeigeFortschritt?: boolean;
}

export default function RechnerLayout({
  children,
  titel,
  beschreibung,
  zeigeFortschritt = true,
}: RechnerLayoutProps) {
  const eingebettet = useContext(EingebettetContext);

  // --- Eingebetteter Modus: schlankes Widget für die Landingpage ---
  if (eingebettet) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white text-left shadow-2xl shadow-slate-950/40 ring-1 ring-slate-900/5">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />
        <div className="p-6 sm:p-8">
          {(titel || beschreibung) && (
            <div className="mb-7">
              {beschreibung && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {beschreibung}
                </span>
              )}
              {titel && (
                <h3 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                  {titel}
                </h3>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  // --- Standard-Modus: unverändert wie bisher ---
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
            Firmenwertrechner
          </span>
        </div>
        {zeigeFortschritt && <Fortschrittsanzeige />}
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          {titel && (
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {titel}
            </h1>
          )}
          {beschreibung && (
            <p className={`text-sm leading-relaxed text-gray-500 ${titel ? "mt-2" : ""}`}>
              {beschreibung}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
