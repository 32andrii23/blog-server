import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import express from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import { validationResult } from "express-validator";
import { signUpValidation } from "./validations/auth.js";

import UserModel from "./models/User.js" 

const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(";)"))
    .catch((error) => console.log(":(", error));

app.post("/auth/sign-up", signUpValidation, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const doc = new UserModel({

    })

    res.json({
        success: true,
    });
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
