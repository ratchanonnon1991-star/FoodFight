"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const common_1 = require("@nestjs/common");
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number().int().max(65535).min(0),
});
function validate(config) {
    const parsed = envSchema.safeParse(config);
    if (!parsed.success) {
        const logger = new common_1.Logger('EnvValidation');
        logger.error('Env validation failed', zod_1.default.prettifyError(parsed.error));
        throw new Error('Env validation failed');
    }
    return parsed.data;
}
//# sourceMappingURL=env.validation.js.map