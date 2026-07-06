"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import {
  Receipt, Package, Users, Wallet, HandCoins, Truck,
  ShieldCheck, Globe2, Infinity as InfinityIcon, CheckCircle2,
} from "lucide-react";

const modules = [
  { icon: Receipt, key: "invoicing", desc_fr: "Devis, bons de livraison, factures A4 et tickets thermiques.", desc_ar: "عروض أسعار، سندات تسليم، فواتير A4 وتذاكر حرارية." },
  { icon: Package, key: "stock", desc_fr: "Alertes de stock, lots, péremption, multi-entrepôts.", desc_ar: "تنبيهات المخزون، الدفعات، تواريخ الصلاحية، مخازن متعددة." },
  { icon: Users, key: "clients", desc_fr: "Clients, fournisseurs et historique des transactions.", desc_ar: "العملاء، الموردون وسجل المعاملات." },
  { icon: Wallet, key: "cashRegister", desc_fr: "Sessions de caisse, dépenses et rapports de fin de journée.", desc_ar: "جلسات الصندوق، المصاريف وتقارير آخر اليوم." },
  { icon: HandCoins, key: "debts", desc_fr: "Suivi des dettes, créances et relances de paiement.", desc_ar: "تتبع الديون، المستحقات والتذكيرات بالدفع." },
  { icon: Truck, key: "distribution", desc_fr: "Tournées de livraison, stock camion et suivi chauffeur.", desc_ar: "جولات التوزيع، مخزون الشاحنة وتتبع السائق." },
];

export default function LandingPage() {
  const { t, lang, dir } = useLang();

  return (
    <div dir={dir}>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-bold text-primary text-lg">
            <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center">T</div>
            Trans Pile à l&apos;Heure
          </div>
          <div className="flex items-center gap-3">
            <LangToggle />
            <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition">
              {t("login")}
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary-light rounded-full px-3 py-1 mb-6">
          🇩🇿 {lang === "fr" ? "Fait pour l'Algérie" : "صنع للجزائر"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 max-w-3xl mx-auto">
          {t("tagline")}
        </h1>
        <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">{t("subtitle")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition">
            {t("tryFree")}
          </Link>
          <Link href="/dashboard" className="px-6 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition">
            {t("login")}
          </Link>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t("features")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.key} className="card hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold mb-1">{t(m.key as any)}</h3>
                <p className="text-sm text-gray-600">{lang === "fr" ? m.desc_fr : m.desc_ar}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-light py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t("whyUs")}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <ShieldCheck className="mx-auto text-primary mb-3" size={28} />
              <h3 className="font-semibold mb-1">{lang === "fr" ? "Conformité fiscale" : "التوافق الضريبي"}</h3>
              <p className="text-sm text-gray-600">{lang === "fr" ? "TVA, timbre fiscal et état 104 intégrés." : "الرسم على القيمة المضافة، الطابع الجبائي والكشف 104."}</p>
            </div>
            <div className="text-center">
              <Globe2 className="mx-auto text-primary mb-3" size={28} />
              <h3 className="font-semibold mb-1">{lang === "fr" ? "Bilingue FR / AR" : "ثنائي اللغة"}</h3>
              <p className="text-sm text-gray-600">{lang === "fr" ? "Interface complète en français et arabe (RTL)." : "واجهة كاملة بالفرنسية والعربية (RTL)."}</p>
            </div>
            <div className="text-center">
              <InfinityIcon className="mx-auto text-primary mb-3" size={28} />
              <h3 className="font-semibold mb-1">{lang === "fr" ? "Licence à vie" : "ترخيص مدى الحياة"}</h3>
              <p className="text-sm text-gray-600">{lang === "fr" ? "Un seul paiement, sans abonnement récurrent." : "دفعة واحدة، بدون اشتراك متكرر."}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t("pricing")}</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="card text-center">
            <h3 className="font-semibold text-lg mb-2">{lang === "fr" ? "Essai gratuit" : "تجربة مجانية"}</h3>
            <p className="text-3xl font-bold mb-4">14 {lang === "fr" ? "jours" : "يوم"}</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {[lang === "fr" ? "Tous les modules" : "جميع الوحدات", lang === "fr" ? "Données de démonstration" : "بيانات تجريبية", lang === "fr" ? "Sans carte bancaire" : "بدون بطاقة بنكية"].map((f) => (
                <li key={f} className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} className="text-primary" />{f}</li>
              ))}
            </ul>
            <Link href="/dashboard" className="block px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary-light transition">{t("tryFree")}</Link>
          </div>
          <div className="card text-center border-primary">
            <h3 className="font-semibold text-lg mb-2">{lang === "fr" ? "Licence à vie" : "ترخيص مدى الحياة"}</h3>
            <p className="text-3xl font-bold mb-4">{lang === "fr" ? "Paiement unique" : "دفعة واحدة"}</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {[lang === "fr" ? "Modules illimités" : "وحدات غير محدودة", lang === "fr" ? "Mises à jour incluses" : "التحديثات مشمولة", lang === "fr" ? "Support prioritaire" : "دعم أولوية"].map((f) => (
                <li key={f} className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} className="text-primary" />{f}</li>
              ))}
            </ul>
            <Link href="/dashboard" className="block px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition">{lang === "fr" ? "Nous contacter" : "اتصل بنا"}</Link>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t("testimonials")}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <p className="text-sm text-gray-600 italic mb-3">
                  {lang === "fr" ? "« Témoignage client à venir. »" : "« شهادة عميل قريباً. »"}
                </p>
                <p className="text-sm font-semibold">{lang === "fr" ? "Client " + i : "عميل " + i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Trans Pile à l&apos;Heure</p>
            <p>{t("contact")}: contact@transpilealheure.dz</p>
            <p>Alger, Algérie</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
