const { validationResult } = require('express-validator');
const userService = require('../services/user-service');
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            const userData = await userService.registration(name,email, password);
            res.cookie('refreshToken', userData, {
                maxAge: 10 * 24* 60 * 60 * 1000, httpOnly: true
            })
           return  res.json(userData)
            
        } catch (e) {
            next(err);
        }
    }

    async activate(req, res, next) {
        try{
            const activationLink = req.params.link
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        }catch(err){
            next(err);
        }
    }
    async login (req, res, next){
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData, {
                maxAge: 10 * 24* 60 * 60 * 1000, httpOnly: true
            })
           return  res.json(userData)
        }catch(err){
            next(err)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken.refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken);
            const userData = await userService.refresh(refreshToken.refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();