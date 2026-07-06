"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LANG_KEY, safeGet, safeSet } from "@/lib/storage";
type Lang = "fr" | "ar";
const dict = {
  fr: { dashboard: "Tableau de bord", invoicing: "Facturation", stock: "Stock", clients: "Clients", suppliers: "Fournisseurs", cashRegister: "Caisse", debts: "Dettes / Créances", production: "Production", distribution: "Distribution", reports: "Statistiques", settings: "Paramètres", tryFree: "Essai gratuit", login: "Se connecter", tagline: "La gestion commerciale simplifiée, pensée pour l'Algérie", subtitle: "Facturation, stock, caisse et distribution — tout-en-un, bilingue.", features: "Fonctionnalités", whyUs: "Pourquoi nous ?", pricing: "Tarifs", testimonials: "Témoignages", contact: "Contact", todaySales: "Ventes du jour", invoicesCount: "Factures", stockAlerts: "Alertes stock", totalDebts: "Total dettes", cashBalance: "Solde caisse", newInvoice: "Nouvelle facture", newProduct: "Nouveau produit", addClient: "Ajouter client", recentActivity: "Activité récente", salesChart: "Ventes (7 jours)" },
  ar: { dashboard: "لوحة التحكم", invoicing: "الفوترة", stock: "المخزون", clients: "العملاء", suppliers: "الموردون", cashRegister: "الصندوق", debts: "الديون / المستحقات", production: "الإنتاج", distribution: "التوزيع", reports: "الإحصائيات", settings: "الإعدادات", tryFree: "جرّب مجاناً", login: "تسجيل الدخول", tagline: "تسيير تجاري مبسّط، مصمم للجزائر", subtitle: "فوترة، مخزون، صندوق وتوزيع — كل شيء في مكان واحد.", features: "المميزات", whyUs: "لماذا نحن؟", pricing: "الأسعار", testimonials: "آراء العملاء", contact: "اتصل بنا", todaySales: "مبيعات اليوم", invoicesCount: "عدد الفواتير", stockAlerts: "تنبيهات المخزون", totalDebts: "إجمالي الديون", cashBalance: "رصيد الصندوق", newInvoice: "فاتورة جديدة", newProduct: "منتج جديد", addClient: "إضافة عميل", recentActivity: "النشاط الأخير", salesChart: "المبيعات (7 أيام)" }
} as const;
type DictKey = keyof typeof dict.fr;
const Ctx = createContext<any>(null);
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => { const stored = safeGet(LANG_KEY) as Lang | null; if (stored) setLangState(stored); }, []);
  const setLang = (l: Lang) => { setLangState(l); safeSet(LANG_KEY, l); };
  const dir = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => { document.documentElement.dir = dir; document.documentElement.lang = lang; }, [dir, lang]);
  const t = (key: DictKey) => dict[lang][key];
  return <Ctx.Provider value={{ lang, setLang, dir, t }}>{children}</Ctx.Provider>;
}
export function useLang() { const c = useContext(Ctx); if (!c) throw new Error("useLang must be used within LangProvider"); return c; }
