import Product from "../models/Product.js";




export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const image = req.files["image"] ? req.files["image"][0].path : null;
    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;

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
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Məhsul tapılmadı" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const image = req.files["image"] ? req.files["image"][0].path : req.body.image;
    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : req.body.pdf;

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


export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Məhsul silindi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
