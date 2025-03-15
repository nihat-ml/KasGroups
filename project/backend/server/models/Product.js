import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false },
  description: { type: String },
  stock: { type: Number, required: false },
  category: { type: String, required: false},
  image: { type: String }, 
  pdf: { type: String }    
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
