import Product from "../models/Product.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const formatFilePath = (filePath) => {
  return filePath ? filePath.replace(/\\/g, "/") : null;
};


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


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

 
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


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Məhsul tapılmadı" });

    
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


export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    
    
    const image = req.files && req.files["image"] ? formatFilePath(req.files["image"][0].path) : req.body.image;
    const pdf = req.files && req.files["pdf"] ? formatFilePath(req.files["pdf"][0].path) : req.body.pdf;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, category, image, pdf },
      { new: true }
      

    );
    console.log("Request files:", req.files);
      console.log("Request body:", req.body);
      console.log("Request params:", req.params);
    if (!updatedProduct) {
      console.log("Request files:", req.files);
      console.log("Request body:", req.body);
      console.log("Request params:", req.params);
      return res.status(404).json({ success: false, message: "Məhsul tapılmadı" });
      
    }
    console.log("Request files:", req.files);
      console.log("Request body:", req.body);
      console.log("Request params:", req.params);
    res.json({ success: true, message: "Məhsul yeniləndi", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Məhsul silindi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
