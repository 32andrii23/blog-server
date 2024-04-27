import bcrypt from "bcrypt";
import uuid from "uuid";

import UserModel from "../models/User.js"
import MailService from "./mail-service.js"; 

class UserService {
    async registration(fullName, email, password) {
        try {
            const candidate = await UserModel.findOne({ email });
            if(candidate) throw new Error("User already exists");
            
            const passwordHash = await bcrypt.hash(password, 10);
            const activationLink = uuid.v4();

            const newUser = { 
                fullName, 
                email, 
                password: passwordHash, 
                activationLink 
            }
            const user = await UserModel.create(newUser);
            if(!user) throw new Error("Couldn't sign up");

            await MailService.sendActivationMail(email, activationLink);
        } catch (err) {
            
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