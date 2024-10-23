import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PRODUCT", ProductSchema);
