import CollectionPage from "@/components/pages/CollectionPage";
import { getCategoryBySlug } from "@/lib/data";

export function generateMetadata({ params }) {
  const category = params?.category ? String(params.category) : "";
  const currentCategory = getCategoryBySlug(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for doesn't exist.",
    };
  }

  return {
    title: `${currentCategory.name} | TanzeenFood - Premium Natural Products`,
    description: `Shop ${currentCategory.name} - ${currentCategory.description}. Premium quality organic products at TanzeenFood.`,
    openGraph: {
      title: `${currentCategory.name} | TanzeenFood`,
      description: currentCategory.description,
    },
  };
}

export default function Page() {
  return <CollectionPage />;
}
