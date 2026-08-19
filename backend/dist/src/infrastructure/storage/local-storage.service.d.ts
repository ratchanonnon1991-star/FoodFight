export type UploadFolder = 'receipts' | 'slips' | 'payment-accounts';
export declare class LocalStorageService {
    private readonly uploadsRoot;
    save(file: Express.Multer.File, folder: UploadFolder): Promise<string>;
    delete(publicUrl: string | null | undefined): Promise<void>;
}
