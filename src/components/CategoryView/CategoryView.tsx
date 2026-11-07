import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import JsonLd from "@/components/JsonLd/JsonLd";
import Mirage from "@/components/Mirage/Mirage";
import { getCategory, getProductsByCategory } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import type { CategorySlug } from "@/types/product";
import styles from "./CategoryView.module.css";

export function getCategoryMetadata(slug: CategorySlug) {
  const category = getCategory(slug);
  if (!category) notFound();
  return {
    title: `${category.name} sur mesure | Hisweet`,
    description: category.description,
  };
}

export default function CategoryView({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        ...(p.images[0] && { image: `${siteConfig.url}${p.images[0].src}` }),
      },
    })),
  };

  return (
    <main className="container">
      <JsonLd data={jsonLd} />
      <header className={styles.head}>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className={styles.empty}>Les créations arrivent bientôt.</p>
      )}

      <div className="reveal">
        <Mirage>
          <h2>Une envie particulière ?</h2>
          <p>Tout se personnalise. Décrivez votre projet et recevez un devis.</p>
          <Link href="/commander" className="btn">
            Demander un devis
          </Link>
        </Mirage>
      </div>
    </main>
  );
}
