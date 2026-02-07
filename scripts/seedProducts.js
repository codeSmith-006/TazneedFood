import { connectDB } from "../src/lib/mongodb.js";
import Product from "../src/models/Product.js";
import Category from "../src/models/Category.js";

const products = [
  {
    name: "Black Seed Honey",
    slug: "black-seed-honey",
    categorySlug: "honey",
    price: 850,
    oldPrice: 1000,
    description:
      "Premium quality black seed honey sourced from the finest apiaries. Rich in nutrients and natural enzymes.",
    details: ["100% Pure & Natural", "Rich in antioxidants", "No artificial additives", "Net Weight: 500g"],
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600",
    ],
    inStock: true,
    isBestSeller: true,
    isOffer: true,
  },
  {
    name: "Sundarban Raw Honey",
    slug: "sundarban-raw-honey",
    categorySlug: "honey",
    price: 750,
    oldPrice: 900,
    description:
      "Authentic raw honey from the Sundarbans mangrove forest. Unprocessed and full of natural goodness.",
    details: [
      "Sourced from Sundarbans",
      "Raw & Unprocessed",
      "Traditional collection method",
      "Net Weight: 500g",
    ],
    images: ["https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600"],
    inStock: true,
    isBestSeller: true,
  },
  {
    name: "Litchi Flower Honey",
    slug: "litchi-flower-honey",
    categorySlug: "honey",
    price: 650,
    description:
      "Delicate and fragrant honey from litchi orchards. Light color with a distinctive floral taste.",
    details: ["Light & Floral", "Perfect for tea", "No preservatives", "Net Weight: 400g"],
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600"],
    inStock: true,
  },
  {
    name: "Black Seed Oil",
    slug: "black-seed-oil",
    categorySlug: "oil",
    price: 550,
    oldPrice: 650,
    description:
      "Cold-pressed black seed oil known for its numerous health benefits. Perfect for daily wellness routine.",
    details: ["Cold Pressed", "100% Pure", "Rich in Thymoquinone", "Volume: 250ml"],
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"],
    inStock: true,
    isOffer: true,
  },
  {
    name: "Extra Virgin Olive Oil",
    slug: "extra-virgin-olive-oil",
    categorySlug: "oil",
    price: 950,
    description: "Premium imported extra virgin olive oil. Perfect for cooking and dressing.",
    details: ["First Cold Press", "Imported from Spain", "Low Acidity", "Volume: 500ml"],
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"],
    inStock: true,
    isBestSeller: true,
  },
  {
    name: "Coconut Oil Pure",
    slug: "coconut-oil-pure",
    categorySlug: "oil",
    price: 450,
    description:
      "Pure virgin coconut oil for cooking, skincare, and haircare. Multi-purpose natural oil.",
    details: ["Virgin Coconut Oil", "Multi-purpose use", "No chemicals", "Volume: 500ml"],
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"],
    inStock: false,
  },
  {
    name: "Pure Cow Ghee",
    slug: "pure-cow-ghee",
    categorySlug: "ghee",
    price: 800,
    oldPrice: 950,
    description: "Traditional pure cow ghee made from fresh cream. Rich aroma and authentic taste.",
    details: ["From Grass-fed Cows", "Traditional Method", "Rich in Vitamins", "Net Weight: 500g"],
    images: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"],
    inStock: true,
    isBestSeller: true,
    isOffer: true,
  },
  {
    name: "Buffalo Ghee Premium",
    slug: "buffalo-ghee-premium",
    categorySlug: "ghee",
    price: 750,
    description: "Premium buffalo ghee with rich creamy texture. Perfect for traditional cooking.",
    details: ["High Fat Content", "Perfect for Sweets", "Long Shelf Life", "Net Weight: 500g"],
    images: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"],
    inStock: true,
  },
  {
    name: "Ajwa Dates Premium",
    slug: "ajwa-dates-premium",
    categorySlug: "dates",
    price: 1200,
    oldPrice: 1400,
    description: "Premium Ajwa dates from Madinah. Known for their unique taste and health benefits.",
    details: ["From Madinah", "Soft & Fresh", "High in Fiber", "Net Weight: 500g"],
    images: ["https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"],
    inStock: true,
    isBestSeller: true,
    isOffer: true,
  },
  {
    name: "Medjool Dates",
    slug: "medjool-dates",
    categorySlug: "dates",
    price: 1100,
    description: "Large, soft Medjool dates. The king of dates with caramel-like sweetness.",
    details: ["King of Dates", "Large Size", "Natural Sweetener", "Net Weight: 500g"],
    images: ["https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"],
    inStock: true,
  },
  {
    name: "Deglet Noor Dates",
    slug: "deglet-noor-dates",
    categorySlug: "dates",
    price: 650,
    description: "Semi-dry dates with a delicate honey-like flavor. Perfect for cooking and snacking.",
    details: ["Semi-dry texture", "Mild sweetness", "Great for baking", "Net Weight: 500g"],
    images: ["https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"],
    inStock: true,
  },
];

const run = async () => {
  await connectDB();

  const categoryDocs = await Category.find({}).lean();
  const categoryBySlug = new Map(categoryDocs.map((category) => [category.slug, category._id]));

  const ops = products.map((product) => {
    const categoryId = categoryBySlug.get(product.categorySlug);
    if (!categoryId) {
      console.warn(`Missing category for slug: ${product.categorySlug}`);
      return null;
    }

    return {
      updateOne: {
        filter: { slug: product.slug },
        update: {
          $setOnInsert: {
            ...product,
            category: categoryId,
          },
        },
        upsert: true,
      },
    };
  });

  const filteredOps = ops.filter(Boolean);
  if (filteredOps.length) {
    await Product.bulkWrite(filteredOps);
  }

  console.log(`Seeded products (upserted ${filteredOps.length}).`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to seed products", error);
  process.exit(1);
});
