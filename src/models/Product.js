import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categorySlug: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    description: { type: String, default: "" },
    details: [{ type: String }],
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false, index: true },
    isOffer: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

ProductSchema.index({ price: 1 });

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema, "products");
