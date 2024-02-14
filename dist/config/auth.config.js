"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const authConfig = () => ({
    saltround: process.env.SALTROUND,
    ownerSecret: process.env.OWNER_SECRET,
});
exports.authConfig = authConfig;
//# sourceMappingURL=auth.config.js.map