import "dotenv/config"
import { connectDB } from "../src/lib/mongodb.js";
import Category from "../src/models/Category.js";

const categories = [
  {
    name: "Offer Zone",
    slug: "offer",
    description: "Special discounts and deals",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
  },
  {
    name: "Best Seller",
    slug: "best-seller",
    description: "Our most popular products",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
  },
  {
    name: "Oil",
    slug: "oil",
    description: "Premium quality natural oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
  },
  {
    name: "Ghee",
    slug: "ghee",
    description: "Pure traditional ghee",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
  },
  {
    name: "Dates",
    slug: "dates",
    description: "Premium quality dates",
    image: "https://images.unsplash.com/photo-1593164842264-854604db2260?w=400",
  },
  {
    name: "Honey",
    slug: "honey",
    description: "Pure organic honey",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
  },
];

const run = async () => {
  await connectDB();

  const ops = categories.map((category) => ({
    updateOne: {
      filter: { slug: category.slug },
      update: { $setOnInsert: category },
      upsert: true,
    },
  }));

  if (ops.length) {
    await Category.bulkWrite(ops);
  }

  console.log(`Seeded categories (upserted ${ops.length}).`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to seed categories", error);
  process.exit(1);
});
