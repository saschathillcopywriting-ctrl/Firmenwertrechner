import { redirect } from "next/navigation";

// Der Rechner läuft jetzt vollständig inline auf der Landingpage (/).
// Alte Schritt-URLs leiten dorthin zurück.
export default function Page() {
  redirect("/");
}
