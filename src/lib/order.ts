// Validation partagée entre le formulaire (client) et la route API (serveur).

export const MIN_LEAD_DAYS = Number(process.env.NEXT_PUBLIC_MIN_LEAD_DAYS) || 3;

// Photos de modèle jointes à la demande (facultatives). Le navigateur les réduit et les convertit en JPEG
// avant l'envoi ; le serveur n'accepte que du JPEG.
export const MAX_PHOTOS = 3;
export const MAX_PHOTO_BYTES = 1_500_000; // par photo, après réduction

export interface OrderPhoto {
  name: string;
  data: string; // JPEG encodé en base64, sans préfixe « data: »
}

export interface OrderInput {
  name: string;
  phone: string;
  instagram: string; // facultatif
  productId: string; // type de commande (voir getOrderChoices)
  request: string; // demande libre
  date: string; // AAAA-MM-JJ
  guests: string;
  delivery: "retrait" | "livraison";
  address: string;
  allergies: string;
  website: string; // champ piège anti-spam : doit rester vide
}

export type OrderErrors = Partial<Record<keyof OrderInput, string>>;

export const emptyOrder: OrderInput = {
  name: "",
  phone: "",
  instagram: "",
  productId: "",
  request: "",
  date: "",
  guests: "",
  delivery: "retrait",
  address: "",
  allergies: "",
  website: "",
};

const MAX = { short: 120, long: 1500 };

export function minOrderDate(from: Date = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + MIN_LEAD_DAYS);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function validateOrder(o: OrderInput): OrderErrors {
  const e: OrderErrors = {};

  if (!o.name.trim()) e.name = "Indiquez votre nom.";
  else if (o.name.length > MAX.short) e.name = "Nom trop long.";

  if (!/^[+\d][\d\s.()-]{7,19}$/.test(o.phone.trim())) e.phone = "Numéro de téléphone invalide.";

  // Instagram : facultatif, « @pseudo », « pseudo » ou lien du profil
  if (o.instagram && !/^[\w@.\-/:?=&%]{1,100}$/.test(o.instagram.trim()))
    e.instagram = "Indiquez votre pseudo (ex. @moncompte).";

  if (!o.productId) e.productId = "Choisissez un type de commande.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(o.date)) e.date = "Choisissez une date.";
  else if (o.date < minOrderDate())
    e.date = `Merci de commander au moins ${MIN_LEAD_DAYS} jours à l'avance.`;

  const guests = Number(o.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 500)
    e.guests = "Indiquez un nombre de personnes (1 à 500).";

  if (o.delivery === "livraison" && !o.address.trim()) e.address = "Indiquez l'adresse de livraison.";

  if (o.address.length > MAX.short) e.address = "Texte trop long.";
  for (const key of ["request", "allergies"] as const) {
    if (o[key].length > MAX.long) e[key] = "Texte trop long.";
  }

  return e;
}
