"use client";
import { Menu, Bell } from "lucide-react";
import LangToggle from "./LangToggle";
import { useLang } from "@/lib/i18n";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 no-print">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden"><Menu size={22} /></button>
          <h1 className="font-semibold text-lg">{t("dashboard")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-gray-50">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
          </button>
          <LangToggle />
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">K</div>
        </div>
      </div>
    </header>
  );
}
