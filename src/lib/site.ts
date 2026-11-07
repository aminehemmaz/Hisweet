// Les coordonnées viennent de variables d'environnement (.env.local, non commité)
// car le dépôt est public : aucune donnée personnelle en dur ici.

export const siteConfig = {
  name: "Hisweet",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  city: process.env.NEXT_PUBLIC_CITY ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // format international sans +, ex: 33600000000
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
};

export const navLinks = [
  { href: "/layer-cakes", label: "Layer cakes" },
  { href: "/tartes", label: "Tartes" },
  { href: "/sales-evenements", label: "Salés & événements" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
];

export function whatsappLink(message?: string): string | null {
  if (!siteConfig.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsapp}${text}`;
}
