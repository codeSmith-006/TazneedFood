import ProductPage from "@/components/pages/ProductPage";
import { getProductBySlug } from "@/lib/data";

export function generateMetadata({ params }) {
  const slug = params?.slug ? String(params.slug) : "";
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  return {
    title: `${product.name} | TanzeenFood`,
    description: product.description,
    openGraph: {
      title: `${product.name} | TanzeenFood`,
      description: product.description,
      images: product.images?.length ? [product.images[0]] : undefined,
      type: "website",
    },
  };
}

export default function Page() {
  return <ProductPage />;
}
