import jwt from "jsonwebtoken";

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
    }
}

export default new TokenService();