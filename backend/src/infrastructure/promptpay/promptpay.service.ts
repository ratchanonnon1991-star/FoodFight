import { Injectable } from '@nestjs/common';
import generatePayload from 'promptpay-qr';
import * as QRCode from 'qrcode';

@Injectable()
export class PromptPayService {
  /**
   * Builds a real, scannable Thai QR Payment (PromptPay) code as a data URL.
   * `target` is the receiving PromptPay ID (mobile number or citizen ID).
   */
  async generateQrDataUrl(target: string, amount?: number): Promise<string> {
    const payload = generatePayload(target, { amount });
    return QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 400,
    });
  }
}
