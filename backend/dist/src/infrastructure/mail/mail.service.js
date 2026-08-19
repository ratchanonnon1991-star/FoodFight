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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
let MailService = class MailService {
    configService;
    transporter;
    from;
    constructor(configService) {
        this.configService = configService;
        const port = this.configService.get('MAIL_PORT');
        this.transporter = nodemailer_1.default.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port,
            secure: port === 465,
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASSWORD'),
            },
        });
        this.from = this.configService.get('MAIL_FROM');
    }
    async sendPasswordResetOtp(to, otp) {
        await this.transporter.sendMail({
            from: this.from,
            to,
            subject: 'Your FoodFighter password reset code',
            text: `Your password reset code is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`,
            html: `
        <p>
          Your password reset code is
          <strong>${otp}</strong>.
        </p>
        <p>
          It expires in 5 minutes.
          Do not share this code with anyone.
        </p>
      `,
        });
    }
    async sendEmailVerificationOtp(to, otp) {
        await this.transporter.sendMail({
            from: this.from,
            to,
            subject: 'Verify your FoodFighter email',
            text: `Your FoodFighter verification code is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`,
            html: `
        <p>
          Your FoodFighter verification code is
          <strong>${otp}</strong>.
        </p>
        <p>
          It expires in 5 minutes.
          Do not share this code with anyone.
        </p>
      `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map