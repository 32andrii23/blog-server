import express from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import multer from "multer";

import { 
    signUpValidation, 
    signInValidation, 
    postCreateValidation 
} from "./middleware/validations.js";
import verifyJWT from "./utils/verifyJWT.js";
import * as UserController from "./controllers/user-controller.js";
import * as PostController from "./controllers/post-controller.js";


const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(";)"))
    .catch((error) => console.log(":(", error));

app.post("/auth/sign-up", signUpValidation, UserController.signUp);
app.post("/auth/sign-in", signInValidation, UserController.signIn);
app.get("/auth/me", verifyJWT, UserController.getInfo);

app.post("/upload", verifyJWT, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", verifyJWT, postCreateValidation, PostController.create);
app.delete("/posts/:id", verifyJWT, PostController.remove);
app.patch("/posts/:id", verifyJWT, PostController.update);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});