"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAiJsonObject = isAiJsonObject;
exports.isAiJsonValue = isAiJsonValue;
function isAiJsonObject(value) {
    return (typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.values(value).every(isAiJsonValue));
}
function isAiJsonValue(value) {
    if (value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isAiJsonValue);
    }
    return isAiJsonObject(value);
}
//# sourceMappingURL=ai-json.types.js.map