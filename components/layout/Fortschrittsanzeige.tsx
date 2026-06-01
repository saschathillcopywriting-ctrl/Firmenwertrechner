"use client";

import { SCHRITTE } from "@/types";
import { useFormularStore } from "@/store/formular-store";

export default function Fortschrittsanzeige() {
  const { aktuellerSchritt } = useFormularStore();
  const aktuelleNummer =
    aktuellerSchritt === "ergebnis"
      ? SCHRITTE.length + 1
      : (SCHRITTE.find((s) => s.id === aktuellerSchritt)?.nummer ?? 1);

  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-5">
        <div className="relative flex items-start justify-between">
          {/* Background line */}
          <div className="absolute left-[18px] right-[18px] top-[18px] h-px bg-gray-200" />
          {/* Progress line */}
          <div
            className="absolute left-[18px] top-[18px] h-px bg-blue-500 transition-all duration-500"
            style={{
              width: `calc((100% - 36px) * ${Math.min(1, (aktuelleNummer - 1) / (SCHRITTE.length - 1))})`,
            }}
          />

          {SCHRITTE.map((schritt) => {
            const abgeschlossen = schritt.nummer < aktuelleNummer;
            const aktiv = schritt.id === aktuellerSchritt;

            return (
              <div key={schritt.id} className="relative flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    abgeschlossen
                      ? "bg-blue-600 text-white shadow-sm"
                      : aktiv
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "border-2 border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {abgeschlossen ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    schritt.nummer
                  )}
                </div>
                <span
                  className={`hidden text-center text-xs font-medium leading-tight sm:block ${
                    aktiv
                      ? "text-blue-600"
                      : abgeschlossen
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {schritt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
