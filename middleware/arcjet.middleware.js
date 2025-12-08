import aj from "../config/arcjet.js";
// Middleware to protect routes using Arcjet service
const arcjetMiddleware = async (req, res, next) => {
    try {
        // Evaluate the request using Arcjet
        const decision = await aj.protect(req, { requested: 1 });
        // If the request is denied, respond with appropriate status code and message
        if (decision.isDenied()) {
            // Handle different denial reasons accordingly  
            if (decision.reason.isRateLimit()) return res.status(429).json({ message: "Too many requests. Please try again later." });
            // Example: Block requests from specific countries 
            if (decision.reason.isBot()) return res.status(403).json({ error: "Bot detected." });
            // Default denial response 
            return res.status(403).json({ error: "Request denied by security rules." });
        };
        // If allowed, proceed to the next middleware or route handler
        next()
    } catch (error) {
        // Handle any errors that occur during evaluation
        console.error(`Arcjet evaluation error: ${error}`);
        // Proceed to next middleware with error
        next(error);
    }
};

export default arcjetMiddleware;