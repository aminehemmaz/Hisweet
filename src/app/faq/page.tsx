import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/StaticPage/StaticPage";
import { MIN_LEAD_DAYS } from "@/lib/order";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "Questions fréquentes | Hisweet",
  description: "Délais de commande, retrait, livraison, allergènes, conservation : toutes les réponses.",
};

const questions = [
  {
    q: "Combien de temps à l'avance dois-je commander ?",
    a: `Merci de commander au moins ${MIN_LEAD_DAYS} jours à l'avance. Pour les mariages et grands événements, contactez-nous le plus tôt possible.`,
  },
  {
    q: "Comment se passe une commande ?",
    a: "Vous remplissez le formulaire (ou nous écrivez sur WhatsApp), nous vous envoyons un devis, puis la commande est confirmée. Aucun paiement n'est demandé sur le site.",
  },
  {
    q: "Quels sont vos prix ?",
    a: "Chaque création est unique : le prix dépend de la taille, du décor, des parfums et de la date. Il n'est donc pas affiché sur le site, mais communiqué sur devis, gratuitement et sans engagement.",
  },
  {
    q: "Peut-on personnaliser les gâteaux et les tartes ?",
    a: "Oui : parfums, taille, décoration et message peuvent être adaptés. Décrivez votre projet dans le formulaire.",
  },
  {
    q: "Proposez-vous la livraison ?",
    a: "[À compléter : retrait sur place, livraison, zone et tarifs.]",
  },
  {
    q: "Quel acompte et quelles conditions d'annulation ?",
    a: "[À compléter : montant de l'acompte, délai d'annulation.]",
  },
  {
    q: "Et pour les allergies ?",
    a: "Indiquez toute allergie ou régime particulier dans le formulaire. Nos préparations peuvent contenir du gluten, du lait, des œufs et des fruits à coque : la liste des allergènes est précisée pour chaque création.",
  },
  {
    q: "Comment conserver mon gâteau ?",
    a: "[À compléter : conservation au réfrigérateur, sortir X minutes avant dégustation, durée de conservation.]",
  },
];

export default function FaqPage() {
  return (
    <StaticPage title="Questions fréquentes" intro="Les réponses aux questions les plus posées.">
      <div className={styles.list}>
        {questions.map((item) => (
          <details key={item.q} className={styles.item}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <p>
        Une autre question ? <Link href="/contact">Contactez-nous</Link>.
      </p>
    </StaticPage>
  );
}
