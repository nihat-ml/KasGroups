import { model, Schema } from "mongoose";






 const BasketPriceSchema=new Schema({

      email: {type: String, required: true, unique: false},
      productTotalPrice: { type: Number, required: true },
         
    }, { timestamps: true });


    
 const BasketPriceModel = model('BasketPrice', BasketPriceSchema)
    
    export default BasketPriceModel