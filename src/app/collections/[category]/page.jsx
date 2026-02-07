import CollectionPage from "@/components/pages/CollectionPage";
import { getBaseUrl } from "@/lib/api";

export async function generateMetadata({ params }) {
  const categorySlug = params?.category ? String(params.category) : "";
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/categories?slug=${categorySlug}`, {
    next: { tags: ["categories"] },
  });

  const data = response.ok ? await response.json() : { categories: [] };
  const currentCategory = data.categories?.[0];

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

export default async function Page({ params }) {
  const categorySlug = params?.category ? String(params.category) : "";
  const baseUrl = getBaseUrl();

  const [categoriesRes, categoryRes, productsRes, maxPriceRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { next: { tags: ["categories"] } }),
    fetch(`${baseUrl}/api/categories?slug=${categorySlug}`, { next: { tags: ["categories"] } }),
    fetch(`${baseUrl}/api/products?category=${categorySlug}&page=1&limit=12`, {
      next: { tags: ["products"] },
    }),
    fetch(`${baseUrl}/api/products?category=${categorySlug}&sort=price_desc&limit=1`, {
      next: { tags: ["products"] },
    }),
  ]);

  const categoriesData = categoriesRes.ok ? await categoriesRes.json() : { categories: [] };
  const categoryData = categoryRes.ok ? await categoryRes.json() : { categories: [] };
  const productsData = productsRes.ok ? await productsRes.json() : { products: [], total: 0 };
  const maxPriceData = maxPriceRes.ok ? await maxPriceRes.json() : { products: [] };

  const currentCategory = categoryData.categories?.[0] || null;
  const maxPrice = maxPriceData.products?.[0]?.price || 0;

  return (
    <CollectionPage
      categorySlug={categorySlug}
      currentCategory={currentCategory}
      categories={categoriesData.categories || []}
      initialProducts={productsData.products || []}
      initialTotal={productsData.total || 0}
      initialMaxPrice={maxPrice}
    />
  );
}
