import express from "express";
import { body } from "express-validator";

import userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth-middleware";

const router = express.Router();

router.post(
    "/registration",
    body("fullName").isLength({ min: 3, max: 32 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8, max: 32 }),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.get(
    "/users", 
    authMiddleware, 
    userController.getUsers
);

export default router;