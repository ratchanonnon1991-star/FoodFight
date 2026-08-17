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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let LineAuthService = class LineAuthService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async verifyIdToken(idToken) {
        const clientId = this.configService.get('LINE_CHANNEL_ID');
        const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ id_token: idToken, client_id: clientId }),
        });
        if (!response.ok) {
            throw new common_1.UnauthorizedException('Invalid LINE ID token');
        }
        const payload = (await response.json());
        if (!payload.email) {
            throw new common_1.UnauthorizedException('LINE account must have a verified email to sign in');
        }
        return {
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        };
    }
};
exports.LineAuthService = LineAuthService;
exports.LineAuthService = LineAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LineAuthService);
//# sourceMappingURL=line-auth.service.js.map