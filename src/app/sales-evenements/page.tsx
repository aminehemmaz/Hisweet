import CategoryView, { getCategoryMetadata } from "@/components/CategoryView/CategoryView";

export const metadata = getCategoryMetadata("sales-evenements");

export default function Page() {
  return <CategoryView slug="sales-evenements" />;
}
