import { connectDB } from "../src/lib/mongodb.js";
import Category from "../src/models/Category.js";
import Product from "../src/models/Product.js";
import mongoose from "mongoose";

const run = async () => {
  await connectDB();

  const categories = await Category.find({}).lean();
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category._id]));

  const collection = Product.collection;
  const products = await collection.find({}).toArray();

  let updated = 0;
  for (const product of products) {
    const categoryId = categoryBySlug.get(product.categorySlug);
    if (!categoryId) continue;

    const isValidObjectId =
      product.category instanceof mongoose.Types.ObjectId ||
      (typeof product.category === "string" && mongoose.Types.ObjectId.isValid(product.category));

    if (!isValidObjectId) {
      await collection.updateOne({ _id: product._id }, { $set: { category: categoryId } });
      updated += 1;
    }
  }

  console.log(`Backfilled category for ${updated} products.`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to backfill product categories", error);
  process.exit(1);
});
