import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Les pages légales sont volontairement exclues (noindex).
const paths = ["", "/layer-cakes", "/tartes", "/sales-evenements", "/commander", "/a-propos", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
