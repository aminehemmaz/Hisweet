import type { Metadata } from "next";
import { Suspense } from "react";
import OrderForm from "@/components/OrderForm/OrderForm";
import { getOrderChoices, getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Commander ou demander un devis | Hisweet",
  description: "Décrivez votre projet de layer cake, tarte ou plateau salé et recevez un devis.",
};

export default function CommanderPage() {
  const choices = getOrderChoices();
  const models = getProducts().map((p) => ({ id: p.id, name: p.name, category: p.category }));

  return (
    <main className="container" style={{ maxWidth: 720, paddingBottom: 24 }}>
      <header style={{ padding: "48px 0 24px", textAlign: "center" }}>
        <h1>Commander</h1>
        <p style={{ marginTop: 12 }}>
          Remplissez ce formulaire : je vous réponds avec un devis. Aucun paiement n&apos;est demandé ici.
        </p>
      </header>
      {/* Hauteur réservée pour éviter un décalage du pied de page au chargement du formulaire */}
      <Suspense fallback={<div style={{ minHeight: 1500 }} aria-busy="true" />}>
        <OrderForm choices={choices} models={models} />
      </Suspense>
    </main>
  );
}
