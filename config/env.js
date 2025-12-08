import { config } from "dotenv";
// Load environment variables from the appropriate .env file based on NODE_ENV 
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// Export the required environment variables
export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    ARCJET_ENV,
    ARCJET_SITE_KEY
} = process.env;  