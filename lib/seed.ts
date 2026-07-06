import { add, updateSettings } from "./db";
import type { Product, Client, Supplier, Invoice, StockMovement, CashSession } from "./db";

const SEED_FLAG = "tal_seeded";

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_FLAG)) return;

  updateSettings({
    companyName: "SARL Trans Pile à l'Heure", address: "Rue Didouche Mourad, Alger",
    phone: "0555 12 34 56", RC: "16/00-1234567B24", NIF: "000123456789012",
    AI: "12345678", taxId: "TVA-ALG-2026", currency: "DZD",
  });

  const p1 = add<Product>("products", { name: "Huile de table 5L", barcode: "6130001112223", category: "Alimentaire", purchasePrice: 950, salePrice: 1200, quantity: 4, lowStockThreshold: 10, tvaRate: 19 });
  const p2 = add<Product>("products", { name: "Sucre blanc 1kg", barcode: "6130004445556", category: "Alimentaire", purchasePrice: 90, salePrice: 120, quantity: 250, lowStockThreshold: 50, tvaRate: 9 });
  const p3 = add<Product>("products", { name: "Savon liquide 1L", barcode: "6130007778889", category: "Hygiène", purchasePrice: 300, salePrice: 420, quantity: 15, lowStockThreshold: 20, tvaRate: 19 });

  const c1 = add<Client>("clients", { name: "Supérette El Baraka", phone: "0661 22 33 44", address: "Bab Ezzouar, Alger", balance: 15400 });
  add<Client>("clients", { name: "Client Comptant", phone: "", address: "", balance: 0 });
  add<Supplier>("suppliers", { name: "Cevital Distribution", phone: "023 00 00 00", address: "Bejaia", balance: 82000 });

  const today = new Date().toISOString().slice(0, 10);
  add<Invoice>("invoices", {
    number: "FAC-2026-0001", clientId: c1.id, date: today,
    lines: [
      { productId: p2.id, designation: p2.name, qty: 20, unitPrice: 120, tvaRate: 9 },
      { productId: p3.id, designation: p3.name, qty: 5, unitPrice: 420, tvaRate: 19 },
    ],
    totalHT: 20 * 120 + 5 * 420, totalTVA: 20 * 120 * 0.09 + 5 * 420 * 0.19,
    timbreFiscal: 0, totalTTC: 0, status: "unpaid", paidAmount: 0, paymentMethod: "cash",
  });

  add<StockMovement>("stockMovements", { productId: p1.id, type: "out", qty: 6, reason: "Vente comptoir" });
  add<CashSession>("cashSessions", { openedAt: new Date().toISOString(), openingBalance: 5000, status: "open" });

  localStorage.setItem(SEED_FLAG, "1");
}
