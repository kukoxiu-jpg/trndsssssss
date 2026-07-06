import "./globals.css";
import { LangProvider } from "@/lib/i18n";
export const metadata = { title: "Trans Pile à l'Heure", description: "ERP-lite pour PME algériennes" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" dir="ltr"><body className="text-gray-900 antialiased"><LangProvider>{children}</LangProvider></body></html>;
}
