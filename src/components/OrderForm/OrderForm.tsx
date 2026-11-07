"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MAX_PHOTOS,
  MIN_LEAD_DAYS,
  emptyOrder,
  validateOrder,
  type OrderErrors,
  type OrderInput,
  type OrderPhoto,
} from "@/lib/order";
import { photoToJpeg } from "@/lib/photo";
import { whatsappLink } from "@/lib/site";
import styles from "./OrderForm.module.css";

export interface OrderChoiceOption {
  id: string;
  name: string;
}

// Créations du catalogue : sert à pré-remplir le formulaire depuis le bouton « Commander » d'une carte.
export interface OrderModel {
  id: string;
  name: string;
  category: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function OrderForm({ choices, models }: { choices: OrderChoiceOption[]; models: OrderModel[] }) {
  const params = useSearchParams();
  const model = models.find((m) => m.id === params.get("produit"));

  const [order, setOrder] = useState<OrderInput>({
    ...emptyOrder,
    productId: model && choices.some((c) => c.id === model.category) ? model.category : "",
    request: model ? `Modèle choisi : ${model.name}` : "",
  });
  const [photos, setPhotos] = useState<OrderPhoto[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const choice = choices.find((c) => c.id === order.productId);

  function update<K extends keyof OrderInput>(key: K, value: OrderInput[K]) {
    setOrder((o) => ({ ...o, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onPickPhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
    event.target.value = "";
    if (files.length === 0) return;

    setPhotoError("");
    const added: OrderPhoto[] = [];
    for (const file of files) {
      try {
        added.push(await photoToJpeg(file));
      } catch {
        setPhotoError("Une photo n'a pas pu être lue (utilisez un JPG, PNG ou WebP).");
      }
    }
    setPhotos((current) => [...current, ...added].slice(0, MAX_PHOTOS));
  }

  function whatsappHref(): string | null {
    const lines = [
      "Bonjour, je souhaite passer une commande :",
      choice ? `Type : ${choice.name}` : "",
      order.request ? `Demande : ${order.request}` : "",
      order.date ? `Date souhaitée : ${order.date}` : "",
      order.guests ? `Nombre de personnes : ${order.guests}` : "",
      `Mode : ${order.delivery === "livraison" ? "livraison" : "retrait"}`,
      order.allergies ? `Allergies : ${order.allergies}` : "",
      order.name ? `Nom : ${order.name}` : "",
    ].filter(Boolean);
    return whatsappLink(lines.join("\n"));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validateOrder(order);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, photos }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? "Une erreur est survenue.");
      setStatus("error");
    } catch {
      setServerError("Connexion impossible. Réessayez ou utilisez WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h2>Merci, votre demande est bien envoyée !</h2>
        <p>Je reviens vers vous rapidement avec un devis, par téléphone, WhatsApp ou Instagram.</p>
      </div>
    );
  }

  const whatsapp = whatsappHref();
  const field = (key: keyof OrderInput) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  const error = (key: keyof OrderInput) =>
    errors[key] ? (
      <span id={`${key}-error`} className={styles.error}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <fieldset>
        <legend>Votre commande</legend>

        <label>
          Type de commande *
          <select value={order.productId} onChange={(e) => update("productId", e.target.value)} {...field("productId")}>
            <option value="">Choisir…</option>
            {choices.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {error("productId")}
        </label>

        <label>
          Votre demande
          <textarea
            rows={3}
            value={order.request}
            onChange={(e) => update("request", e.target.value)}
            placeholder="Ex. : layer cake, tartes, mini-pizzas… dites-nous simplement ce qu'il vous faut."
            {...field("request")}
          />
          {error("request")}
        </label>

        <div className={styles.photos}>
          <span className={styles.photosTitle}>Photo d&apos;un modèle (facultatif)</span>
          <label className={`btn btn-outline ${styles.upload}`}>
            Importer une photo
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onPickPhotos}
              disabled={photos.length >= MAX_PHOTOS}
              className={styles.fileInput}
            />
          </label>
          {photos.length > 0 && (
            <ul className={styles.thumbs}>
              {photos.map((p, i) => (
                <li key={`${p.name}-${i}`} className={styles.thumb}>
                  <Image src={`data:image/jpeg;base64,${p.data}`} alt={`Modèle ${i + 1}`} width={72} height={72} unoptimized />
                  <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Retirer la photo ${i + 1}`}
                    onClick={() => setPhotos((current) => current.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          {photoError && (
            <span className={styles.error} role="alert">
              {photoError}
            </span>
          )}
          <p className={styles.hint}>Jusqu&apos;à {MAX_PHOTOS} photos. Sur WhatsApp, envoyez-les directement dans la conversation.</p>
        </div>

        <div className={styles.row}>
          <label>
            Date souhaitée *
            <input
              type="date"
              value={order.date}
              onChange={(e) => update("date", e.target.value)}
              {...field("date")}
            />
            {error("date")}
          </label>
          <label>
            Nombre de personnes *
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              value={order.guests}
              onChange={(e) => update("guests", e.target.value)}
              {...field("guests")}
            />
            {error("guests")}
          </label>
        </div>
        <p className={styles.hint}>Commande au moins {MIN_LEAD_DAYS} jours à l&apos;avance.</p>

        <div className={styles.choices} role="radiogroup" aria-label="Retrait ou livraison">
          <label className={styles.inline}>
            <input
              type="radio"
              name="delivery"
              checked={order.delivery === "retrait"}
              onChange={() => update("delivery", "retrait")}
            />
            Retrait sur place
          </label>
          <label className={styles.inline}>
            <input
              type="radio"
              name="delivery"
              checked={order.delivery === "livraison"}
              onChange={() => update("delivery", "livraison")}
            />
            Livraison
          </label>
        </div>

        {order.delivery === "livraison" && (
          <label>
            Adresse de livraison *
            <input
              type="text"
              autoComplete="street-address"
              value={order.address}
              onChange={(e) => update("address", e.target.value)}
              {...field("address")}
            />
            {error("address")}
          </label>
        )}

        <label>
          Allergies ou régimes particuliers
          <textarea rows={2} value={order.allergies} onChange={(e) => update("allergies", e.target.value)} {...field("allergies")} />
          {error("allergies")}
        </label>
      </fieldset>

      <fieldset>
        <legend>Vos coordonnées</legend>

        <label>
          Nom *
          <input type="text" autoComplete="name" value={order.name} onChange={(e) => update("name", e.target.value)} {...field("name")} />
          {error("name")}
        </label>

        <div className={styles.row}>
          <label>
            Téléphone *
            <input type="tel" autoComplete="tel" value={order.phone} onChange={(e) => update("phone", e.target.value)} {...field("phone")} />
            {error("phone")}
          </label>
          <label>
            Instagram (facultatif)
            <input
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="@moncompte"
              value={order.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              {...field("instagram")}
            />
            {error("instagram")}
          </label>
        </div>
      </fieldset>

      {/* Champ piège anti-spam : invisible pour les humains */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Ne pas remplir
          <input type="text" tabIndex={-1} autoComplete="off" value={order.website} onChange={(e) => update("website", e.target.value)} />
        </label>
      </div>

      {status === "error" && (
        <p className={styles.serverError} role="alert">
          {serverError}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </button>
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Envoyer via WhatsApp
          </a>
        )}
      </div>
      <p className={styles.hint}>
        Vos informations servent uniquement à répondre à votre demande. Il ne s&apos;agit pas d&apos;un paiement : un devis vous sera envoyé.
      </p>
    </form>
  );
}
