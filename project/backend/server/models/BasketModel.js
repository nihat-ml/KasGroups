import mongoose from "mongoose";

const BasketSchema = new mongoose.Schema({
  productId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: false },
  email: {type: String, required: false, unique: false},
  price: { type: Number, required: false },
  totalPrice: { type: Number, required: false },
  count: { type: Number, required: false },
  description: { type: String },
  stock: { type: Number, required: false },
  category: { type: String, required: false },
  image: { type: String }, 
  pdf: { type: String }    
}, { timestamps: true });

const BasketModel = mongoose.model('Basket', BasketSchema)

export default BasketModel