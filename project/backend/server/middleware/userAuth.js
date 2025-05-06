import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next)=>{
    console.log("Cookies received:", req.cookies);
    const {token} = req.cookies;

    if(!token){
        console.log("No token found in cookies");
        return res.json({success: false, message: "Not Authorized. Login Again"})
    }

    console.log("Token from cookie:", token.substring(0, 10) + "...");

    try {
        // Try to use the configured JWT_SECRET, or fall back to a development key
        const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
        console.log("Using JWT_SECRET:", secret ? "Secret configured" : "No secret configured");
        
        const tokenDecode = jwt.verify(token, secret);
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