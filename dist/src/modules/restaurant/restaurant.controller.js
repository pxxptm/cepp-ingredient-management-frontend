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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const restaurant_service_1 = require("./restaurant.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const restaurant_dto_1 = require("./dto/restaurant.dto");
const role_guard_1 = require("../auth/guard/role.guard");
const role_decorator_1 = require("../auth/decorator/role.decorator");
const user_schema_1 = require("../user/schema/user.schema");
const currentuser_decorator_1 = require("../auth/decorator/currentuser.decorator");
let RestaurantController = class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async create(iuser, createrestaurantdto) {
        return await this.restaurantService.create(iuser.sub, createrestaurantdto);
    }
    async update(id, updaterestaurantdto) {
        return await this.restaurantService.update(id, updaterestaurantdto);
    }
    async delete(id) {
        return await this.restaurantService.delete(id);
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(user_schema_1.AllRole.OWNER),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Roles)(user_schema_1.AllRole.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(user_schema_1.AllRole.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "delete", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('restaurant'),
    (0, common_1.Controller)('restaurant'),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map