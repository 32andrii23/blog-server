import { body } from "express-validator";

export const signUpValidation = [
    body("fullName", "The full name field must be at least 3 characters").isLength({ min: 3 }),
    body("email", "The email field must be valid").isEmail(),
    body("password", "The password field must be at least 8 characters").isLength({ min: 8 }),
    body("profilePictureUrl", "The profile picture url field must be valid").optional().isURL(),
];

export const signInValidation = [
    body("email", "The email field must be valid").isEmail(),
    body("password", "The password field must be at least 8 characters").isLength({ min: 8 }),
];

export const postCreateValidation = [
    body("title", "The title field must be at least 3 characters").isLength({ min: 3 }),
    body("text", "The text field must be at least 10 characters").isLength({ min: 10 }),
    body("tags", "The tags field must be valid").optional().isString(),
    body("imageUrl", "The image url field must be valid").optional().isURL(),
];