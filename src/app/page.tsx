import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import JsonLd from "@/components/JsonLd/JsonLd";
import Mirage from "@/components/Mirage/Mirage";
import { siteConfig, whatsappLink } from "@/lib/site";
import styles from "./page.module.css";

const steps = [
  { title: "Choisissez", text: "Une gamme et vos envies." },
  { title: "Remplissez", text: "Le formulaire de demande." },
  { title: "Recevez un devis", text: "Réponse rapide par WhatsApp ou Instagram." },
  { title: "Savourez", text: "Retrait ou livraison à la date choisie." },
];

export default function Home() {
  const categories = getCategories();
  const featured = getFeaturedProducts();
  const whatsapp = whatsappLink("Bonjour, je souhaite passer une commande.");

  const sameAs = [siteConfig.instagram, siteConfig.facebook].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Layer cakes, tartes personnalisées et plateaux salés sur commande.",
    ...(siteConfig.city && { areaServed: siteConfig.city }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <section className={`container ${styles.hero}`}>
        <h1>Des gâteaux faits main, pensés pour vos moments</h1>
        <p>
          Layer cakes, tartes personnalisées et buffets salés pour vos anniversaires,
          mariages et événements.
        </p>
        <div className={styles.actions}>
          <Link href="/commander" className="btn">
            Demander un devis
          </Link>
          <a href="#creations" className="btn btn-outline">
            Voir les créations
          </a>
        </div>
      </section>

      <section id="creations" className="container reveal">
        <h2 className={styles.title}>Nos créations</h2>
        <div className={`${styles.grid} ${styles.c3}`}>
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className={styles.category}>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <span className={styles.more}>Découvrir →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container reveal">
        <h2 className={styles.title}>Nos incontournables</h2>
        <div className={`${styles.grid} ${styles.c3}`}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container reveal">
        <h2 className={styles.title}>Commander en 4 étapes</h2>
        <ol className={`${styles.grid} ${styles.c4} ${styles.steps}`}>
          {steps.map((s) => (
            <li key={s.title} className={styles.step}>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container reveal">
        <Mirage>
          <h2>Un événement en préparation ?</h2>
          <p>Pensez à commander quelques jours à l&apos;avance.</p>
          <div className={styles.actions}>
            <Link href="/commander" className="btn">
              Remplir le formulaire
            </Link>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                WhatsApp
              </a>
            )}
          </div>
        </Mirage>
      </section>
    </main>
  );
}
