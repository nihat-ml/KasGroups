import Product from "../models/Product.js";
import path from "path";
import { fileURLToPath } from "url";

// Cari faylın direktoriyasını əldə et
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Şəkil və PDF yollarını düzəltmək üçün funksiya
const formatFilePath = (filePath) => {
  return filePath ? filePath.replace(/\\/g, "/") : null;
};

// Yeni məhsul yarat
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const image = req.files["image"] ? formatFilePath(req.files["image"][0].path) : null;
    const pdf = req.files["pdf"] ? formatFilePath(req.files["pdf"][0].path) : null;

    const newProduct = new Product({ name, price, description, stock, category, image, pdf });
    await newProduct.save();

    res.status(201).json({ success: true, message: "Məhsul əlavə edildi", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bütün məhsulları gətir
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Hər məhsulun image və pdf yolunu düzəlt
    const formattedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get("host")}/${formatFilePath(product.image)}` : null,
      pdf: product.pdf ? `${req.protocol}://${req.get("host")}/${formatFilePath(product.pdf)}` : null,
    }));

    res.json({ success: true, products: formattedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tək bir məhsulu gətir
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Məhsul tapılmadı" });

    // Şəkil və PDF üçün tam URL qaytar
    const formattedProduct = {
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get("host")}/${formatFilePath(product.image)}` : null,
      pdf: product.pdf ? `${req.protocol}://${req.get("host")}/${formatFilePath(product.pdf)}` : null,
    };

    res.json({ success: true, product: formattedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Məhsulu yenilə
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const image = req.files["image"] ? formatFilePath(req.files["image"][0].path) : req.body.image;
    const pdf = req.files["pdf"] ? formatFilePath(req.files["pdf"][0].path) : req.body.pdf;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, category, image, pdf },
      { new: true }
    );

    res.json({ success: true, message: "Məhsul yeniləndi", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Məhsulu sil
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Məhsul silindi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
