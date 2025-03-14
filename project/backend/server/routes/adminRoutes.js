import express from "express";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();


router.post("/login", adminAuth, (req, res) => {
    res.json({ success: true, message: "Admin logged in successfully", isAdmin: true });
});


router.get("/dashboard", (req, res) => {
    if (req.isAdmin) {
        res.json({ success: true, message: "Welcome to Admin Dashboard" });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized Access" });
    }
});

export default router;
