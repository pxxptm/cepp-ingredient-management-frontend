"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioClientModule = void 0;
const common_1 = require("@nestjs/common");
const minio_client_service_1 = require("./minio-client.service");
const nestjs_minio_client_1 = require("nestjs-minio-client");
let MinioClientModule = class MinioClientModule {
};
exports.MinioClientModule = MinioClientModule;
exports.MinioClientModule = MinioClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_minio_client_1.MinioModule.register({
                endPoint: '10.20.23.35',
                port: 9000,
                useSSL: false,
                accessKey: 'JXNVpF0AulqAC4VoHoms',
                secretKey: 'WbWkib0Q3j0XrjnQ8Q0DEjSm8UGzVQST3Zfyq3O8',
            }),
        ],
        providers: [minio_client_service_1.MinioClientService],
        exports: [minio_client_service_1.MinioClientService],
    })
], MinioClientModule);
//# sourceMappingURL=minio-client.module.js.map