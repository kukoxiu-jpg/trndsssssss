export type Collection =
  | "products" | "clients" | "suppliers" | "invoices" | "quotes" | "deliveryNotes"
  | "stockMovements" | "cashSessions" | "payments" | "expenses" | "productionOrders" | "deliveryTours";

export interface DB {
  products: Product[]; clients: Client[]; suppliers: Supplier[]; invoices: Invoice[];
  quotes: Quote[]; deliveryNotes: DeliveryNote[]; stockMovements: StockMovement[];
  cashSessions: CashSession[]; payments: Payment[]; expenses: Expense[];
  productionOrders: ProductionOrder[]; deliveryTours: DeliveryTour[]; settings: Settings;
}

export interface BaseEntity { id: string; createdAt: string; updatedAt: string; }

export interface Product extends BaseEntity {
  name: string; barcode?: string; category?: string; purchasePrice: number; salePrice: number;
  quantity: number; lowStockThreshold: number; tvaRate: 19 | 9 | 0; warehouseId?: string;
  batches?: { lot: string; expiry: string; qty: number }[];
}

export interface Client extends BaseEntity { name: string; phone?: string; address?: string; balance: number; }
export interface Supplier extends BaseEntity { name: string; phone?: string; address?: string; balance: number; }

export interface InvoiceLine { productId: string; designation: string; qty: number; unitPrice: number; tvaRate: 19 | 9 | 0; }

export interface Invoice extends BaseEntity {
  number: string; clientId: string; date: string; lines: InvoiceLine[];
  totalHT: number; totalTVA: number; timbreFiscal: number; totalTTC: number;
  status: "unpaid" | "partial" | "paid"; paidAmount: number;
  sourceQuoteId?: string; sourceDeliveryNoteIds?: string[]; paymentMethod?: "cash" | "check" | "transfer";
}

export interface Quote extends BaseEntity {
  number: string; clientId: string; date: string; lines: InvoiceLine[];
  totalHT: number; totalTVA: number; totalTTC: number; status: "draft" | "sent" | "converted";
}

export interface DeliveryNote extends BaseEntity { number: string; clientId: string; date: string; lines: InvoiceLine[]; invoiced: boolean; }
export interface StockMovement extends BaseEntity { productId: string; type: "in" | "out"; qty: number; reason: string; warehouseId?: string; }
export interface CashSession extends BaseEntity { openedAt: string; closedAt?: string; openingBalance: number; closingBalance?: number; status: "open" | "closed"; }
export interface Payment extends BaseEntity { entityType: "client" | "supplier"; entityId: string; invoiceId?: string; amount: number; method: "cash" | "check" | "transfer"; date: string; }
export interface Expense extends BaseEntity { label: string; amount: number; category?: string; date: string; cashSessionId?: string; }
export interface ProductionOrder extends BaseEntity { finishedProductId: string; qtyProduced: number; bom: { rawMaterialId: string; qtyUsed: number }[]; cost: number; date: string; }
export interface DeliveryTour extends BaseEntity {
  driver: string; vehicle: string; date: string;
  stops: { clientId: string; invoiceIds: string[]; collected: number; status: "pending" | "done" }[];
  truckStock: { productId: string; qty: number }[];
}
export interface Settings { companyName: string; address: string; phone: string; RC: string; NIF: string; AI: string; taxId: string; currency: string; }

const STORAGE_KEY = "tal_db";
const defaultSettings: Settings = { companyName: "Mon Entreprise", address: "Alger, Algérie", phone: "0555 00 00 00", RC: "", NIF: "", AI: "", taxId: "", currency: "DZD" };

function emptyDB(): DB {
  return { products: [], clients: [], suppliers: [], invoices: [], quotes: [], deliveryNotes: [], stockMovements: [], cashSessions: [], payments: [], expenses: [], productionOrders: [], deliveryTours: [], settings: defaultSettings };
}

function loadDB(): DB {
  if (typeof window === "undefined") return emptyDB();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyDB();
  try { return { ...emptyDB(), ...JSON.parse(raw) }; } catch { return emptyDB(); }
}

function saveDB(db: DB) { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }
function uid(): string { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

export function getAll<T extends BaseEntity>(collection: Collection): T[] {
  const db = loadDB(); return (db[collection] as unknown as T[]) || [];
}
export function getById<T extends BaseEntity>(collection: Collection, id: string): T | undefined {
  return getAll<T>(collection).find((item) => item.id === id);
}
export function add<T extends BaseEntity>(collection: Collection, data: Omit<T, "id" | "createdAt" | "updatedAt">): T {
  const db = loadDB(); const now = new Date().toISOString();
  const newItem = { ...data, id: uid(), createdAt: now, updatedAt: now } as unknown as T;
  (db[collection] as unknown as T[]).push(newItem); saveDB(db); return newItem;
}
export function update<T extends BaseEntity>(collection: Collection, id: string, patch: Partial<T>): T | undefined {
  const db = loadDB(); const arr = db[collection] as unknown as T[];
  const idx = arr.findIndex((item) => item.id === id); if (idx === -1) return undefined;
  arr[idx] = { ...arr[idx], ...patch, updatedAt: new Date().toISOString() }; saveDB(db); return arr[idx];
}
export function remove(collection: Collection, id: string): boolean {
  const db = loadDB(); const arr = db[collection] as unknown as BaseEntity[];
  const idx = arr.findIndex((item) => item.id === id); if (idx === -1) return false;
  arr.splice(idx, 1); saveDB(db); return true;
}
export function getSettings(): Settings { return loadDB().settings; }
export function updateSettings(patch: Partial<Settings>): Settings {
  const db = loadDB(); db.settings = { ...db.settings, ...patch }; saveDB(db); return db.settings;
}
export function resetDB() { saveDB(emptyDB()); }
export function exportDB(): DB { return loadDB(); }
export function importDB(data: DB) { saveDB(data); }
