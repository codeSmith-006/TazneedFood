import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const filter = slug ? { slug } : {};
    const categories = await Category.find(filter).sort({ name: 1 }).lean();

    const normalized = categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image: category.image || "",
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    return NextResponse.json({ categories: normalized });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}
