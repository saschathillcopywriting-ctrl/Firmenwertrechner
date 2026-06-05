import Image from "next/image";
import FunnelShell from "@/components/funnel/FunnelShell";

const DANKE_VORTEILE = [
  "Ein Blick hinter deinen geschätzten Firmenwert",
  "Eine Einordnung deines Unternehmenswertes anhand deiner individuellen Situation",
  "Hinweise auf Werttreiber und mögliche Risiken in deinem Unternehmen",
  "Erste Empfehlungen, wie sich der Firmenwert häufig steigern lässt",
  "Antworten auf deine Fragen zu Nachfolge, Verkauf oder Unternehmensentwicklung sowie Antworten auf alle deine Fragen.",
];

export default function DankePage() {
  return (
    <FunnelShell>
      <div className="px-6 py-10 sm:px-12 sm:py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mx-auto mt-5 max-w-xl text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            Deine Anfrage wurde erfolgreich übermittelt.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            Ein Experte aus dem Team der Otter Consult wird sich innerhalb der nächsten 24 bis 48 Stunden persönlich bei dir melden.
          </p>

          {/* Dekorative Bilder: leicht überlappend & versetzt */}
          <div className="relative mx-auto mt-10 h-52 max-w-md sm:h-60">
            <div className="absolute left-1 top-6 w-[60%] -rotate-3 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-1">
              <Image src="/images/Dankeseite-2.png" alt="" width={2560} height={1707} className="h-auto w-full" />
            </div>
            <div className="absolute right-1 top-0 w-[56%] rotate-3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-1">
              <Image src="/images/Dankeseite-1.png" alt="" width={1200} height={675} className="h-auto w-full" />
            </div>
          </div>

          {/* Das erwartet dich im Gespräch */}
          <div className="mt-10 rounded-2xl border border-[#cfe3ea] bg-[#eef5f8] p-6 text-left">
            <h4 className="text-base font-bold text-slate-900 sm:text-lg">Das erwartet dich im Gespräch:</h4>
            <ul className="mt-4 space-y-3">
              {DANKE_VORTEILE.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-lg space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              Nach diesem unverbindlichen Gespräch weißt du ganz transparent, was deine Firma heute wert ist und an welchen Stellschrauben du drehen kannst, um den Wert in den nächsten Jahren deutlich zu steigern.
            </p>
            <p>Wir freuen uns auf das Gespräch mit dir.</p>
            <p className="font-semibold text-slate-900">Dein Team von der Otter Consult</p>
          </div>
        </div>
      </div>
    </FunnelShell>
  );
}
