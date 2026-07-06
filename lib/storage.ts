export const DB_KEY = "tal_db";
export const LANG_KEY = "tal_lang";
export const SEED_FLAG = "tal_seeded";
let memoryStore: Record<string, string> = {};
function hasStorage() {
  try { return typeof window !== "undefined" && !!window.localStorage; } catch { return false; }
}
export function safeGet(key: string): string | null {
  if (hasStorage()) { try { return window.localStorage.getItem(key); } catch {} }
  return memoryStore[key] ?? null;
}
export function safeSet(key: string, value: string) {
  if (hasStorage()) { try { window.localStorage.setItem(key, value); return; } catch {} }
  memoryStore[key] = value;
}
export function safeRemove(key: string) {
  if (hasStorage()) { try { window.localStorage.removeItem(key); return; } catch {} }
  delete memoryStore[key];
}
