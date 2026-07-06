"use client";
import { useLang } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
      className="px-3 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition"
    >
      {lang === "fr" ? "العربية" : "Français"}
    </button>
  );
}
