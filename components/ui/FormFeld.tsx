import { forwardRef } from "react";

interface FormFeldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fehler?: string;
  hilfetext?: string;
  pflicht?: boolean;
  prefix?: string;
}

export const FormFeld = forwardRef<HTMLInputElement, FormFeldProps>(
  ({ label, fehler, hilfetext, pflicht, prefix, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {pflicht && <span className="ml-1 text-red-500">*</span>}
        </label>
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#15779b] focus:border-transparent ${
              prefix ? "pl-8" : ""
            } ${
              fehler
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            } ${className ?? ""}`}
            {...props}
          />
        </div>
        {fehler && <p className="text-xs text-red-500">{fehler}</p>}
        {hilfetext && !fehler && <p className="text-xs text-gray-400 leading-relaxed">{hilfetext}</p>}
      </div>
    );
  }
);
FormFeld.displayName = "FormFeld";
