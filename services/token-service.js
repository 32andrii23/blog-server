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
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "30d"
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
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
}

export default new TokenService();