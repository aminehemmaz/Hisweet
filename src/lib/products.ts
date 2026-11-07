import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, CategorySlug, Product } from "@/types/product";

const categories = categoriesData as Category[];
const products = productsData as Product[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export interface OrderChoice {
  id: string;
  name: string;
}

// Types de commande proposés dans le formulaire : volontairement généraux (les détails vont dans la demande).
export function getOrderChoices(): OrderChoice[] {
  return [
    ...categories.map((c) => ({ id: c.slug as string, name: c.name })),
    { id: "mignardises", name: "Mignardises (cupcakes, cake pops, biscuits)" },
    { id: "autre", name: "Autre ou plusieurs types" },
  ];
}

export function getOrderChoice(id: string): OrderChoice | undefined {
  return getOrderChoices().find((c) => c.id === id);
}
