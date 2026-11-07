import { Resend } from "resend";
import { getOrderChoice } from "@/lib/products";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, emptyOrder, validateOrder, type OrderInput } from "@/lib/order";

// Limitation simple par IP (en mémoire, par instance) : freine les abus sans service externe.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 6_000_000;
const hits = new Map<string, number[]>();

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function parseOrder(src: Record<string, unknown>): OrderInput {
  const order = { ...emptyOrder };
  for (const key of Object.keys(emptyOrder) as (keyof OrderInput)[]) {
    const value = src[key];
    if (typeof value === "string") (order[key] as string) = value.trim();
  }
  if (order.delivery !== "livraison") order.delivery = "retrait";
  return order;
}

// Photos de modèle : JPEG uniquement (le navigateur les convertit), 3 maximum, taille limitée.
// Renvoie null si une photo est invalide.
function parsePhotos(src: Record<string, unknown>): { filename: string; content: Buffer }[] | null {
  const raw = src.photos;
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > MAX_PHOTOS) return null;

  const files: { filename: string; content: Buffer }[] = [];
  for (const item of raw) {
    const data = (item as { data?: unknown } | null)?.data;
    if (typeof data !== "string" || data.length > MAX_PHOTO_BYTES * 1.4 || !/^[A-Za-z0-9+/]+=*$/.test(data)) return null;
    const content = Buffer.from(data, "base64");
    const isJpeg = content.length > 3 && content[0] === 0xff && content[1] === 0xd8 && content[2] === 0xff;
    if (!isJpeg || content.length > MAX_PHOTO_BYTES) return null;
    files.push({ filename: `modele-${files.length + 1}.jpg`, content });
  }
  return files;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyRequests(ip)) {
    return Response.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "Les photos sont trop volumineuses." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  const src = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;

  const order = parseOrder(src);

  // Champ piège rempli = robot : on répond OK sans rien envoyer.
  if (order.website) return Response.json({ ok: true });

  const errors = validateOrder(order);
  const choice = getOrderChoice(order.productId);
  if (!choice) errors.productId = "Type de commande inconnu.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Formulaire invalide.", errors }, { status: 422 });
  }

  const photos = parsePhotos(src);
  if (!photos) {
    return Response.json({ error: "Photo invalide : utilisez des images JPG, PNG ou WebP (3 maximum)." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY ou ORDER_TO_EMAIL manquant.");
    return Response.json({ error: "Envoi indisponible pour le moment. Utilisez WhatsApp." }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Nom", order.name],
    ["Téléphone", order.phone],
    ["Instagram", order.instagram || "—"],
    ["Type de commande", choice!.name],
    ["Demande", order.request || "—"],
    ["Photos de modèle", photos.length ? `${photos.length} en pièce jointe` : "—"],
    ["Date souhaitée", order.date],
    ["Nombre de personnes", order.guests],
    ["Mode", order.delivery === "livraison" ? `Livraison : ${order.address}` : "Retrait"],
    ["Allergies", order.allergies || "—"],
  ];

  const html = `<h2>Nouvelle demande de commande</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k} : ${v}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.ORDER_FROM_EMAIL || "Hisweet <onboarding@resend.dev>",
      to,
      subject: `Demande de commande : ${choice!.name} (${order.date})`,
      html,
      text,
      ...(photos.length > 0 && { attachments: photos }),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Échec envoi e-mail :", err instanceof Error ? err.message : err);
    return Response.json({ error: "L'envoi a échoué. Réessayez ou utilisez WhatsApp." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
