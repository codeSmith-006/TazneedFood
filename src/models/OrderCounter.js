import mongoose from "mongoose";

const OrderCounterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { versionKey: false },
);

export default mongoose.models.OrderCounter ||
  mongoose.model("OrderCounter", OrderCounterSchema, "ordercounters");
