import { redirect } from "next/navigation";

// Ergebnis & Danke werden jetzt inline im Rechner auf der Landingpage (/) angezeigt.
export default function Page() {
  redirect("/");
}
