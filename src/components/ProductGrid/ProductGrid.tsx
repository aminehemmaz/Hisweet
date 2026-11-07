"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/types/product";
import styles from "./ProductGrid.module.css";

const STEP = 12;

// Affiche les créations par paquets de 12 : la page reste légère et rapide, même avec beaucoup de photos.
export default function ProductGrid({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(STEP);
  const shown = products.slice(0, visible);
  const remaining = products.length - shown.length;

  return (
    <>
      <div className={styles.grid}>
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} headingLevel="h2" />
        ))}
      </div>
      {remaining > 0 && (
        <div className={styles.more}>
          <button type="button" className="btn btn-outline" onClick={() => setVisible((v) => v + STEP)}>
            Voir plus de créations ({remaining})
          </button>
        </div>
      )}
    </>
  );
}
