import express from "express"
import { addFavorites, deleteFavorite, getFavorites} from "../controllers/FavoritesController.js"
import upload from "../middleware/upload.js";


export const favoritesRouter = express.Router()
 
favoritesRouter.post("/", 
  
  addFavorites)

favoritesRouter.get("/:email", getFavorites)
favoritesRouter.delete("/:id", deleteFavorite);