import mongoose from "mongoose";

const BasketSchema = new mongoose.Schema({
  productId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: true },
  email: {type: String, required: false, unique: false},
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  count: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  pdf: { type: String }    
}, { timestamps: true });

const BasketModel = mongoose.model('Basket', BasketSchema)

export default BasketModel