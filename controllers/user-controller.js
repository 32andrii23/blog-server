import UserService from "../services/user-service.js";

class UserController {
    async registration(req, res, next) {
        try {
            const { fullName, email, password } = req.body;
            const UserData = await UserService.registration(fullName, email, password);

            res.cookie("refreshToken", UserData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            return res.json(UserData);  
        } catch (err) {
            console.log(err);
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

export default new UserController();