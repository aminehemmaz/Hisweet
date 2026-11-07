// Informations légales lues depuis les variables d'environnement (.env.local, non commité) :
// le dépôt est public, aucune donnée personnelle ou d'identité n'est écrite en dur.

const TODO = "[À compléter]";

const or = (value: string | undefined) => (value && value.trim() ? value.trim() : TODO);

export const legal = {
  publisher: or(process.env.NEXT_PUBLIC_LEGAL_NAME),
  status: or(process.env.NEXT_PUBLIC_LEGAL_STATUS), // ex: Entrepreneur individuel, SAS…
  siret: or(process.env.NEXT_PUBLIC_LEGAL_SIRET),
  address: or(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
  email: or(process.env.NEXT_PUBLIC_LEGAL_EMAIL),
  phone: or(process.env.NEXT_PUBLIC_LEGAL_PHONE),
  hostName: or(process.env.NEXT_PUBLIC_HOST_NAME), // hébergeur : à renseigner après le choix
  hostAddress: or(process.env.NEXT_PUBLIC_HOST_ADDRESS),
  mediator: or(process.env.NEXT_PUBLIC_MEDIATOR), // médiateur de la consommation
};
