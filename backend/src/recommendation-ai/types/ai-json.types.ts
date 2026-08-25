export type AiJsonPrimitive = string | number | boolean | null;

export type AiJsonValue = AiJsonPrimitive | AiJsonObject | AiJsonValue[];

export interface AiJsonObject {
  [key: string]: AiJsonValue;
}

export function isAiJsonObject(value: unknown): value is AiJsonObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(isAiJsonValue)
  );
}

export function isAiJsonValue(value: unknown): value is AiJsonValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isAiJsonValue);
  }

  return isAiJsonObject(value);
}
