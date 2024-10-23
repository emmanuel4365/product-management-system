import express from "express";
import {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/retrieve/:productId", getSingleProduct);
router.get("/retrieve", getAllProducts);
router.put("/update/:productId", updateProduct);
router.delete("/delete/:productId", deleteProduct);

export default router;
