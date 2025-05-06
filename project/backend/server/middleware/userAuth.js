import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next)=>{
    console.log("Cookies received:", req.cookies);
    const {token} = req.cookies;

    if(!token){
        console.log("No token found in cookies");
        // Check if token is in the authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const headerToken = authHeader.substring(7);
            console.log("Using token from Authorization header");
            verifyToken(headerToken, req, res, next);
            return;
        }
        return res.json({success: false, message: "Not Authorized. Login Again"})
    }

    console.log("Token from cookie:", token.substring(0, 10) + "...");
    verifyToken(token, req, res, next);
}

const verifyToken = (token, req, res, next) => {
    try {
        // Use a fixed secret key for development - MUST MATCH the one in authController.js
        const JWT_SECRET = 'kasalm_fixed_jwt_secret_key_2023';
        
        const tokenDecode = jwt.verify(token, JWT_SECRET);
        console.log("Token decoded successfully:", tokenDecode?.id ? "Valid ID" : "No valid ID");
        
        if(tokenDecode && tokenDecode.id){
            req.body.userId = tokenDecode.id;
            next();
        }else{
            console.log("Token decoded but no valid ID found");
            return res.json({success: false, message: "Not Authorized. Login Again"})
        }
    } catch (error) {
        console.error("Auth verification error:", error);
        return res.json({success: false, message: "Token verification failed. Please login again."})
    }
}

export default userAuth