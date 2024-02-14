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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const menu_schema_1 = require("./schema/menu.schema");
let MenuService = class MenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    async create(createMenuDto) {
        const createdMenu = new this.menuModel(createMenuDto);
        await createdMenu.save();
    }
    async findOneById(menuId) {
        return await this.menuModel.findById(menuId);
    }
    async findByRestaurantId(restaurantId) {
        return await this.menuModel.find({ restaurantId: restaurantId });
    }
    async update(menuId, updateMenuDto) {
        return await this.menuModel.findByIdAndUpdate(menuId, updateMenuDto, {
            new: true,
        });
    }
    async delete(menuId) {
        return await this.menuModel.findByIdAndDelete(menuId);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_schema_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], MenuService);
//# sourceMappingURL=menu.service.js.map