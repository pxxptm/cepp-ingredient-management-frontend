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
exports.IngredientService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const ingredient_schema_1 = require("./schema/ingredient.schema");
let IngredientService = class IngredientService {
    constructor(ingredientModel) {
        this.ingredientModel = ingredientModel;
    }
    async getById(ingredientId) {
        return await this.ingredientModel.findById(ingredientId);
    }
    async create(createIngredientDto) {
        const createdIngredient = new this.ingredientModel(createIngredientDto);
        await createdIngredient.save();
        return createdIngredient;
    }
    async update(ingredientId, updateIngredientDto) {
        return await this.ingredientModel.findByIdAndUpdate(ingredientId, updateIngredientDto, {
            new: true,
        });
    }
    async delete(ingredientId) {
        return await this.ingredientModel.findByIdAndDelete(ingredientId);
    }
    async checkCanMake(ingredientId, amount) {
        const ingredient = await this.ingredientModel.findById(ingredientId);
        return ingredient.amount >= amount;
    }
};
exports.IngredientService = IngredientService;
exports.IngredientService = IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(ingredient_schema_1.Ingredient.name)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], IngredientService);
//# sourceMappingURL=ingredient.service.js.map