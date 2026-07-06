import { DB_KEY, safeGet, safeSet } from "./storage";
export type Collection = "products" | "clients" | "suppliers" | "invoices" | "quotes" | "deliveryNotes" | "stockMovements" | "cashSessions" | "payments" | "expenses" | "productionOrders" | "deliveryTours";
export interface BaseEntity { id: string; createdAt: string; updatedAt: string; }
export interface Product extends BaseEntity { name: string; barcode?: string; category?: string; purchasePrice: number; salePrice: number; quantity: number; lowStockThreshold: number; tvaRate: 19 | 9 | 0; }
export interface Client extends BaseEntity { name: string; phone?: string; address?: string; balance: number; }
export interface Supplier extends BaseEntity { name: string; phone?: string; address?: string; balance: number; }
export interface Invoice extends BaseEntity { number: string; clientId: string; date: string; lines: any[]; totalHT: number; totalTVA: number; timbreFiscal: number; totalTTC: number; status: "unpaid" | "partial" | "paid"; paidAmount: number; paymentMethod?: "cash" | "check" | "transfer"; }
export interface StockMovement extends BaseEntity { productId: string; type: "in" | "out"; qty: number; reason: string; }
export interface CashSession extends BaseEntity { openedAt: string; closedAt?: string; openingBalance: number; closingBalance?: number; status: "open" | "closed"; }
export interface Payment extends BaseEntity { entityType: "client" | "supplier"; entityId: string; amount: number; method: "cash" | "check" | "transfer"; date: string; }
export interface Settings { companyName: string; address: string; phone: string; RC: string; NIF: string; AI: string; taxId: string; currency: string; }
export interface DB { products: Product[]; clients: Client[]; suppliers: Supplier[]; invoices: Invoice[]; quotes: any[]; deliveryNotes: any[]; stockMovements: StockMovement[]; cashSessions: CashSession[]; payments: Payment[]; expenses: any[]; productionOrders: any[]; deliveryTours: any[]; settings: Settings; }
const defaults: DB = { products: [], clients: [], suppliers: [], invoices: [], quotes: [], deliveryNotes: [], stockMovements: [], cashSessions: [], payments: [], expenses: [], productionOrders: [], deliveryTours: [], settings: { companyName: "Mon Entreprise", address: "Alger, Algérie", phone: "", RC: "", NIF: "", AI: "", taxId: "", currency: "DZD" } };
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function loadDB(): DB { const raw = safeGet(DB_KEY); if (!raw) return defaults; try { return { ...defaults, ...JSON.parse(raw) }; } catch { return defaults; } }
function saveDB(db: DB) { safeSet(DB_KEY, JSON.stringify(db)); }
export function getAll<T>(collection: Collection): T[] { return (loadDB()[collection] as unknown as T[]) || []; }
export function add<T extends BaseEntity>(collection: Collection, data: Omit<T, "id" | "createdAt" | "updatedAt">): T { const db = loadDB(); const now = new Date().toISOString(); const item = { ...data, id: uid(), createdAt: now, updatedAt: now } as T; (db[collection] as unknown as T[]).push(item); saveDB(db); return item; }
export function update<T extends BaseEntity>(collection: Collection, id: string, patch: Partial<T>) { const db = loadDB(); const arr = db[collection] as unknown as T[]; const i = arr.findIndex((x: any) => x.id === id); if (i === -1) return; arr[i] = { ...arr[i], ...patch, updatedAt: new Date().toISOString() }; saveDB(db); return arr[i]; }
export function remove(collection: Collection, id: string) { const db = loadDB(); const arr = db[collection] as unknown as BaseEntity[]; const i = arr.findIndex((x) => x.id === id); if (i === -1) return false; arr.splice(i, 1); saveDB(db); return true; }
export function getSettings() { return loadDB().settings; }
export function updateSettings(patch: Partial<Settings>) { const db = loadDB(); db.settings = { ...db.settings, ...patch }; saveDB(db); return db.settings; }
