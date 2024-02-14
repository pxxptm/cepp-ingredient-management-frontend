"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./modules/user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../config/database.config");
const auth_module_1 = require("./modules/auth/auth.module");
const menu_module_1 = require("./modules/menu/menu.module");
const restaurant_module_1 = require("./modules/restaurant/restaurant.module");
const member_module_1 = require("./modules/member/member.module");
const ingredient_module_1 = require("./modules/ingredient/ingredient.module");
const component_module_1 = require("./modules/component/component.module");
const log_module_1 = require("./modules/log/log.module");
const order_module_1 = require("./modules/order/order.module");
const minio_client_module_1 = require("./modules/minio-client/minio-client.module");
const file_upload_module_1 = require("./modules/file-upload/file-upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `config/configuration`,
            }),
            mongoose_1.MongooseModule.forRoot((0, database_config_1.databaseConfig)().url),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            menu_module_1.MenuModule,
            restaurant_module_1.RestaurantModule,
            member_module_1.MemberModule,
            ingredient_module_1.IngredientModule,
            component_module_1.ComponentModule,
            log_module_1.LogModule,
            order_module_1.OrderModule,
            minio_client_module_1.MinioClientModule,
            file_upload_module_1.FileUploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map