import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/User.js"
import MailService from "./mail-service.js"; 
import TokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";

class UserService {
    async registration(fullName, email, password) {
        try {
            const candidate = await UserModel.findOne({ email });
            if(candidate) throw new Error("User already exists");
            
            const passwordHash = await bcrypt.hash(password, 10);
            const activationLink = uuidv4();

            const newUser = { 
                fullName, 
                email, 
                password: passwordHash, 
                activationLink 
            }
            const user = await UserModel.create(newUser);
            if(!user) throw new Error("Couldn't sign up");

            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

            const userDto = new UserDto(user);
            const tokens = TokenService.generateTokens({ ...userDto });
            await TokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto
            }
        } catch (err) {
            console.log(err);
            res.json({
                message: "Couldn't sign up"
            })
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }

    async activate(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }
    
    async getUsers(req, res, next) {
        try {
            res.json(["123", "456"])
        } catch (err) {
            
        }
    }
}

export default new UserService();