import { ConfigService } from '@nestjs/config';
export interface ExtractedReceiptItem {
    name: string;
    quantity: number;
    unitPrice: number;
}
export interface ExtractedReceiptCharges {
    serviceCharge: number;
    tax: number;
    discount: number;
}
export type ReceiptOcrResult = ({
    ok: true;
    items: ExtractedReceiptItem[];
} & ExtractedReceiptCharges) | {
    ok: false;
    reason: string;
};
export declare class ReceiptOcrService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    isConfigured(): boolean;
    extractItems(imageBuffer: Buffer, mimeType: string): Promise<ReceiptOcrResult>;
}
