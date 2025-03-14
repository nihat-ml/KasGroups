import express from "express";
import { addToBasket, addToTotalPriceBasket, getBasket, getNameBasket, getTotalPriceBasket, removeFromBasket, removeFromCountBasket } from "../controllers/basketController.js";

const router = express.Router();


router.post("/add", addToBasket);

router.post("/removecount", removeFromCountBasket);

router.post("/add/totalprice", addToTotalPriceBasket);


router.get("/totalprice/:email", getTotalPriceBasket);

router.get("/:email", getBasket);

router.get("/basket/:name/:email", getNameBasket); 


router.delete("/:id", removeFromBasket);




export default router;
