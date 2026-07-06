import { add, updateSettings } from "./db";
import { SEED_FLAG, safeGet, safeSet } from "./storage";
export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (safeGet(SEED_FLAG)) return;
  updateSettings({ companyName: "SARL Trans Pile à l'Heure", address: "Alger", phone: "0555 12 34 56", currency: "DZD" });
  const p1 = add<any>("products", { name: "Huile de table 5L", barcode: "6130001112223", category: "Alimentaire", purchasePrice: 950, salePrice: 1200, quantity: 4, lowStockThreshold: 10, tvaRate: 19 });
  const p2 = add<any>("products", { name: "Sucre blanc 1kg", barcode: "6130004445556", category: "Alimentaire", purchasePrice: 90, salePrice: 120, quantity: 250, lowStockThreshold: 50, tvaRate: 9 });
  const c1 = add<any>("clients", { name: "Supérette El Baraka", phone: "0661 22 33 44", address: "Bab Ezzouar", balance: 15400 });
  add<any>("suppliers", { name: "Cevital Distribution", phone: "023 00 00 00", address: "Bejaia", balance: 82000 });
  add<any>("invoices", { number: "FAC-2026-0001", clientId: c1.id, date: new Date().toISOString().slice(0, 10), lines: [{ productId: p2.id, designation: p2.name, qty: 20, unitPrice: 120, tvaRate: 9 }], totalHT: 2400, totalTVA: 216, timbreFiscal: 0, totalTTC: 2616, status: "unpaid", paidAmount: 0, paymentMethod: "cash" });
  add<any>("stockMovements", { productId: p1.id, type: "out", qty: 6, reason: "Vente comptoir" });
  add<any>("cashSessions", { openedAt: new Date().toISOString(), openingBalance: 5000, status: "open" });
  safeSet(SEED_FLAG, "1");
}
