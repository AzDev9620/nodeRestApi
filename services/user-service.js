const User = require('../model/User');
const uuid = require('uuid')
const bcrypt = require('bcryptjs');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error')
class UserService {
    async registration(name, email, password) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest("Ползователь сушествует!")
        }
        
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf


        const user = await  User.create({ name, email, password: hashPassword, activationLink });
        /* Gmail  */
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        

        const userDto = new UserDto(user) // id, email, isActive
        const tokens =   tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens,  user: userDto}
    }

    async activate (activationLink) {
        const user = await User.findOne({activationLink})
        if(!user){
            throw new ApiError.BadRequest(`Некоректная сылка активации`)
        }
        user.isActivated = true;
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({email}) 
        if(!user) {
            throw ApiError.BadRequest(`Пользователь не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest(`Неверный пароль!`)
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens,  user: userDto}
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
   
        return token;
    }
    async refresh(refreshToken){
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        // Пользователь не автаризован!
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        // Сдесь делаем новый токен сначала
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
    async getAllUsers() {
        const users = await User.find();
        return users;
    }

}

module.exports = new UserService();