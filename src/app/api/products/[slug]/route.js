import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const slug = params?.slug ? String(params.slug) : "";

    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const normalized = {
      id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      category: product.category?.toString(),
      categorySlug: product.categorySlug,
      price: product.price,
      oldPrice: product.oldPrice,
      description: product.description || "",
      details: product.details || [],
      images: product.images || [],
      inStock: Boolean(product.inStock),
      isBestSeller: Boolean(product.isBestSeller),
      isOffer: Boolean(product.isOffer),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json({ product: normalized });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}
