import FavoritesModel from "../models/FavoritesModel.js"







export const addFavorites = async (req, res) => {
    try {
      console.log("Body:", req.body); 
      
  
      const {productId, name, price, description, stock, category, email, image, pdf } = req.body;
        
      
      
      
  
      console.log("Image path:", image);
      console.log("PDF path:", pdf);
  
      const newFavorites = new FavoritesModel({ 
       productId, name, price, description, stock, category, image, pdf, email 
      });
  
      await newFavorites.save();
  
      res.status(201).json({ success: true, message: "Məhsul əlavə edildi", favorites: newFavorites });
    } catch (error) {
      console.error("Xəta:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  

    
  export const getFavorites = async (req, res) => {
    try {
      const { email } = req.params;
      
  
      const favorites = await FavoritesModel.find({ email });
  
      
      res.status(200).json({ success: true, favorites: favorites || [] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

    export const deleteFavorite = async (req, res) => {
        try {
          await FavoritesModel.findByIdAndDelete(req.params.id);
          res.json({ success: true, message: "Məhsul silindi" });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      };
    
      
    
