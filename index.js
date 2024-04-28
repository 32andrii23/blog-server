import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/auth.js';

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

start();