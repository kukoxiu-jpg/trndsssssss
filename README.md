# Trans Pile à l'Heure — ERP-lite pour PME algériennes

## Statut du build

- Etape 1 — Landing page (FR/AR) : app/page.tsx
- Etape 2 — Layout dashboard (sidebar + topbar + KPI cards + graphique) : app/dashboard/layout.tsx, app/dashboard/page.tsx
- Etape 3 — Couche localStorage + seed data : lib/db.ts, lib/seed.ts
- Etape 4 — Module Stock/Inventaire : app/dashboard/stock/page.tsx
- Etape 5 — Clients & Fournisseurs : app/dashboard/clients/page.tsx, app/dashboard/suppliers/page.tsx
- A venir : Facturation (devis -> BL -> facture), Caisse, Dettes/Creances, Statistiques, Conformite fiscale (TVA, timbre, etat 104)

## Demarrage

npm install
npm run dev

Ouvrir http://localhost:3000 pour la landing page, http://localhost:3000/dashboard pour l'espace de gestion.
