import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export type UploadFolder = 'receipts' | 'slips' | 'payment-accounts';

@Injectable()
export class LocalStorageService {
  private readonly uploadsRoot = join(process.cwd(), 'uploads');

  async save(file: Express.Multer.File, folder: UploadFolder): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw new BadRequestException('Only JPG, PNG or WEBP images are allowed');
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException('File size must not exceed 5MB');
    }

    const folderPath = join(this.uploadsRoot, folder);
    await mkdir(folderPath, { recursive: true });

    const fileName = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
    await writeFile(join(folderPath, fileName), file.buffer);

    return `/uploads/${folder}/${fileName}`;
  }

  async delete(publicUrl: string | null | undefined): Promise<void> {
    if (!publicUrl || !publicUrl.startsWith('/uploads/')) {
      return;
    }

    const relativePath = publicUrl.replace('/uploads/', '');
    try {
      await unlink(join(this.uploadsRoot, relativePath));
    } catch {
      // File already missing - nothing to clean up.
    }
  }
}
