"use client";
import Link from "next/link";
import { ArrowRight, LucideIcon, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
export default function ModulePlaceholder({ title, descriptionFr, descriptionAr, icon: Icon, ctaHref, ctaFr, ctaAr }: any) {
  const { lang } = useLang(); const isAr = lang === "ar";
  return <div className="space-y-6"><div className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0"><Icon size={22} /></div><div><h2 className="text-xl font-bold mb-2">{title}</h2><p className="text-gray-600 max-w-2xl">{isAr ? descriptionAr : descriptionFr}</p></div></div>{ctaHref && <Link href={ctaHref} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition">{isAr ? ctaAr : ctaFr} <ArrowRight size={16} /></Link>}</div><div className="grid md:grid-cols-3 gap-4">{[1,2,3].map((i)=><div key={i} className="card"><div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-primary mb-3"><Sparkles size={18} /></div><h3 className="font-semibold mb-2">{isAr ? `قسم جاهز ${i}` : `Section prête ${i}`}</h3><p className="text-sm text-gray-600">{isAr ? 'هذه الصفحة تعمل الآن بدون أخطاء ويمكن توسيعها لاحقاً.' : 'Cette page fonctionne maintenant sans erreur et peut être enrichie plus tard.'}</p></div>)}</div></div>;
}
