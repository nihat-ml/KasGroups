import express from "express";


import upload from "../middleware/upload.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers.js";

const router = express.Router();
router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put(
  "/:id",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
