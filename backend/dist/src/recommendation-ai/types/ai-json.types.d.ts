export type AiJsonPrimitive = string | number | boolean | null;
export type AiJsonValue = AiJsonPrimitive | AiJsonObject | AiJsonValue[];
export interface AiJsonObject {
    [key: string]: AiJsonValue;
}
export declare function isAiJsonObject(value: unknown): value is AiJsonObject;
export declare function isAiJsonValue(value: unknown): value is AiJsonValue;
