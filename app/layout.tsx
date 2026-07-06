import "./globals.css";
import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Trans Pile à l'Heure — Gestion commerciale pour l'Algérie",
  description: "Facturation, stock, caisse et distribution pour PME algériennes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body className="bg-bg text-gray-900 antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
