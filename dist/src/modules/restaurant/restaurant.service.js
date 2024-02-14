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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const restaurant_schema_1 = require("./schema/restaurant.schema");
const mongoose_2 = require("@nestjs/mongoose");
const member_service_1 = require("../member/member.service");
let RestaurantService = class RestaurantService {
    constructor(restaurantModel, memberService) {
        this.restaurantModel = restaurantModel;
        this.memberService = memberService;
    }
    async create(userId, creatRestaurantDto) {
        const createdRestaurant = new this.restaurantModel(creatRestaurantDto);
        await createdRestaurant.save();
        this.memberService.create(userId, createdRestaurant.id);
        return createdRestaurant;
    }
    async findOneById(restaurantId) {
        return await this.restaurantModel.findById(restaurantId);
    }
    async update(restaurantId, updaterestaurantDto) {
        return await this.restaurantModel.findByIdAndUpdate(restaurantId, updaterestaurantDto, {
            new: true,
        });
    }
    async delete(restaurantId) {
        return await this.restaurantModel.findByIdAndDelete(restaurantId);
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(restaurant_schema_1.Restaurant.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => member_service_1.MemberService))),
    __metadata("design:paramtypes", [mongoose_1.default.Model, member_service_1.MemberService])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map