"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trim = Trim;
const class_transformer_1 = require("class-transformer");
function Trim() {
    return (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() : value);
}
//# sourceMappingURL=trim.decorator.js.map