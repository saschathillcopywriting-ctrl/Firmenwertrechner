"use client";

interface NavButtonsProps {
  onZurueck?: () => void;
  weiterText?: string;
  zurueckText?: string;
  ladeZustand?: boolean;
}

export default function NavButtons({
  onZurueck,
  weiterText = "Weiter",
  zurueckText = "Zurück",
  ladeZustand = false,
}: NavButtonsProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-8">
      {onZurueck ? (
        <button
          type="button"
          onClick={onZurueck}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {zurueckText}
        </button>
      ) : (
        <div />
      )}

      <button
        type="submit"
        disabled={ladeZustand}
        className="flex items-center gap-2 rounded-lg bg-[#15779b] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#11607d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {ladeZustand ? "Laden…" : weiterText}
        {!ladeZustand && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
