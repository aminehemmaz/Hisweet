import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/StaticPage/StaticPage";

export const metadata: Metadata = {
  title: "À propos | Hisweet",
  description: "Découvrez Hisweet : pâtisserie faite maison, layer cakes, tartes, pièces montées, salés et mignardises pour vos événements.",
};

export default function AProposPage() {
  return (
    <StaticPage title="À propos" intro="Une pâtisserie artisanale, pensée pour vos moments.">
      <p>
        Chez Hisweet, chaque gâteau est préparé à la main, sur commande. Layer cakes aux étages
        moelleux, tartes personnalisées, plateaux salés pour vos réceptions : tout est conçu
        avec vous, selon vos envies et votre événement.
      </p>

      <h2>Nos engagements</h2>
      <ul>
        <li>Des créations faites maison, sur commande.</li>
        <li>Des ingrédients de qualité.</li>
        <li>Une personnalisation complète : parfums, taille, décoration, message.</li>
      </ul>

      <p>
        <Link href="/commander" className="btn">
          Demander un devis
        </Link>
      </p>
    </StaticPage>
  );
}
