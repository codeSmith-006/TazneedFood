import IndexPage from "@/components/pages/IndexPage";
import { getBaseUrl } from "@/lib/api";

export const metadata = {
  title: "TanzeenFood - Premium Natural Products | Honey, Ghee, Oil, Dates",
  description:
    "Shop premium organic products including raw honey, pure ghee, natural oils, and dates. Quality you can trust, delivered to your doorstep.",
  openGraph: {
    title: "TanzeenFood - Premium Natural Products",
    description: "Shop premium organic products including raw honey, pure ghee, natural oils, and dates.",
    type: "website",
  },
};

export default async function Page() {
  const baseUrl = getBaseUrl();

  const [categoriesRes, allProductsRes, bestSellersRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { next: { tags: ["categories"] } }),
    fetch(`${baseUrl}/api/products?limit=12`, { next: { tags: ["products"] } }),
    fetch(`${baseUrl}/api/products?isBestSeller=true&limit=8`, { next: { tags: ["products"] } }),
  ]);

  const categoriesData = categoriesRes.ok ? await categoriesRes.json() : { categories: [] };
  const allProductsData = allProductsRes.ok ? await allProductsRes.json() : { products: [] };
  const bestSellersData = bestSellersRes.ok ? await bestSellersRes.json() : { products: [] };

  console.log(categoriesData)
  console.log("allProductsData", allProductsData)

  return (
    <IndexPage
      categories={categoriesData.categories || []}
      allProducts={allProductsData.products || []}
      bestSellers={bestSellersData.products || []}
    />
  );
}
