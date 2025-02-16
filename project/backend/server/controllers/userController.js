import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import transporter from "../config/nodemailer.js"
import nodemailer from 'nodemailer'; 

export const register = async (req, res)=>{
    const {name, email, password} = req.body

    if (!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'}) 
    }

    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success: false, message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({name, email, password: hashedPassword})
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to KasAlm',
            text: `Welcome to KasAlm website. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions) 

        return res.json({success:true})



    } catch (error)
     {
        res.json({success: false, message: error.message})
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body

    if(!email, !password){
        return res.json({success: false, message: "Email and password are required"})
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'Invalid email'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            none: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success:true})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success: true, message: 'Logged Out'})
    } catch(error){
        res.json({success: false, message: error.message})
    }
}




export const sendVerifyOtp = async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body); 

        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);
        console.log("User Found:", user); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

       
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        console.log("Generated OTP:", otp); 

       
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        console.log("OTP saved to user, preparing to send email...");

        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com", 
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL, 
                pass: process.env.SENDER_PASSWORD 
            }
        });

     
        console.log("SMTP Config:", {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SENDER_EMAIL
        });

        
        const mailOption = {
            from: `"Verification" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        };

        console.log("Sending email to:", user.email); 

        await transporter.sendMail(mailOption);

        console.log("Email sent successfully!");

        res.json({ success: true, message: 'Verification OTP Sent on Email' });

    } catch (error) {
        console.error("Error occurred:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const verifyEmail = async (req, res)=>{
    const {userId, otp} = req.body
    
    if(!userId || !otp){
        return res.json({success: false, message: 'Missing Details'})
    }
    try {
        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp ){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save()
        return res.json({success: true, message: "Email verified successfully"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}