import CategoryView, { getCategoryMetadata } from "@/components/CategoryView/CategoryView";

export const metadata = getCategoryMetadata("layer-cakes");

export default function Page() {
  return <CategoryView slug="layer-cakes" />;
}
