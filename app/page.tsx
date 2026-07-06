"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
export default function LandingPage() {
  const { t, dir } = useLang();
  return <div dir={dir}><header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100"><div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3"><div className="flex items-center gap-2 font-bold text-primary text-lg"><div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center">T</div>Trans Pile à l&apos;Heure</div><div className="flex items-center gap-3"><LangToggle /><Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">{t('login')}</Link></div></div></header><section className="max-w-6xl mx-auto px-4 py-20 text-center"><h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">{t('tagline')}</h1><p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">{t('subtitle')}</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><Link href="/dashboard" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold">{t('tryFree')}</Link><Link href="/dashboard" className="px-6 py-3 rounded-lg border border-gray-300 font-semibold">{t('login')}</Link></div></section></div>;
}
