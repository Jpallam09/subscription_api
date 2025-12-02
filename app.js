import express from 'express';
import {PORT} from './config/env.js'
const app = express();

app.get('/', (req, res)=>{
    res.send('Hello!')
})

app.listen(PORT, ()=>{
    console.log(`This project is listening in http://localhost:${PORT}`)
})

export default app;