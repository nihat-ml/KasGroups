import express from "express";
import User from "../models/User.js";
import generateOTP from "../utils/generateOTP.js"; 
import sendEmail from "../utils/sendEmail.js"; 

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu email artıq qeydiyyatdan keçib!" });
    }

    
    const otpCode = generateOTP(); 

    
    const newUser = new User({
      name,
      email,
      password, 
      isVerified: false, 
      otp: otpCode, 
    });

    await newUser.save();

    
    await sendEmail(email, "Təsdiqləmə Kodu", `Sizin təsdiq kodunuz: ${otpCode}`);

    res.status(201).json({ message: "Təsdiq kodu email-ə göndərildi!", email });

  } catch (error) {
    res.status(500).json({ message: "Qeydiyyat zamanı xəta baş verdi." });
  }
});

router.post("/verify", async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
      }
  
      if (user.otp !== otp) {
        return res.status(400).json({ message: "Yanlış OTP kodu!" });
      }
  
      
      user.isVerified = true;
      user.otp = null;
      await user.save();
  
      res.json({ message: "Hesab uğurla təsdiqləndi!" });
  
    } catch (error) {
      res.status(500).json({ message: "OTP təsdiqi zamanı xəta baş verdi." });
    }
  });
  

export default router;
