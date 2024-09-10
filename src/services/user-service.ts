import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user"
import MailService from "./mail-service";
import TokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";

class UserService {
    async registration(fullName: string, email: string, password: string) {
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
    
    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if (!user || !user.password) throw ApiError.BadRequest("User not found");
        
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) throw ApiError.BadRequest("Wrong password");
        
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = TokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequest("Invalid link");
        user.isActivated = true;
        console.log("user: " + user);
        await user.save();
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) throw ApiError.UnauthorizedError();
        
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) throw ApiError.UnauthorizedError();

        const user = UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService();