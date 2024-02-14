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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const member_schema_1 = require("./schema/member.schema");
const user_service_1 = require("../user/user.service");
const restaurant_service_1 = require("../restaurant/restaurant.service");
let MemberService = class MemberService {
    constructor(memberModel, restaurantService, userService) {
        this.memberModel = memberModel;
        this.restaurantService = restaurantService;
        this.userService = userService;
    }
    async create(userId, restaurantId) {
        const createdMember = new this.memberModel({
            userId: userId,
            restaurantId: restaurantId,
        });
        await createdMember.save();
        return createdMember;
    }
    async getUsersByRestaurantId(restaurantId) {
        const members = await this.findByRestaurantId(restaurantId);
        const userPromises = members.map(async (member) => {
            var user = await this.userService.getByIdReturnValidData(member.userId);
            return user;
        });
        const users = await Promise.all(userPromises);
        return users;
    }
    async getRestaurantsByUserId(userId) {
        const members = await this.findByUserId(userId);
        const restaurantPromise = members.map(async (member) => {
            var restaurant = await this.restaurantService.findOneById(member.restaurantId);
            return restaurant;
        });
        const restaurants = await Promise.all(restaurantPromise);
        return restaurants;
    }
    async findByRestaurantId(restaurantId) {
        return await this.memberModel.find({ restaurantId: restaurantId });
    }
    async findByUserId(userId) {
        return await this.memberModel.find({ userId: userId });
    }
    async deleteUser(userId, restaurantId) {
        return await this.memberModel.findOneAndDelete({
            userId: userId,
            restaurantId: restaurantId,
        });
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(member_schema_1.Member.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => restaurant_service_1.RestaurantService))),
    __metadata("design:paramtypes", [mongoose_1.default.Model, restaurant_service_1.RestaurantService,
        user_service_1.UserService])
], MemberService);
//# sourceMappingURL=member.service.js.map