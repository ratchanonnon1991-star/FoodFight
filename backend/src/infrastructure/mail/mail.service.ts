import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter;
  private readonly from: string;

  constructor(private readonly configService: ConfigService) {
    const port = this.configService.get<number>('MAIL_PORT');

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port,
      secure: port === 465,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    this.from = this.configService.get<string>('MAIL_FROM')!;
  }

  async sendPasswordResetOtp(to: string, otp: string): Promise<void> {
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

  async sendEmailVerificationOtp(to: string, otp: string): Promise<void> {
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
}
