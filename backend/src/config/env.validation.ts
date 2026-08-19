import { Logger } from '@nestjs/common';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().max(65535).min(0),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(1),

  JWT_EXPIRES_IN: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),

  LINE_CHANNEL_ID: z.string().min(1),

  LINE_CHANNEL_SECRET: z.string().min(1),

  LINE_CALLBACK_URL: z.string().url(),

  MAIL_HOST: z.string().min(1),

  MAIL_PORT: z.coerce.number().int().min(0).max(65535),

  MAIL_USER: z.string().min(1),

  MAIL_PASSWORD: z.string().min(1),

  MAIL_FROM: z.string().min(1),

  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
});

export function validate(config: Record<string, any>) {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    const logger = new Logger('EnvValidation');

    logger.error('Env validation failed', z.prettifyError(parsed.error));

    throw new Error('Env validation failed');
  }

  return parsed.data;
}

export type EnvVariable = z.infer<typeof envSchema>;
