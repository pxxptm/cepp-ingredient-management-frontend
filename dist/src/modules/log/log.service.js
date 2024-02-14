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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const log_shema_1 = require("./schema/log.shema");
let LogService = class LogService {
    constructor(logModel) {
        this.logModel = logModel;
    }
    async findByRestaurantId(restaurantId) {
        return await this.logModel.find({ restaurantId: restaurantId });
    }
    async create(createLogDto) {
        const createdLog = new this.logModel(createLogDto);
        await createdLog.save();
        return createdLog;
    }
    async update(logId, updateLogDto) {
        return await this.logModel.findByIdAndUpdate(logId, updateLogDto, {
            new: true,
        });
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(log_shema_1.Log.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LogService);
//# sourceMappingURL=log.service.js.map