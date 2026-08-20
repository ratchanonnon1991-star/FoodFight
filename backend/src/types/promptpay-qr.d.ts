declare module 'promptpay-qr' {
  function generatePayload(
    target: string,
    options?: { amount?: number },
  ): string;

  export default generatePayload;
}
