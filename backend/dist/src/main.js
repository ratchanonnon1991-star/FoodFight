"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const node_path_1 = require("node:path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
    });
    app.use((0, express_1.json)({ limit: '8mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '8mb' }));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        credentials: true,
    });
    app.useStaticAssets((0, node_path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    await app.listen(process.env.PORT ?? 8888);
}
bootstrap().catch((error) => {
    const logger = new common_1.Logger('Bootstrap');
    logger.error('Application failed to start', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map