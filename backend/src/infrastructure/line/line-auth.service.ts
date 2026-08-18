import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type LineProfile = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

type LineVerifyResponse = {
  sub: string;
  name: string;
  email?: string;
  picture?: string;
};

@Injectable()
export class LineAuthService {
  constructor(private readonly configService: ConfigService) {}

  async verifyIdToken(idToken: string): Promise<LineProfile> {
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID');

    const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ id_token: idToken, client_id: clientId! }),
    });

    if (!response.ok) {
      throw new UnauthorizedException('Invalid LINE ID token');
    }

    const payload = (await response.json()) as LineVerifyResponse;
    if (!payload.email) {
      throw new UnauthorizedException(
        'LINE account must have a verified email to sign in',
      );
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }
}
