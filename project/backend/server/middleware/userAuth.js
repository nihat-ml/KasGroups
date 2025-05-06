import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Not Authorized. Login Again"})
    }

    console.log("Token from cookie:", token);

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode && tokenDecode.id){
            req.body.userId = tokenDecode.id;
            next();
        }else{
            return res.json({success: false, message: "Not Authorized. Login Again"})
        }
    } catch (error) {
        console.error("Auth verification error:", error);
        return res.json({success: false, message: "Token verification failed. Please login again."})
    }
}

export default userAuth