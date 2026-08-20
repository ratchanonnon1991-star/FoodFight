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
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
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
    configService;
    userService;
    bcryptService;
    jwtService;
    googleAuthService;
    lineAuthService;
    mailService;
    passwordResetService;
    constructor(prisma, configService, userService, bcryptService, jwtService, googleAuthService, lineAuthService, mailService, passwordResetService) {
        this.prisma = prisma;
        this.configService = configService;
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
        const otp = this.generateOtp();
        const otpHash = await this.bcryptService.hash(otp);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
        const resendAvailableAt = new Date(now.getTime() + 60 * 1000);
        await this.prisma.emailVerification.create({
            data: {
                userId: user.id,
                otpHash,
                expiresAt,
                resendAvailableAt,
            },
        });
        await this.mailService.sendEmailVerificationOtp(user.email, otp);
        return {
            id: user.id,
            email: user.email,
            expiresAt,
            resendAvailableAt,
            message: 'Verification code has been sent to your email',
        };
    }
    async verifyEmail(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid verification code');
        }
        if (user.emailVerified) {
            return {
                message: 'Email is already verified',
            };
        }
        const verification = await this.prisma.emailVerification.findUnique({
            where: {
                userId: user.id,
            },
        });
        if (!verification) {
            throw new common_1.UnauthorizedException('Verification code expired. Please request a new code.');
        }
        if (verification.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Verification code expired. Please request a new code.');
        }
        const otpMatches = await this.bcryptService.compare(dto.code, verification.otpHash);
        if (!otpMatches) {
            throw new common_1.UnauthorizedException('Invalid verification code. Please check the code and try again.');
        }
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: true,
                },
            }),
            this.prisma.emailVerification.delete({
                where: {
                    userId: user.id,
                },
            }),
        ]);
        return {
            message: 'Email verified successfully',
        };
    }
    async resendVerification(dto) {
        const message = 'Verification code has been sent to your email';
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            return { message };
        }
        if (user.emailVerified) {
            return {
                message: 'Email is already verified',
            };
        }
        const existing = await this.prisma.emailVerification.findUnique({
            where: {
                userId: user.id,
            },
        });
        const now = new Date();
        if (existing && existing.resendAvailableAt > now) {
            return {
                message,
                expiresAt: existing.expiresAt,
                resendAvailableAt: existing.resendAvailableAt,
            };
        }
        const otp = this.generateOtp();
        const otpHash = await this.bcryptService.hash(otp);
        const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
        const resendAvailableAt = new Date(now.getTime() + 60 * 1000);
        await this.prisma.emailVerification.upsert({
            where: {
                userId: user.id,
            },
            update: {
                otpHash,
                expiresAt,
                resendAvailableAt,
            },
            create: {
                userId: user.id,
                otpHash,
                expiresAt,
                resendAvailableAt,
            },
        });
        await this.mailService.sendEmailVerificationOtp(user.email, otp);
        return {
            message,
            expiresAt,
            resendAvailableAt,
        };
    }
    async changeVerificationEmail(dto) {
        const user = await this.userService.findByEmail(dto.currentEmail);
        if (!user) {
            throw new common_1.UnauthorizedException('Verification session not found');
        }
        if (user.emailVerified) {
            throw new common_1.ConflictException('Email is already verified');
        }
        const existingUser = await this.userService.findByEmail(dto.newEmail);
        if (existingUser && existingUser.id !== user.id) {
            throw new common_1.ConflictException('Email already exists');
        }
        const otp = this.generateOtp();
        const otpHash = await this.bcryptService.hash(otp);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
        const resendAvailableAt = new Date(now.getTime() + 60 * 1000);
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: dto.newEmail,
                },
            });
            await tx.emailVerification.upsert({
                where: {
                    userId: user.id,
                },
                update: {
                    otpHash,
                    expiresAt,
                    resendAvailableAt,
                },
                create: {
                    userId: user.id,
                    otpHash,
                    expiresAt,
                    resendAvailableAt,
                },
            });
        });
        await this.mailService.sendEmailVerificationOtp(dto.newEmail, otp);
        return {
            email: dto.newEmail,
            expiresAt,
            resendAvailableAt,
            message: 'Verification code has been sent to your new email',
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
        if (!user.emailVerified) {
            throw new common_1.UnauthorizedException('Please verify your email before logging in');
        }
        const accessToken = await this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return this.createAuthResponse(user.id, accessToken);
    }
    async getCurrentUser(userId) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            sub: user.id,
            email: user.email,
            role: user.role,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
        };
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
        const email = profile.email ?? `line_${profile.sub}@line.local`;
        return this.loginWithOAuth(client_1.AuthProvider.LINE, {
            providerAccountId: profile.sub,
            email,
            displayName: dto.displayName || profile.name,
            avatarUrl: profile.picture,
        });
    }
    async loginWithLineCode(dto) {
        const idToken = await this.lineAuthService.exchangeCodeForIdToken(dto.code);
        return this.loginWithLine({
            idToken,
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
        if (profile.avatarUrl && !user.avatarUrl) {
            user = await this.userService.updateAvatarUrl(user.id, profile.avatarUrl);
        }
        const accessToken = await this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return this.createAuthResponse(user.id, accessToken);
    }
    async createAuthResponse(userId, accessToken) {
        const refreshToken = await this.createRefreshToken(userId);
        const foodProfile = await this.prisma.foodProfile.findUnique({
            where: { userId },
            select: { id: true },
        });
        return {
            accessToken,
            refreshToken,
            foodProfileComplete: Boolean(foodProfile),
        };
    }
    async refresh(refreshToken) {
        const normalizedToken = refreshToken.trim();
        if (!normalizedToken) {
            throw new common_1.UnauthorizedException('Refresh token is missing');
        }
        const tokenHash = this.hashRefreshToken(normalizedToken);
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
            select: {
                id: true,
                userId: true,
                expiresAt: true,
                revokedAt: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
        if (!storedToken ||
            storedToken.revokedAt ||
            storedToken.expiresAt.getTime() <= Date.now()) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const nextRefreshToken = this.generateRefreshToken();
        const nextRefreshTokenHash = this.hashRefreshToken(nextRefreshToken);
        const now = new Date();
        const expiresAt = this.getRefreshTokenExpiry();
        await this.prisma.$transaction(async (tx) => {
            const revoked = await tx.refreshToken.updateMany({
                where: {
                    id: storedToken.id,
                    revokedAt: null,
                },
                data: { revokedAt: now },
            });
            if (revoked.count !== 1) {
                throw new common_1.UnauthorizedException('Refresh token has already been used');
            }
            await tx.refreshToken.create({
                data: {
                    userId: storedToken.userId,
                    tokenHash: nextRefreshTokenHash,
                    expiresAt,
                },
            });
        });
        const accessToken = await this.jwtService.sign({
            sub: storedToken.user.id,
            email: storedToken.user.email,
            role: storedToken.user.role,
        });
        return {
            accessToken,
            refreshToken: nextRefreshToken,
        };
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
        return {
            message,
        };
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
        return {
            message: 'Password has been reset successfully',
        };
    }
    async logout(refreshToken) {
        const normalizedToken = refreshToken?.trim();
        if (!normalizedToken) {
            return;
        }
        await this.prisma.refreshToken.updateMany({
            where: {
                tokenHash: this.hashRefreshToken(normalizedToken),
                revokedAt: null,
            },
            data: { revokedAt: new Date() },
        });
    }
    async createRefreshToken(userId) {
        const refreshToken = this.generateRefreshToken();
        await this.prisma.refreshToken.create({
            data: {
                userId,
                tokenHash: this.hashRefreshToken(refreshToken),
                expiresAt: this.getRefreshTokenExpiry(),
            },
        });
        return refreshToken;
    }
    generateRefreshToken() {
        return (0, node_crypto_1.randomBytes)(48).toString('base64url');
    }
    hashRefreshToken(token) {
        return (0, node_crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    getRefreshTokenExpiry() {
        const days = this.configService.get('REFRESH_TOKEN_EXPIRES_DAYS') ?? 30;
        return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        user_service_1.UserService,
        bcrypt_service_1.BcryptService,
        jwt_service_1.JwtService,
        google_auth_service_1.GoogleAuthService,
        line_auth_service_1.LineAuthService,
        mail_service_1.MailService,
        password_reset_service_1.PasswordResetService])
], AuthService);
//# sourceMappingURL=auth.service.js.map