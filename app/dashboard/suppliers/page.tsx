"use client";
import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Pencil, Wallet } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getAll, add, update, remove } from "@/lib/db";
import type { Supplier, Payment } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Modal from "@/components/Modal";

const emptyForm = { name: "", phone: "", address: "", balance: 0 };

export default function SuppliersPage() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [payModal, setPayModal] = useState<Supplier | null>(null);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<"cash" | "check" | "transfer">("cash");

  const load = () => setSuppliers(getAll<Supplier>("suppliers"));
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s: Supplier) => { setEditing(s); setForm({ name: s.name, phone: s.phone || "", address: s.address || "", balance: s.balance }); setModalOpen(true); };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) update<Supplier>("suppliers", editing.id, form);
    else add<Supplier>("suppliers", form as any);
    setModalOpen(false);
    load();
  };

  const del = (id: string) => {
    if (confirm(isAr ? "هل تريد الحذف؟" : "Confirmer la suppression ?")) { remove("suppliers", id); load(); }
  };

  const recordPayment = () => {
    if (!payModal || payAmount <= 0) return;
    add<Payment>("payments", { entityType: "supplier", entityId: payModal.id, amount: payAmount, method: payMethod, date: new Date().toISOString().slice(0, 10) });
    update<Supplier>("suppliers", payModal.id, { balance: Math.max(0, payModal.balance - payAmount) });
    setPayModal(null); setPayAmount(0);
    load();
  };

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || (s.phone || "").includes(search));

  const label = {
    title: isAr ? "الموردون" : "Fournisseurs",
    add: isAr ? "إضافة مورد" : "Ajouter un fournisseur",
    search: isAr ? "بحث بالاسم أو الهاتف..." : "Rechercher par nom ou téléphone...",
    name: isAr ? "الاسم" : "Nom", phone: isAr ? "الهاتف" : "Téléphone", address: isAr ? "العنوان" : "Adresse",
    balance: isAr ? "الرصيد المستحق" : "Solde dû", actions: isAr ? "إجراءات" : "Actions",
    save: isAr ? "حفظ" : "Enregistrer", cancel: isAr ? "إلغاء" : "Annuler",
    payment: isAr ? "تسجيل دفعة" : "Enregistrer un paiement", amount: isAr ? "المبلغ" : "Montant",
    method: isAr ? "طريقة الدفع" : "Méthode", cash: isAr ? "نقدي" : "Espèces", check: isAr ? "شيك" : "Chèque", transfer: isAr ? "تحويل" : "Virement",
    edit: isAr ? "تعديل المورد" : "Modifier le fournisseur",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{label.title}</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition">
          <Plus size={16} /> {label.add}
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
              <th className="text-left px-4 py-3">{label.phone}</th>
              <th className="text-left px-4 py-3">{label.address}</th>
              <th className="text-right px-4 py-3">{label.balance}</th>
              <th className="text-right px-4 py-3">{label.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-gray-500">{s.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{s.address || "—"}</td>
                <td className={`px-4 py-3 text-right font-semibold ${s.balance > 0 ? "text-accent" : "text-emerald-600"}`}>{formatCurrency(s.balance)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button title={label.payment} onClick={() => { setPayModal(s); setPayAmount(0); }} className="text-primary hover:bg-primary-light p-1.5 rounded"><Wallet size={16} /></button>
                    <button onClick={() => openEdit(s)} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded"><Pencil size={16} /></button>
                    <button onClick={() => del(s.id)} className="text-gray-400 hover:bg-gray-100 p-1.5 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="text-center text-gray-400 py-8">{isAr ? "لا توجد نتائج" : "Aucun fournisseur trouvé"}</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? label.edit : label.add}>
        <div className="space-y-3">
          <input placeholder={label.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <input placeholder={label.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <input placeholder={label.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <input type="number" placeholder={label.balance} value={form.balance} onChange={(e) => setForm({ ...form, balance: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm">{label.cancel}</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">{label.save}</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!payModal} onClose={() => setPayModal(null)} title={`${label.payment} — ${payModal?.name || ""}`}>
        <div className="space-y-3">
          <input type="number" placeholder={label.amount} value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          <select value={payMethod} onChange={(e) => setPayMethod(e.target.value as any)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value="cash">{label.cash}</option>
            <option value="check">{label.check}</option>
            <option value="transfer">{label.transfer}</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setPayModal(null)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm">{label.cancel}</button>
            <button onClick={recordPayment} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">{label.save}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
