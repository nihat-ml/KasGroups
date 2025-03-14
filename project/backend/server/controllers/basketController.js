import BasketModel from "../models/BasketModel.js";
import path from "path";
import { fileURLToPath } from "url";
import BasketPriceModel from "../models/BasketPriceModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addToBasket = async (req, res) => {
    try {
        
        const { _id, name, email, price,  description, stock, category, image, pdf } = req.body;

        
        const updatedBasketItem = await BasketModel.findOneAndUpdate(
            { name, email },  
            { 
                $inc: { count: 1, totalPrice: price }, 
            },
            { new: true } 
        );

        
        if (updatedBasketItem) {
            return res.status(200).json({
                success: true,
                message: "Məhsul yeniləndi",
                basket: updatedBasketItem
            });
        }

       
        const newBasketItem = new BasketModel({ 
            productId:_id,
            name, 
            email, 
            price, 
            totalPrice: price, 
            count: 1,  
            description, 
            stock, 
            category, 
            image, 
            pdf 
        });

        await newBasketItem.save();

        return res.status(201).json({ 
            success: true, 
            message: "Məhsul səbətə əlavə edildi", 
            basket: newBasketItem 
        });

    } catch (error) {
        console.error("Xəta:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromCountBasket = async (req, res) => {
    try {
        

        const { name, email, price } = req.body;

        
        const updatedBasketItem = await BasketModel.findOneAndUpdate(
            { name, email },  
            { 
                $inc: { count: -1, totalPrice: -price }, 
            },
            { new: true }
        );

        
        if (updatedBasketItem && updatedBasketItem.count > 0) {
            return res.status(200).json({
                success: true,
                message: "Məhsul səbətdən çıxarıldı",
                basket: updatedBasketItem
            });
        }

       
        if (updatedBasketItem && updatedBasketItem.count <= 0) {
            await BasketModel.findOneAndDelete({ name, email });
            return res.status(200).json({
                success: true,
                message: "Məhsul səbətdən tam silindi",
            });
        }

        
        return res.status(404).json({ success: false, message: "Məhsul səbətdə tapılmadı" });

    } catch (error) {
        console.error("Xəta:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const addToTotalPriceBasket = async (req, res) => {
    try {
        
        const { email, productTotalPrice } = req.body;

       
        const updatedBasketItem = await BasketPriceModel.findOneAndUpdate(
            {  email },  
            { 
                $set: {  productTotalPrice } 
            },
            { new: true } 
        );

        
        if (updatedBasketItem) {
            return res.status(200).json({
                success: true,
                message: "Məhsul yeniləndi",
                basket: updatedBasketItem
            });
        }

       
        const newBasketItem = new BasketPriceModel({ 
            email,
            productTotalPrice, 
           
        });

        await newBasketItem.save();

        return res.status(201).json({ 
            success: true, 
            message: "Məhsul səbətə əlavə edildi", 
            basket: newBasketItem 
        });

    } catch (error) {
        console.error("Xəta:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBasket = async (req, res) => {
    try {
        const { email } = req.params;
        

        const basket = await BasketModel.find({ email });

        res.status(200).json({ success: true, basket: basket || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTotalPriceBasket = async (req, res) => {
    try {
        const { email } = req.params;
        

        const basketPrice = await BasketPriceModel.find({ email });

        res.status(200).json({ success: true, basketPrice: basketPrice || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getNameBasket = async (req, res) => {
    try {
        const { email,name } = req.params;
      

        const basket = await BasketModel.find({name,email });

        res.status(200).json({ success: true, basket: basket || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromBasket = async (req, res) => {
    try {
        await BasketModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Məhsul səbətdən silindi" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


