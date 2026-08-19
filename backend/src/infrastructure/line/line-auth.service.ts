import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type LineProfile = {
  sub: string;
  email?: string;
  name: string;
  picture?: string;
};

type LineVerifyResponse = {
  sub: string;
  name: string;
  email?: string;
  picture?: string;
};

type LineTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token?: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
};

@Injectable()
export class LineAuthService {
  constructor(private readonly configService: ConfigService) {}

  async exchangeCodeForIdToken(code: string): Promise<string> {
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID');

    const clientSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');

    const redirectUri = this.configService.get<string>('LINE_CALLBACK_URL');

    if (!clientId || !clientSecret || !redirectUri) {
      throw new UnauthorizedException('LINE authentication is not configured');
    }

    let response: Response;

    try {
      response = await fetch('https://api.line.me/oauth2/v2.1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });
    } catch (error) {
      console.error('[LINE TOKEN EXCHANGE NETWORK ERROR]', error);

      throw new ServiceUnavailableException(
        'Unable to connect to LINE. Please check the backend network connection.',
      );
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');

      console.error('[LINE TOKEN EXCHANGE FAILED]', response.status, errorText);

      throw new UnauthorizedException(
        'Failed to exchange LINE authorization code',
      );
    }

    const data = (await response.json()) as LineTokenResponse;

    if (!data.id_token) {
      throw new UnauthorizedException('LINE did not return an ID token');
    }

    return data.id_token;
  }

  async verifyIdToken(idToken: string): Promise<LineProfile> {
    const clientId = this.configService.get<string>('LINE_CHANNEL_ID');

    if (!clientId) {
      throw new UnauthorizedException('LINE authentication is not configured');
    }

    let response: Response;

    try {
      response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id_token: idToken,
          client_id: clientId,
        }),
      });
    } catch (error) {
      console.error('[LINE ID TOKEN VERIFY NETWORK ERROR]', error);

      throw new ServiceUnavailableException(
        'Unable to connect to LINE. Please check the backend network connection.',
      );
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');

      console.error(
        '[LINE ID TOKEN VERIFY FAILED]',
        response.status,
        errorText,
      );

      throw new UnauthorizedException('Invalid LINE ID token');
    }

    const payload = (await response.json()) as LineVerifyResponse;

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }
}
