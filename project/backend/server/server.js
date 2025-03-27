import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

import path from "path";
import productRouter from "./routes/productRoutes.js";
import { fileURLToPath } from "url";
import { favoritesRouter } from "./routes/favoritesRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 4000;
const allowed_origins = "https://www.kasalm.com";

const corsOptions = {
    origin: allowed_origins,
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


connectDB();


app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => res.send('Api Working'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/favorites', favoritesRouter) 
app.use('/api/admin', adminRouter);
app.use("/api/basket", basketRoutes);

app.listen(port, () => console.log(`Server started on PORT:${port}`));

