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
    DATABASE_URL: zod_1.default.string().min(1),
    JWT_SECRET: zod_1.default.string().min(1),
    JWT_EXPIRES_IN: zod_1.default.string().min(1),
    REFRESH_TOKEN_EXPIRES_DAYS: zod_1.default.coerce.number().int().min(1).default(30),
    GOOGLE_CLIENT_ID: zod_1.default.string().min(1),
    LINE_CHANNEL_ID: zod_1.default.string().min(1),
    LINE_CHANNEL_SECRET: zod_1.default.string().min(1),
    LINE_CALLBACK_URL: zod_1.default.string().url(),
    MAIL_HOST: zod_1.default.string().min(1),
    MAIL_PORT: zod_1.default.coerce.number().int().min(0).max(65535),
    MAIL_USER: zod_1.default.string().min(1),
    MAIL_PASSWORD: zod_1.default.string().min(1),
    MAIL_FROM: zod_1.default.string().min(1),
    FRONTEND_URL: zod_1.default.string().url().default('http://localhost:3000'),
    GOOGLE_AI_API_KEY: zod_1.default.string().min(1).optional(),
    AI_SERVICE_URL: zod_1.default.string().url().default('http://127.0.0.1:8001'),
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