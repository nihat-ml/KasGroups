const adminAuth = (req, res, next) => {
    const { username, password } = req.body;

    const ADMIN_USERNAME = "nihatML";
    const ADMIN_PASSWORD = "admin123";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.isAdmin = true;
        next();
    } else {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid Admin Credentials" });
    }
};

export default adminAuth;
