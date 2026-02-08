import AllProductsPage from "@/components/pages/AllProductsPage";
import { getBaseUrl } from "@/lib/api";

export const metadata = {
  title: "All Products | TanzeenFood",
  description: "Browse all products available at TanzeenFood.",
};

export default async function Page() {
  const baseUrl = await getBaseUrl();

  const [categoriesRes, productsRes, maxPriceRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { next: { revalidate: 60, tags: ["categories"] } }),
    fetch(`${baseUrl}/api/products?limit=12`, { next: { revalidate: 60, tags: ["products"] } }),
    fetch(`${baseUrl}/api/products?sort=price_desc&limit=1`, { next: { revalidate: 60, tags: ["products"] } }),
  ]);

  const categoriesData = categoriesRes.ok ? await categoriesRes.json() : { categories: [] };
  const productsData = productsRes.ok ? await productsRes.json() : { products: [], total: 0 };
  const maxPriceData = maxPriceRes.ok ? await maxPriceRes.json() : { products: [] };
  const maxPrice = maxPriceData.products?.[0]?.price || 0;

  return (
    <AllProductsPage
      categories={categoriesData.categories || []}
      initialProducts={productsData.products || []}
      initialTotal={productsData.total || 0}
      initialMaxPrice={maxPrice}
    />
  );
}
