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
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (err) {
            console.log(err);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (err) {
            next(err);
        }
    }
    
    async getUsers(req, res, next) {
        try {
            res.json(["123", "456"])
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();