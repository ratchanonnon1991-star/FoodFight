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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const auth_service_1 = require("./auth.service");
const change_verification_email_dto_1 = require("./dto/change-verification-email.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const google_login_dto_1 = require("./dto/google-login.dto");
const line_code_dto_1 = require("./dto/line-code.dto");
const line_login_dto_1 = require("./dto/line-login.dto");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const resend_verification_dto_1 = require("./dto/resend-verification.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const verify_email_dto_1 = require("./dto/verify-email.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto) {
        return this.authService.register(dto);
    }
    verifyEmail(dto) {
        return this.authService.verifyEmail(dto);
    }
    resendVerification(dto) {
        return this.authService.resendVerification(dto);
    }
    changeVerificationEmail(dto) {
        return this.authService.changeVerificationEmail(dto);
    }
    login(dto, response) {
        return this.withRefreshCookie(response, this.authService.login(dto));
    }
    loginWithGoogle(dto, response) {
        return this.withRefreshCookie(response, this.authService.loginWithGoogle(dto));
    }
    loginWithLine(dto, response) {
        return this.withRefreshCookie(response, this.authService.loginWithLine(dto));
    }
    loginWithLineCode(dto, response) {
        return this.withRefreshCookie(response, this.authService.loginWithLineCode(dto));
    }
    async refresh(request, response) {
        const result = await this.authService.refresh(this.readRefreshCookie(request) ?? '');
        this.setRefreshCookie(response, result.refreshToken);
        return { accessToken: result.accessToken };
    }
    forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    async logout(request, response) {
        await this.authService.logout(this.readRefreshCookie(request));
        this.clearRefreshCookie(response);
        return { message: 'Logged out successfully' };
    }
    getMe(user) {
        return this.authService.getCurrentUser(user.sub);
    }
    async withRefreshCookie(response, authPromise) {
        const { refreshToken, ...clientResponse } = await authPromise;
        this.setRefreshCookie(response, refreshToken);
        return clientResponse;
    }
    setRefreshCookie(response, refreshToken) {
        const maxAgeSeconds = this.getRefreshTokenMaxAgeSeconds();
        const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
        response.setHeader('Set-Cookie', `${REFRESH_COOKIE_NAME}=${encodeURIComponent(refreshToken)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`);
    }
    clearRefreshCookie(response) {
        response.setHeader('Set-Cookie', `${REFRESH_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`);
    }
    readRefreshCookie(request) {
        const cookieHeader = request.headers.cookie;
        if (!cookieHeader) {
            return undefined;
        }
        const cookie = cookieHeader
            .split(';')
            .map((part) => part.trim())
            .find((part) => part.startsWith(`${REFRESH_COOKIE_NAME}=`));
        return cookie
            ? decodeURIComponent(cookie.slice(REFRESH_COOKIE_NAME.length + 1))
            : undefined;
    }
    getRefreshTokenMaxAgeSeconds() {
        const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30);
        return Math.max(1, days) * 24 * 60 * 60;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('resend-verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_verification_dto_1.ResendVerificationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendVerification", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('change-verification-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_verification_email_dto_1.ChangeVerificationEmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changeVerificationEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_login_dto_1.GoogleLoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginWithGoogle", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('line'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [line_login_dto_1.LineLoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginWithLine", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('line/code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [line_code_dto_1.LineCodeDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginWithLineCode", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
const REFRESH_COOKIE_NAME = 'foodfighter_refresh_token';
//# sourceMappingURL=auth.controller.js.map