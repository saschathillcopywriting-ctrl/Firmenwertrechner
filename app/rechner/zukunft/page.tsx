import { redirect } from "next/navigation";

// Der Rechner läuft jetzt vollständig inline auf der Landingpage (/).
export default function Page() {
  redirect("/");
}
