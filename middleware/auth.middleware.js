import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js"
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;
        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // If no token found, deny access
        if (!token) return res.status(401).json({ message: 'authorization denied' });
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Fetch user from database
        const user = await User.findById(decoded.userId);
        //user not found
        if (!user) return res.status(401).json({ message: 'Unauthorized, user not found' });
        // Attach user to request object
        req.user = user;
        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

export default authorize;