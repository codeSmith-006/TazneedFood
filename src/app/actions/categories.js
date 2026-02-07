"use server";

import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/permissions";
import Category from "@/models/Category";
import Product from "@/models/Product";

const toPayload = (category) => ({
  id: category._id.toString(),
  name: category.name,
  slug: category.slug,
  description: category.description || "",
  image: category.image || "",
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
});

export async function createCategory(data) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  const category = await Category.create({
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    image: data.image || "",
  });

  revalidateTag("categories");
  return toPayload(category);
}

export async function updateCategory(id, data) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      image: data.image || "",
    },
    { new: true },
  );

  if (!category) {
    throw new Error("Category not found");
  }

  revalidateTag("categories");
  return toPayload(category);
}

export async function deleteCategory(id) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
  }

  await connectDB();
  const productCount = await Product.countDocuments({ category: id });
  if (productCount > 0) {
    throw new Error("Category has products");
  }

  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Category not found");
  }

  revalidateTag("categories");
  return { id };
}
