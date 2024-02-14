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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const member_service_1 = require("./member.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const currentuser_decorator_1 = require("../auth/decorator/currentuser.decorator");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async getRestaurantsByUserId(iuser) {
        return await this.memberService.getRestaurantsByUserId(iuser.sub);
    }
    async getUsersByRestaurantId(restaurantId) {
        return await this.memberService.getUsersByRestaurantId(restaurantId);
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)('restaurant'),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getRestaurantsByUserId", null);
__decorate([
    (0, common_1.Get)('user/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getUsersByRestaurantId", null);
exports.MemberController = MemberController = __decorate([
    (0, swagger_1.ApiTags)('member'),
    (0, common_1.Controller)('member'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controller.js.map