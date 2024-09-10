import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import UserService from "../services/user-service";
import ApiError from "../exceptions/api-error";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) next(ApiError.BadRequest("Validation error", errors.array()));

            const { fullName, email, password } = req.body;
            const userData = await UserService.registration(fullName, email, password);
            
            res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            
            return res.json(userData);  
        } catch (err) {
            next(err);
        }
    }
    
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            
            res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            
            return res.json(userData);  
        } catch (err) {
            next(err);
        }
    }
    
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = UserService.logout(refreshToken);

            res.clearCookie("refreshToken");
            
            return res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            
            if(!process.env.CLIENT_URL) throw new Error("CLIENT_URL is not defined");
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            
            res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers()
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();