import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

const parseBoolean = (value) => {
  if (value === null || value === undefined) return null;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
};


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const filter = {};

    const category = searchParams.get("category");
    if (category) {
      if (category === "offer") {
        filter.isOffer = true;
      } else if (category === "best-seller") {
        filter.isBestSeller = true;
      } else {
        filter.categorySlug = category;
      }
    }

    const isOffer = parseBoolean(searchParams.get("isOffer"));
    if (isOffer !== null) filter.isOffer = isOffer;

    const isBestSeller = parseBoolean(searchParams.get("isBestSeller"));
    if (isBestSeller !== null) filter.isBestSeller = isBestSeller;

    const inStock = parseBoolean(searchParams.get("inStock"));
    if (inStock !== null) filter.inStock = inStock;

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const minPrice = minPriceParam !== null ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : null;

    if (minPriceParam !== null || maxPriceParam !== null) {
      const priceFilter = {};
      if (minPriceParam !== null && !Number.isNaN(minPrice)) priceFilter.$gte = minPrice;
      if (maxPriceParam !== null && !Number.isNaN(maxPrice)) priceFilter.$lte = maxPrice;
      if (Object.keys(priceFilter).length > 0) {
        filter.price = priceFilter;
      }
    }

    const search = searchParams.get("search");
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ name: regex }, { description: regex }];
    }

    const sortParam = searchParams.get("sort") || "newest";
    let sort = { createdAt: -1 };
    if (sortParam === "price_asc") sort = { price: 1 };
    if (sortParam === "price_desc") sort = { price: -1 };
    if (sortParam === "name_asc") sort = { name: 1 };
    if (sortParam === "name_desc") sort = { name: -1 };

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Number(searchParams.get("limit") || 12));
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(filter);

    let products = [];
    try {
      products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (queryError) {
      console.error("Product.find failed, falling back to raw collection:", queryError);
      products = await Product.collection
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray();
    }

    const normalized = products.map((product) => ({
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
    }));

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      products: normalized,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("GET /api/products failed:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load products" },
      { status: 500 },
    );
  }
}
