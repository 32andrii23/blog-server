import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/User.js"
import MailService from "./mail-service.js";
import TokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(fullName, email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) throw ApiError.BadRequest("User already exists");

        const passwordHash = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const newUser = {
            fullName,
            email,
            password: passwordHash,
            activationLink
        }
        const user = await UserModel.create(newUser);

        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(req, res, next) {

    }

    async logout(req, res, next) {

    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequest("Invalid link");
        user.isActivated = true;
        console.log("user: " + user);
        await user.save();
    }

    async refresh(req, res, next) {

    }

    async getUsers(req, res, next) {

    }
}

export default new UserService();