import Product from "../models/Product.js";


export const updateProduct = async (req, res) => {
  try {
    const { name, image, description, pdf } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.pdf = pdf || product.pdf;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Məhsul yenilənərkən xəta baş verdi", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    await product.deleteOne();
    res.json({ message: "Məhsul uğurla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Məhsul silinərkən xəta baş verdi", error: error.message });
  }
};
