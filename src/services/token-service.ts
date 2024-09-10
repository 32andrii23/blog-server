import jwt from "jsonwebtoken";

import TokenModel from "../models/token.js"

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            {
                payload
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "1h"
            }
        )

        const refreshToken = jwt.sign(
            {
                payload
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "30d"
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = TokenModel.create({
            user: userId,
            refreshToken
        });
        return token;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();