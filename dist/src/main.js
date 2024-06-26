"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const app_config_1 = require("../config/app.config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if ((0, app_config_1.appConfig)().version == 'TEST') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Ingredients-management')
            .setDescription('Ingredients-management API')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen((0, app_config_1.appConfig)().port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map