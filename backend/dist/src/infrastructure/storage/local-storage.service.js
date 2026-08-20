"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
let LocalStorageService = class LocalStorageService {
    uploadsRoot = (0, node_path_1.join)(process.cwd(), 'uploads');
    async save(file, folder) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            throw new common_1.BadRequestException('Only JPG, PNG or WEBP images are allowed');
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            throw new common_1.BadRequestException('File size must not exceed 5MB');
        }
        const folderPath = (0, node_path_1.join)(this.uploadsRoot, folder);
        await (0, promises_1.mkdir)(folderPath, { recursive: true });
        const fileName = `${(0, node_crypto_1.randomUUID)()}${(0, node_path_1.extname)(file.originalname).toLowerCase()}`;
        await (0, promises_1.writeFile)((0, node_path_1.join)(folderPath, fileName), file.buffer);
        return `/uploads/${folder}/${fileName}`;
    }
    async delete(publicUrl) {
        if (!publicUrl || !publicUrl.startsWith('/uploads/')) {
            return;
        }
        const relativePath = publicUrl.replace('/uploads/', '');
        try {
            await (0, promises_1.unlink)((0, node_path_1.join)(this.uploadsRoot, relativePath));
        }
        catch {
        }
    }
};
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = __decorate([
    (0, common_1.Injectable)()
], LocalStorageService);
//# sourceMappingURL=local-storage.service.js.map