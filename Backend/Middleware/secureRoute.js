import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers);
        console.log('Cookies:', req.cookies);
        
        // Check for token in cookies first, then in Authorization header
        const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        
        console.log('Token found:', token ? 'yes' : 'no');
        
        if (!token) {
            console.log('No token found in request');
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            console.log('Token verification failed');
            return res.status(401).json({ error: "Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); 
        console.log('User found:', user ? 'yes' : 'no');
        
        if (!user) {
            console.log('No user found for token');
            return res.status(401).json({ error: "No user found" });
        }

        req.User = user;
        next();
    } catch (error) {
        console.log("Error in secureRoute:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export default secureRoute;