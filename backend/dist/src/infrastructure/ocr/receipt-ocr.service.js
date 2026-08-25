"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReceiptOcrService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptOcrService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const GEMINI_MODEL = 'gemini-3.6-flash';
const REQUEST_TIMEOUT_MS = 60_000;
const EXTRACTION_PROMPT = `You are reading a photo of a restaurant receipt. It may be in Thai or English and may be handwritten or printed.

Extract every purchased food/drink line item. For each item return:
- name: the item name as written (keep Thai text as-is, don't translate)
- quantity: how many units were ordered (default to 1 if not shown)
- unitPrice: the price PER UNIT in the receipt's currency, as a plain number (not the line total, not a formatted string)

Do NOT include subtotal, service charge, VAT/tax, discount, rounding, or total rows as items - those are reported separately below.

Also read these totals rows if present on the receipt, as plain absolute currency amounts (not percentages, not formatted strings):
- serviceCharge: the "service charge" line amount (e.g. ค่าบริการ). 0 if not on the receipt.
- tax: the VAT/tax line amount (e.g. ภาษีมูลค่าเพิ่ม, VAT). 0 if not on the receipt.
- discount: any discount/promotion line amount (e.g. ส่วนลด), as a positive number. 0 if not on the receipt.

If the image is not a receipt or no items are readable, return an empty items array and 0 for all charges.
Respond with JSON only, matching the given schema.`;
const RESPONSE_SCHEMA = {
    type: 'OBJECT',
    properties: {
        items: {
            type: 'ARRAY',
            items: {
                type: 'OBJECT',
                properties: {
                    name: { type: 'STRING' },
                    quantity: { type: 'INTEGER' },
                    unitPrice: { type: 'NUMBER' },
                },
                required: ['name', 'quantity', 'unitPrice'],
            },
        },
        serviceCharge: { type: 'NUMBER' },
        tax: { type: 'NUMBER' },
        discount: { type: 'NUMBER' },
    },
    required: ['items', 'serviceCharge', 'tax', 'discount'],
};
let ReceiptOcrService = ReceiptOcrService_1 = class ReceiptOcrService {
    configService;
    logger = new common_1.Logger(ReceiptOcrService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    isConfigured() {
        return !!this.configService.get('GOOGLE_AI_API_KEY');
    }
    async extractItems(imageBuffer, mimeType) {
        const apiKey = this.configService.get('GOOGLE_AI_API_KEY');
        if (!apiKey) {
            return { ok: false, reason: 'OCR is not configured' };
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: EXTRACTION_PROMPT },
                                {
                                    inline_data: {
                                        mime_type: mimeType,
                                        data: imageBuffer.toString('base64'),
                                    },
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        responseMimeType: 'application/json',
                        responseSchema: RESPONSE_SCHEMA,
                    },
                }),
            });
            if (!response.ok) {
                const errorBody = await response.text().catch(() => '');
                this.logger.warn(`Gemini OCR request failed: ${response.status} ${errorBody}`);
                return { ok: false, reason: 'OCR request failed' };
            }
            const data = (await response.json());
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                return { ok: false, reason: 'OCR returned no content' };
            }
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed.items)) {
                return { ok: false, reason: 'OCR returned an unexpected shape' };
            }
            const items = parsed.items
                .filter((item) => typeof item === 'object' &&
                item !== null &&
                typeof item.name === 'string' &&
                item.name.trim().length > 0 &&
                Number.isFinite(item.unitPrice))
                .map((item) => ({
                name: item.name.trim(),
                quantity: Number.isFinite(item.quantity) && item.quantity > 0
                    ? Math.round(item.quantity)
                    : 1,
                unitPrice: Math.max(0, item.unitPrice),
            }));
            const toAmount = (value) => Number.isFinite(value) ? Math.max(0, value) : 0;
            return {
                ok: true,
                items,
                serviceCharge: toAmount(parsed.serviceCharge),
                tax: toAmount(parsed.tax),
                discount: toAmount(parsed.discount),
            };
        }
        catch (error) {
            this.logger.warn(`Gemini OCR request errored: ${error instanceof Error ? error.message : String(error)}`);
            return { ok: false, reason: 'OCR request errored' };
        }
        finally {
            clearTimeout(timeout);
        }
    }
};
exports.ReceiptOcrService = ReceiptOcrService;
exports.ReceiptOcrService = ReceiptOcrService = ReceiptOcrService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ReceiptOcrService);
//# sourceMappingURL=receipt-ocr.service.js.map