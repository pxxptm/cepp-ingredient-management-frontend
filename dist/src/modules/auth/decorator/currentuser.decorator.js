"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((key, context) => {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
        throw new common_1.UnauthorizedException();
    }
    return user;
});
//# sourceMappingURL=currentuser.decorator.js.map