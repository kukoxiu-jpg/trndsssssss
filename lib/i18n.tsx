"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "fr" | "ar";

const dict = {
  fr: {
    tagline: "La gestion commerciale simplifiée, pensée pour l'Algérie",
    subtitle: "Facturation, stock, caisse et distribution — tout-en-un, bilingue, conforme aux normes algériennes.",
    tryFree: "Essai gratuit", login: "Se connecter", features: "Fonctionnalités",
    whyUs: "Pourquoi nous ?", pricing: "Tarifs", testimonials: "Témoignages", contact: "Contact",
    dashboard: "Tableau de bord", invoicing: "Facturation", stock: "Stock", clients: "Clients",
    suppliers: "Fournisseurs", cashRegister: "Caisse", debts: "Dettes / Créances",
    production: "Production", distribution: "Distribution", reports: "Statistiques", settings: "Paramètres",
    todaySales: "Ventes du jour", invoicesCount: "Factures émises", stockAlerts: "Alertes stock",
    totalDebts: "Total dettes", cashBalance: "Solde caisse", newInvoice: "Nouvelle facture",
    newProduct: "Nouveau produit", addClient: "Ajouter client", recentActivity: "Activité récente",
    salesChart: "Ventes (7 derniers jours)",
  },
  ar: {
    tagline: "تسيير تجاري مبسّط، مصمم للجزائر",
    subtitle: "فوترة، مخزون، صندوق وتوزيع — كل شيء في مكان واحد، ثنائي اللغة، ومتوافق مع المعايير الجزائرية.",
    tryFree: "جرّب مجاناً", login: "تسجيل الدخول", features: "المميزات",
    whyUs: "لماذا نحن؟", pricing: "الأسعار", testimonials: "آراء العملاء", contact: "اتصل بنا",
    dashboard: "لوحة التحكم", invoicing: "الفوترة", stock: "المخزون", clients: "العملاء",
    suppliers: "الموردون", cashRegister: "الصندوق", debts: "الديون / المستحقات",
    production: "الإنتاج", distribution: "التوزيع", reports: "الإحصائيات", settings: "الإعدادات",
    todaySales: "مبيعات اليوم", invoicesCount: "عدد الفواتير", stockAlerts: "تنبيهات المخزون",
    totalDebts: "إجمالي الديون", cashBalance: "رصيد الصندوق", newInvoice: "فاتورة جديدة",
    newProduct: "منتج جديد", addClient: "إضافة عميل", recentActivity: "النشاط الأخير",
    salesChart: "المبيعات (آخر 7 أيام)",
  },
} as const;

type DictKey = keyof typeof dict.fr;

interface LangContextType {
  lang: Lang; setLang: (l: Lang) => void; t: (key: DictKey) => string; dir: "ltr" | "rtl";
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const stored = localStorage.getItem("tal_lang") as Lang | null;
    if (stored) setLangState(stored);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("tal_lang", l); };
  const dir = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);
  const t = (key: DictKey) => dict[lang][key];
  return <LangContext.Provider value={{ lang, setLang, t, dir }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
