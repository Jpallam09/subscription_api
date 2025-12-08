import express from 'express';
import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js'
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
// Initialize Express app
const app = express();
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse Cookie header and populate req.cookies
app.use(cookieParser());
// Apply Arcjet middleware to all routes
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
// Error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello!')
})
// Start the server and connect to the database
app.listen(PORT, async () => {
    console.log(`➤ This project is listening in http://localhost:${PORT}`)
    // Connect to the database
    await connectToDatabase();
})

export default app;