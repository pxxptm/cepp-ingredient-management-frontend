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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const component_service_1 = require("../component/component.service");
const ingredient_service_1 = require("../ingredient/ingredient.service");
const component_schema_1 = require("../component/schema/component.schema");
let OrderService = class OrderService {
    constructor(componentService, ingredientService) {
        this.componentService = componentService;
        this.ingredientService = ingredientService;
    }
    async checkCanMake(menuId, amount) {
        const components = await this.componentService.findByMenuId(menuId);
        const componentsPromise = components.map(async (component) => {
            const ingredient = await this.ingredientService.getById(component.ingredientId);
            const canMake = await this.ingredientService.checkCanMake(component.ingredientId, component.ingredientAmount * amount);
            if (!canMake) {
                if (component.priority == component_schema_1.Priority.HIGH) {
                    return {
                        name: ingredient.name,
                        status: 'Out of Stock, can not make this menu',
                    };
                }
                else if (component.priority == component_schema_1.Priority.LOW) {
                    return {
                        name: ingredient.name,
                        status: 'Out of Stock, but can make this menu',
                    };
                }
            }
            else {
                return {
                    name: ingredient.name,
                    status: 'OK',
                };
            }
        });
        const response = await Promise.all(componentsPromise);
        return response;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [component_service_1.ComponentService,
        ingredient_service_1.IngredientService])
], OrderService);
//# sourceMappingURL=order.service.js.map