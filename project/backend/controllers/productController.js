import Product from "../models/Product.js";


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, image, description, category, pdf } = req.body;
    const newProduct = new Product({ name, image, description, category, pdf });
    await newProduct.save();
    res.status(201).json({ message: "Məhsul əlavə olundu", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json({ message: "Məhsul yeniləndi", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json({ message: "Məhsul silindi" });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
};
