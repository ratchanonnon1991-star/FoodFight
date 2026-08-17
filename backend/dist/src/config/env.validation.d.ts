import z from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodCoercedNumber<unknown>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodString;
    GOOGLE_CLIENT_ID: z.ZodString;
    LINE_CHANNEL_ID: z.ZodString;
    MAIL_HOST: z.ZodString;
    MAIL_PORT: z.ZodCoercedNumber<unknown>;
    MAIL_USER: z.ZodString;
    MAIL_PASSWORD: z.ZodString;
    MAIL_FROM: z.ZodString;
}, z.core.$strip>;
export declare function validate(config: Record<string, any>): {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    GOOGLE_CLIENT_ID: string;
    LINE_CHANNEL_ID: string;
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
};
export type EnvVariable = z.infer<typeof envSchema>;
export {};
