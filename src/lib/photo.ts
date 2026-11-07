import { MAX_PHOTO_BYTES, type OrderPhoto } from "@/lib/order";

// Réduit une photo (1600 px max) et la convertit en JPEG léger, prêt à être joint à la demande.
// À appeler uniquement dans le navigateur.
export async function photoToJpeg(file: File): Promise<OrderPhoto> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas indisponible");
  ctx.fillStyle = "#fff"; // fond blanc pour les PNG transparents
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = 0.85;
  let blob: Blob | null = null;
  while (quality > 0.3) {
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (blob && blob.size <= MAX_PHOTO_BYTES) break;
    quality -= 0.15;
  }
  if (!blob || blob.size > MAX_PHOTO_BYTES) throw new Error("photo trop lourde");

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

  return { name: file.name.slice(0, 60), data: dataUrl.split(",")[1] ?? "" };
}
