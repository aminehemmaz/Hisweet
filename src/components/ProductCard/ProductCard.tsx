import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  headingLevel: Heading = "h3",
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
}) {
  const image = product.images[0];

  return (
    <article className={`${styles.card} reveal`}>
      {/* Cadre de taille identique pour toutes les cartes : la photo y est affichée en entier (rien n'est rogné),
          sur un fond flou formé de la même photo. */}
      <div className={styles.media}>
        {image ? (
          <>
            <Image src={image.src} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 33vw, 100vw" className={styles.bg} />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className={styles.img}
            />
          </>
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            Photo à venir
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Heading>{product.name}</Heading>
        <p className={styles.desc}>{product.description}</p>
        <p className={styles.price}>Prix sur devis</p>
        <Link
          href={`/commander?produit=${encodeURIComponent(product.id)}`}
          className="btn btn-outline"
        >
          Commander
        </Link>
      </div>
    </article>
  );
}
