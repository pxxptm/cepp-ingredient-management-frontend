"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../user/schema/user.schema");
const mongoose_2 = require("@nestjs/mongoose");
const auth_config_1 = require("../../../config/auth.config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const member_service_1 = require("../member/member.service");
let AuthService = class AuthService {
    constructor(userModel, userService, memberService, jwtService) {
        this.userModel = userModel;
        this.userService = userService;
        this.memberService = memberService;
        this.jwtService = jwtService;
    }
    async registerOwner(registerOwnerDto) {
        if (registerOwnerDto.ownerSecret != (0, auth_config_1.authConfig)().ownerSecret) {
            throw new common_1.HttpException({
                message: 'can not access owner role.',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return await this.register({
                username: registerOwnerDto.username,
                password: registerOwnerDto.password,
                firstname: registerOwnerDto.firstname,
                lastname: registerOwnerDto.lastname,
                role: user_schema_1.AllRole.OWNER,
            });
        }
    }
    async registerUser(restaurantId, registerUserDto) {
        await this.register(registerUserDto);
        const user = await this.userService.getUserByUsername(registerUserDto.username);
        if (!user) {
            throw new common_1.HttpException({
                message: 'username not  found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.memberService.create(user, restaurantId);
    }
    async register({ username, password, firstname, lastname, role }) {
        const user = await this.userModel.findOne({
            username: username,
        });
        try {
            if (!user) {
                const saltOrRounds = +(0, auth_config_1.authConfig)().saltround;
                const hash = await bcrypt.hash(password, saltOrRounds);
                password = hash;
                const registedUser = new this.userModel({
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    role: role,
                });
                await registedUser.save();
                return await this.generateAccessToken(registedUser.id, registedUser.username, registedUser.role);
            }
            else {
                throw new common_1.HttpException({
                    message: 'username already exists.',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message,
            }, error.status);
        }
    }
    async LoginUser(loginUserDto) {
        const user = await this.userModel.findOne({
            username: loginUserDto.username,
        });
        if (!user) {
            throw new common_1.HttpException({
                message: 'user or password incorrect.',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (isMatch) {
            return {
                accessToken: await this.generateAccessToken(user.id, user.username, user.role),
            };
        }
        else {
            throw new common_1.HttpException({
                message: 'user or password incorrect.',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async generateAccessToken(userId, username, role) {
        const payload = { sub: userId, username: username, role: role };
        return await this.jwtService.signAsync(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService,
        member_service_1.MemberService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map