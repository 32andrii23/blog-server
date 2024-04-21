import { body } from "express-validator";

export const signUpValidation = [
    body("fullName").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("profilePictureUrl").optional().isURL(),
]