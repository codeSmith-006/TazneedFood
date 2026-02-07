import ProductPage from "@/components/pages/ProductPage";
import { getBaseUrl } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug ? String(rawSlug) : "";
  const baseUrl = await getBaseUrl();

  const productRes = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 60, tags: ["products"] },
  });

  if (!productRes.ok) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const { product } = await productRes.json();

  return {
    title: `${product.name} | TanzeenFood - Premium Natural Products`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function Page({ params }) {
  const { slug: rawSlug, category: rawCategory } = await params;
  const slug = rawSlug ? String(rawSlug) : "";
  const categorySlug = rawCategory ? String(rawCategory) : "";
  const baseUrl = await getBaseUrl();

  const [productRes, categoryRes, relatedRes] = await Promise.all([
    fetch(`${baseUrl}/api/products/${slug}`, { next: { revalidate: 60, tags: ["products"] } }),
    fetch(`${baseUrl}/api/categories?slug=${categorySlug}`, { next: { revalidate: 60, tags: ["categories"] } }),
    fetch(`${baseUrl}/api/products?category=${categorySlug}&limit=8`, { next: { revalidate: 60, tags: ["products"] } }),
  ]);

  const productData = productRes.ok ? await productRes.json() : null;
  const categoryData = categoryRes.ok ? await categoryRes.json() : { categories: [] };
  const relatedData = relatedRes.ok ? await relatedRes.json() : { products: [] };

  const product = productData?.product || null;
  const currentCategory = categoryData.categories?.[0] || null;
  const relatedProducts = (relatedData.products || []).filter((item) => item.id !== product?.id).slice(0, 4);

  return (
    <ProductPage product={product} currentCategory={currentCategory} relatedProducts={relatedProducts} />
  );
}
