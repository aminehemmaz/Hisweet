import CategoryView, { getCategoryMetadata } from "@/components/CategoryView/CategoryView";

export const metadata = getCategoryMetadata("tartes");

export default function Page() {
  return <CategoryView slug="tartes" />;
}
