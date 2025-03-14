import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema({
  productId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: true },
  email: {type: String, required: true, unique: false},
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  pdf: { type: String }    
}, { timestamps: true });

const FavoritesModel = mongoose.model('favorite', FavoritesSchema)

export default FavoritesModel