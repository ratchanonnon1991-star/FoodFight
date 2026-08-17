import z from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare function validate(config: Record<string, any>): {
    PORT: number;
};
export type EnvVariable = z.infer<typeof envSchema>;
export {};
