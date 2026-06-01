"use client";

export interface KachelOption {
  wert: string;
  label: string;
  beschreibung?: string;
}

interface AuswahlKachelnProps {
  optionen: KachelOption[];
  wert: string;
  onChange: (wert: string) => void;
  spalten?: 2 | 3 | 4;
  fehler?: string;
  label?: string;
  pflicht?: boolean;
}

export default function AuswahlKacheln({
  optionen,
  wert,
  onChange,
  spalten = 2,
  fehler,
  label,
  pflicht,
}: AuswahlKachelnProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[spalten];

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <span className="text-sm font-medium text-gray-700">
          {label}
          {pflicht && <span className="ml-1 text-red-500">*</span>}
        </span>
      )}

      <div className={`grid ${gridCols} gap-3`}>
        {optionen.map((opt) => {
          const aktiv = wert === opt.wert;
          return (
            <button
              key={opt.wert}
              type="button"
              onClick={() => onChange(opt.wert)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 ${
                aktiv
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              {aktiv && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <span
                className={`block pr-6 text-sm font-semibold leading-snug ${
                  aktiv ? "text-blue-700" : "text-gray-800"
                }`}
              >
                {opt.label}
              </span>
              {opt.beschreibung && (
                <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                  {opt.beschreibung}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {fehler && <p className="text-xs text-red-500">{fehler}</p>}
    </div>
  );
}
