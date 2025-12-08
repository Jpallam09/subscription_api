import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
// Ensure DB_URI is defined
if (!DB_URI) {
    throw new Error('Please define the MongoDB URI environtment inside .env.<development/production>.env.local');
}
// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(DB_URI)
        console.log(`➤ Connected to Database in ${NODE_ENV} mode...`)
    } catch (error) {
        console.log('Error connecting to Database', error)
        process.exit(1);
    };
}

export default connectToDatabase;