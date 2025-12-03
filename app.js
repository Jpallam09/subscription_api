import express from 'express';
import {PORT} from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.get('/', (req, res)=>{
    res.send('Hello!')
})

app.listen(PORT, async ()=>{
    console.log(`➤ This project is listening in http://localhost:${PORT}`)

    await connectToDatabase();
})

export default app;