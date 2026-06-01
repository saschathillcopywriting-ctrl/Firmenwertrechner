import Fortschrittsanzeige from "./Fortschrittsanzeige";

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
