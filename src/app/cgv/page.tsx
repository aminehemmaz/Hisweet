import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage/StaticPage";
import { MIN_LEAD_DAYS } from "@/lib/order";
import { legal } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente | Hisweet",
  robots: { index: false },
};

export default function CgvPage() {
  return (
    <StaticPage title="Conditions générales de vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent les commandes de pâtisseries réalisées sur mesure par{" "}
        {legal.publisher} (« {siteConfig.name} »), à destination de particuliers et de
        professionnels.
      </p>

      <h2>2. Commande et devis</h2>
      <p>
        La commande débute par une demande via le formulaire du site, WhatsApp ou tout autre
        moyen de contact. Un devis est ensuite envoyé. La commande est ferme après acceptation
        du devis et, le cas échéant, paiement de l&apos;acompte. Aucun paiement n&apos;est
        effectué sur le site.
      </p>

      <h2>3. Délais</h2>
      <p>
        Les commandes doivent être passées au moins {MIN_LEAD_DAYS} jours à l&apos;avance. Les
        périodes de forte demande peuvent nécessiter un délai plus long.
      </p>

      <h2>4. Prix et paiement</h2>
      <p>
        Les prix ne sont pas affichés sur le site : chaque création est chiffrée sur devis, selon
        la demande du client (taille, décor, personnalisation, date). Les prix du devis sont en
        euros. Acompte : [À compléter]. Solde : [À compléter : moment et moyens de paiement].
      </p>

      <h2>5. Retrait et livraison</h2>
      <p>
        Retrait : [À compléter : lieu et horaires]. Livraison : [À compléter : zone et tarifs].
        Le client est responsable de la conservation et du transport de la commande après le
        retrait.
      </p>

      <h2>6. Annulation et modification</h2>
      <p>[À compléter : délai et conditions de remboursement de l&apos;acompte.]</p>

      <h2>7. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L221-28 du Code de la consommation, le droit de
        rétractation ne s&apos;applique pas aux biens confectionnés selon les spécifications du
        consommateur ni aux biens susceptibles de se détériorer rapidement.
      </p>

      <h2>8. Allergènes et conservation</h2>
      <p>
        Les créations peuvent contenir du gluten, du lait, des œufs et des fruits à coque, et
        être préparées dans un atelier manipulant ces allergènes. Le client doit signaler toute
        allergie lors de la commande. Les conditions de conservation sont indiquées à la
        remise.
      </p>

      <h2>9. Responsabilité</h2>
      <p>
        Les photographies présentent des réalisations précédentes et sont non contractuelles. Des variations de couleur ou de décor peuvent
        exister sur les créations faites à la main.
      </p>

      <h2>10. Médiation et droit applicable</h2>
      <p>
        En cas de litige, le client peut recourir gratuitement à un médiateur de la
        consommation : {legal.mediator}. Les présentes conditions sont soumises au droit
        français.
      </p>
    </StaticPage>
  );
}
