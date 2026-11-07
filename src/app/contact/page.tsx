import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/StaticPage/StaticPage";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Hisweet",
  description: "Contactez Hisweet pour une commande, un devis ou une question.",
};

export default function ContactPage() {
  const whatsapp = whatsappLink("Bonjour, j'ai une question.");

  return (
    <StaticPage title="Contact" intro="Une question, un projet, un événement à préparer ?">
      <p>
        Le plus simple pour commander est de remplir le formulaire : vous recevrez un devis
        rapidement.
      </p>
      <p>
        <Link href="/commander" className="btn">
          Demander un devis
        </Link>
      </p>

      <h2>Autres moyens de nous joindre</h2>
      <ul>
        {whatsapp && (
          <li>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        )}
        {siteConfig.instagram && (
          <li>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        )}
        {siteConfig.facebook && (
          <li>
            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
        )}
        {!whatsapp && !siteConfig.instagram && !siteConfig.facebook && (
          <li>Utilisez le formulaire de commande.</li>
        )}
      </ul>

      {siteConfig.city && (
        <>
          <h2>Zone</h2>
          <p>{siteConfig.city}</p>
        </>
      )}
    </StaticPage>
  );
}
