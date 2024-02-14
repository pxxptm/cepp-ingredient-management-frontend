"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModule = void 0;
const common_1 = require("@nestjs/common");
const restaurant_controller_1 = require("./restaurant.controller");
const restaurant_service_1 = require("./restaurant.service");
const mongoose_1 = require("@nestjs/mongoose");
const restaurant_schema_1 = require("./schema/restaurant.schema");
const member_module_1 = require("../member/member.module");
let RestaurantModule = class RestaurantModule {
};
exports.RestaurantModule = RestaurantModule;
exports.RestaurantModule = RestaurantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: restaurant_schema_1.Restaurant.name, schema: restaurant_schema_1.RestaurantSchema },
            ]),
            (0, common_1.forwardRef)(() => member_module_1.MemberModule),
        ],
        controllers: [restaurant_controller_1.RestaurantController],
        providers: [restaurant_service_1.RestaurantService],
        exports: [restaurant_service_1.RestaurantService],
    })
], RestaurantModule);
//# sourceMappingURL=restaurant.module.js.map