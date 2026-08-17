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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt_service_1 = require("../infrastructure/hash/bcrypt.service");
const google_auth_service_1 = require("../infrastructure/google/google-auth.service");
const jwt_service_1 = require("../infrastructure/jwt/jwt.service");
const line_auth_service_1 = require("../infrastructure/line/line-auth.service");
const mail_service_1 = require("../infrastructure/mail/mail.service");
const user_service_1 = require("../user/user.service");
const password_reset_service_1 = require("./password-reset.service");
let AuthService = class AuthService {
    prisma;
    userService;
    bcryptService;
    jwtService;
    googleAuthService;
    lineAuthService;
    mailService;
    passwordResetService;
    constructor(prisma, userService, bcryptService, jwtService, googleAuthService, lineAuthService, mailService, passwordResetService) {
        this.prisma = prisma;
        this.userService = userService;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.googleAuthService = googleAuthService;
        this.lineAuthService = lineAuthService;
        this.mailService = mailService;
        this.passwordResetService = passwordResetService;
    }
    async register(dto) {
        const userByEmail = await this.userService.findByEmail(dto.email);
        if (userByEmail) {
            throw new common_1.ConflictException('Email already exists');
        }
        const passwordHash = await this.bcryptService.hash(dto.password);
        const user = await this.userService.create({
            displayName: dto.displayName,
            email: dto.email,
            passwordHash,
        });
        return {
            id: user.id,
            email: user.email,
        };
    }
    async login(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordMatches = await this.bcryptService.compare(dto.password, user.passwordHash);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const accessToken = await this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return { accessToken };
    }
    async loginWithGoogle(dto) {
        const profile = await this.googleAuthService.verifyIdToken(dto.idToken);
        return this.loginWithOAuth(client_1.AuthProvider.GOOGLE, {
            providerAccountId: profile.sub,
            email: profile.email,
            displayName: dto.displayName || profile.name,
            avatarUrl: profile.picture,
        });
    }
    async loginWithLine(dto) {
        const profile = await this.lineAuthService.verifyIdToken(dto.idToken);
        return this.loginWithOAuth(client_1.AuthProvider.LINE, {
            providerAccountId: profile.sub,
            email: profile.email,
            displayName: dto.displayName || profile.name,
            avatarUrl: profile.picture,
        });
    }
    async loginWithOAuth(provider, profile) {
        let user = await this.userService.findUserByProviderAccount(provider, profile.providerAccountId);
        if (!user) {
            const userByEmail = await this.userService.findByEmail(profile.email);
            if (userByEmail) {
                await this.userService.linkAccount(userByEmail.id, provider, profile.providerAccountId);
                user = userByEmail;
            }
            else {
                user = await this.userService.createUserWithAccount({
                    displayName: profile.displayName,
                    email: profile.email,
                    provider,
                    providerAccountId: profile.providerAccountId,
                    avatarUrl: profile.avatarUrl,
                });
            }
        }
        if (profile.avatarUrl && profile.avatarUrl !== user.avatarUrl) {
            user = await this.userService.updateAvatarUrl(user.id, profile.avatarUrl);
        }
        const accessToken = await this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return { accessToken };
    }
    async forgotPassword(dto) {
        const message = 'A password reset code has been sent to your email';
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            return { message };
        }
        const existing = await this.passwordResetService.findLatestActive(user.id);
        if (existing && existing.resendAvailableAt > new Date()) {
            return { message };
        }
        const otp = this.generateOtp();
        const tokenHash = await this.bcryptService.hash(otp);
        await this.passwordResetService.create(user.id, tokenHash);
        await this.mailService.sendPasswordResetOtp(user.email, otp);
        return { message };
    }
    async resetPassword(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Verification code expired. Please request a new code.');
        }
        const passwordReset = await this.passwordResetService.findLatestActive(user.id);
        if (!passwordReset || passwordReset.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Verification code expired. Please request a new code.');
        }
        const otpMatches = await this.bcryptService.compare(dto.otp, passwordReset.tokenHash);
        if (!otpMatches) {
            throw new common_1.UnauthorizedException('Invalid verification code. Please check the code and try again');
        }
        await this.prisma.$transaction(async (tx) => {
            await this.userService.updatePassword(user.id, dto.password, tx);
            await this.passwordResetService.markUsed(passwordReset.id, tx);
        });
        return { message: 'Password has been reset successfully' };
    }
    logout() { }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        bcrypt_service_1.BcryptService,
        jwt_service_1.JwtService,
        google_auth_service_1.GoogleAuthService,
        line_auth_service_1.LineAuthService,
        mail_service_1.MailService,
        password_reset_service_1.PasswordResetService])
], AuthService);
//# sourceMappingURL=auth.service.js.map