import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage/StaticPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Hisweet",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <StaticPage title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        {legal.publisher} — contact : {legal.email}
      </p>

      <h2>Données collectées</h2>
      <p>
        Lorsque vous remplissez le formulaire de commande, nous collectons : nom, numéro de
        téléphone, identifiant Instagram (facultatif), détails de votre commande (type, date,
        nombre de personnes, demande, allergies éventuelles, adresse si livraison) et, si vous
        le souhaitez, une ou plusieurs photos de modèle.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données servent uniquement à répondre à votre demande, établir un devis et préparer
        votre commande (exécution de mesures précontractuelles ou du contrat).
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont transmises par e-mail via notre prestataire d&apos;envoi (Resend) et ne
        sont ni vendues ni cédées à des tiers à des fins commerciales.
      </p>

      <h2>Durée de conservation</h2>
      <p>[À compléter : par exemple 3 ans après le dernier contact.]</p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données, et
        vous opposer à leur traitement, en écrivant à {legal.email}. Vous pouvez aussi saisir la
        CNIL (cnil.fr).
      </p>

      <h2>Cookies et suivi</h2>
      <p>
        Ce site n&apos;utilise actuellement aucun cookie de suivi ni outil de mesure
        d&apos;audience.
      </p>
    </StaticPage>
  );
}
