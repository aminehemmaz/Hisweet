import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage/StaticPage";
import { legal } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | Hisweet",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <StaticPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom / raison sociale : {legal.publisher}</li>
        <li>Statut : {legal.status}</li>
        <li>SIRET : {legal.siret}</li>
        <li>Adresse : {legal.address}</li>
        <li>E-mail : {legal.email}</li>
        <li>Téléphone : {legal.phone}</li>
      </ul>
      <p>Directeur de la publication : {legal.publisher}</p>

      <h2>Hébergeur</h2>
      <ul>
        <li>Nom : {legal.hostName}</li>
        <li>Adresse : {legal.hostAddress}</li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, photographies, logos et créations présentés sur {siteConfig.name} sont
        protégés par le droit d&apos;auteur. Toute reproduction sans autorisation écrite est
        interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les photographies sont non contractuelles. Les prix et informations affichés sont donnés
        à titre indicatif ; seul le devis accepté engage les parties.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans la page « Confidentialité ».
      </p>
    </StaticPage>
  );
}
