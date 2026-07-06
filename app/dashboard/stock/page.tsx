"use client";
import { useEffect, useState } from "react";
import { Plus, Search, AlertTriangle, ArrowDownCircle, ArrowUpCircle, Trash2, Pencil } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getAll, add, update, remove } from "@/lib/db";
import type { Product, StockMovement } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Modal from "@/components/Modal";

const emptyForm = {
  name: "", barcode: "", category: "", purchasePrice: 0, salePrice: 0,
  quantity: 0, lowStockThreshold: 5, tvaRate: 19 as 19 | 9 | 0,
};

export default function StockPage() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [moveModal, setMoveModal] = useState<Product | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [moveForm, setMoveForm] = useState({ type: "in" as "in" | "out", qty: 1, reason: "" });

  const load = () => setProducts(getAll<Product>("products"));
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, barcode: p.barcode || "", category: p.category || "", purchasePrice: p.purchasePrice, salePrice: p.salePrice, quantity: p.quantity, lowStockThreshold: p.lowStockThreshold, tvaRate: p.tvaRate });
    setModalOpen(true);
  };

  const saveProduct = () => {
    if (!form.name.trim()) return;
    if (editing) update<Product>("products", editing.id, form);
    else add<Product>("products", form as any);
    setModalOpen(false);
    load();
  };

  const deleteProduct = (id: string) => {
    if (confirm(isAr ? "هل تريد الحذف؟" : "Confirmer la suppression ?")) {
      remove("products", id);
      load();
    }
  };

  const submitMove = () => {
    if (!moveModal) return;
    add<StockMovement>("stockMovements", { productId: moveModal.id, type: moveForm.type, qty: moveForm.qty, reason: moveForm.reason });
    const delta = moveForm.type === "in" ? moveForm.qty : -moveForm.qty;
    update<Product>("products", moveModal.id, { quantity: Math.max(0, moveModal.quantity + delta) });
    setMoveModal(null);
    setMoveForm({ type: "in", qty: 1, reason: "" });
    load();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || (p.barcode || "").includes(search)
  );

  const label = {
    title: isAr ? "المخزون" : "Stock / Inventaire",
    newProduct: isAr ? "منتج جديد" : "Nouveau produit",
    search: isAr ? "بحث بالاسم أو الباركود..." : "Rechercher par nom ou code-barres...",
    name: isAr ? "الاسم" : "Nom", barcode: isAr ? "الباركود" : "Code-barres",
    category: isAr ? "الفئة" : "Catégorie", purchase: isAr ? "سعر الشراء" : "Prix d'achat",
    sale: isAr ? "سعر البيع" : "Prix de vente", qty: isAr ? "الكمية" : "Quantité",
    threshold: isAr ? "حد التنبيه" : "Seuil d'alerte", tva: "TVA", actions: isAr ? "إجراءات" : "Actions",
    save: isAr ? "حفظ" : "Enregistrer", cancel: isAr ? "إلغاء" : "Annuler",
    stockIn: isAr ? "إدخال" : "Entrée", stockOut: isAr ? "إخراج" : "Sortie",
    reason: isAr ? "السبب" : "Motif", move: isAr ? "حركة مخزون" : "Mouvement de stock",
    editProduct: isAr ? "تعديل المنتج" : "Modifier le produit",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{label.title}</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition">
          <Plus size={16} /> {label.newProduct}
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={label.search}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">{label.name}</th>
              <th className="text-left px-4 py-3">{label.barcode}</th>
              <th className="text-left px-4 py-3">{label.category}</th>
              <th className="text-right px-4 py-3">{label.purchase}</th>
              <th className="text-right px-4 py-3">{label.sale}</th>
              <th className="text-right px-4 py-3">{label.qty}</th>
              <th className="text-right px-4 py-3">{label.tva}</th>
              <th className="text-right px-4 py-3">{label.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.barcode || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{p.category || "—"}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(p.purchasePrice)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(p.salePrice)}</td>
                <td className="px-4 py-3 text-right">
                  <span className={p.quantity <= p.lowStockThreshold ? "text-accent font-semibold flex items-center gap-1 justify-end" : ""}>
                    {p.quantity <= p.lowStockThreshold && <AlertTriangle size={14} />} {p.quantity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">{p.tvaRate}%</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button title={label.stockIn} onClick={() => { setMoveModal(p); setMoveForm({ type: "in", qty: 1, reason: "" }); }} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded"><ArrowDownCircle size={16} /></button>
                    <button title={label.stockOut} onClick={() => { setMoveModal(p); setMoveForm({ type: "out", qty: 1, reason: "" }); }} className="text-accent hover:bg-red-50 p-1.5 rounded"><ArrowUpCircle size={16} /></button>
                    <button onClick={() => openEdit(p)} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded"><Pencil size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="text-gray-400 hover:bg-gray-100 p-1.5 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center text-gray-400 py-8">{isAr ? "لا توجد نتائج" : "Aucun produit trouvé"}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? label.editProduct : label.newProduct}>
        <div className="space-y-3">
          <input placeholder={label.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <input placeholder={label.barcode} value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <input placeholder={label.category} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" placeholder={label.purchase} value={form.purchasePrice} onChange={(e) => setForm({ ...form, purchasePrice: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input type="number" placeholder={label.sale} value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" placeholder={label.qty} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input type="number" placeholder={label.threshold} value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <select value={form.tvaRate} onChange={(e) => setForm({ ...form, tvaRate: Number(e.target.value) as 19 | 9 | 0 })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value={19}>TVA 19%</option>
            <option value={9}>TVA 9%</option>
            <option value={0}>TVA 0%</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm">{label.cancel}</button>
            <button onClick={saveProduct} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">{label.save}</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!moveModal} onClose={() => setMoveModal(null)} title={`${label.move} — ${moveModal?.name || ""}`}>
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setMoveForm({ ...moveForm, type: "in" })} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${moveForm.type === "in" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-gray-200"}`}>{label.stockIn}</button>
            <button onClick={() => setMoveForm({ ...moveForm, type: "out" })} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${moveForm.type === "out" ? "bg-red-50 border-red-300 text-accent" : "border-gray-200"}`}>{label.stockOut}</button>
          </div>
          <input type="number" min={1} value={moveForm.qty} onChange={(e) => setMoveForm({ ...moveForm, qty: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder={label.qty} />
          <input value={moveForm.reason} onChange={(e) => setMoveForm({ ...moveForm, reason: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder={label.reason} />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setMoveModal(null)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm">{label.cancel}</button>
            <button onClick={submitMove} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">{label.save}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
