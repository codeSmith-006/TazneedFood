"use server";

import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Product from "@/models/Product";
import Category from "@/models/Category";

const toPayload = (product) => ({
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
});

export async function createProduct(data) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();

  const categoryId = data.categoryId || data.category;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const product = await Product.create({
    name: data.name,
    slug: data.slug,
    category: category._id,
    categorySlug: category.slug,
    price: data.price,
    oldPrice: data.oldPrice,
    description: data.description || "",
    details: data.details || [],
    images: data.images || [],
    inStock: Boolean(data.inStock),
    isBestSeller: Boolean(data.isBestSeller),
    isOffer: Boolean(data.isOffer),
  });

  revalidateTag("products");
  return toPayload(product);
}

export async function updateProduct(id, data) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();

  let categoryId = data.categoryId || data.category;
  let categorySlug = data.categorySlug;
  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    categorySlug = category.slug;
  }

  const updates = {
    name: data.name,
    slug: data.slug,
    price: data.price,
    oldPrice: data.oldPrice,
    description: data.description || "",
    details: data.details || [],
    images: data.images || [],
    inStock: Boolean(data.inStock),
    isBestSeller: Boolean(data.isBestSeller),
    isOffer: Boolean(data.isOffer),
  };

  if (categoryId) {
    updates.category = categoryId;
    updates.categorySlug = categorySlug;
  }

  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) {
    throw new Error("Product not found");
  }

  revalidateTag("products");
  return toPayload(product);
}

export async function deleteProduct(id) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Product not found");
  }

  revalidateTag("products");
  return { id };
}
