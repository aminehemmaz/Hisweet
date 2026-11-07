export type CategorySlug = "layer-cakes" | "tartes" | "sales-evenements";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ProductImage {
  src: string; // chemin sous /public, ex: "/images/layer-cakes/framboise.webp"
  alt: string;
  width: number; // dimensions réelles de la photo : la carte reprend son format, sans la rogner
  height: number;
}

// Pas de prix : chaque création est chiffrée sur devis, selon la demande du client.
export interface Product {
  id: string;
  category: CategorySlug;
  name: string;
  description: string;
  featured: boolean;
  images: ProductImage[];
}
