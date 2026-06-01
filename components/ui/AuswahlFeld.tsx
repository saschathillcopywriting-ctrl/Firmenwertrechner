import { forwardRef } from "react";

interface AuswahlFeldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  fehler?: string;
  pflicht?: boolean;
  optionen: { wert: string; label: string }[];
  platzhalter?: string;
}

export const AuswahlFeld = forwardRef<HTMLSelectElement, AuswahlFeldProps>(
  ({ label, fehler, pflicht, optionen, platzhalter, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {pflicht && <span className="ml-1 text-red-500">*</span>}
        </label>
        <select
          ref={ref}
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            fehler
              ? "border-red-400 bg-red-50"
              : "border-gray-200 hover:border-gray-300"
          } ${className ?? ""}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "20px",
            paddingRight: "40px",
          }}
          {...props}
        >
          {platzhalter && (
            <option value="" disabled>
              {platzhalter}
            </option>
          )}
          {optionen.map((o) => (
            <option key={o.wert} value={o.wert}>
              {o.label}
            </option>
          ))}
        </select>
        {fehler && <p className="text-xs text-red-500">{fehler}</p>}
      </div>
    );
  }
);
AuswahlFeld.displayName = "AuswahlFeld";
