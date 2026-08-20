// Receipts often carry small, dense (sometimes handwritten) Thai text, so this
// stays well above a "looks fine on screen" resolution - OCR needs the extra
// detail even though it costs more upload time.
const MAX_DIMENSION_DEFAULT = 2400;
const MAX_DIMENSION_LOW_RAM = 1800;
const JPEG_QUALITY_DEFAULT = 0.92;
const JPEG_QUALITY_LOW_RAM = 0.8;
const LOW_RAM_THRESHOLD_GB = 4;

/**
 * navigator.deviceMemory is Chromium-only and reports a rounded, capped value
 * (never above 8). Absence just means "unknown", not "low RAM" - treat it as default tier.
 */
function isLowRamDevice(): boolean {
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return typeof deviceMemory === "number" && deviceMemory <= LOW_RAM_THRESHOLD_GB;
}

interface CompressionSettings {
  maxDimension: number;
  jpegQuality: number;
}

function getCompressionSettings(): CompressionSettings {
  if (isLowRamDevice()) {
    return { maxDimension: MAX_DIMENSION_LOW_RAM, jpegQuality: JPEG_QUALITY_LOW_RAM };
  }
  return { maxDimension: MAX_DIMENSION_DEFAULT, jpegQuality: JPEG_QUALITY_DEFAULT };
}

function getScale(bitmap: ImageBitmap, maxDimension: number): number {
  return Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
}

function drawScaledBitmap(bitmap: ImageBitmap, scale: number): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function canvasToJpegBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

function toJpegFile(originalName: string, blob: Blob): File {
  const nameWithoutExtension = originalName.replace(/\.\w+$/, "");
  return new File([blob], `${nameWithoutExtension}.jpg`, { type: "image/jpeg" });
}

/** Downscales and re-encodes an image file as JPEG so uploads/OCR run faster. */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const { maxDimension, jpegQuality } = getCompressionSettings();

  const bitmap = await createImageBitmap(file);
  try {
    const scale = getScale(bitmap, maxDimension);
    const alreadySmallEnoughJpeg = scale === 1 && file.type === "image/jpeg";
    if (alreadySmallEnoughJpeg) {
      return file;
    }

    const canvas = drawScaledBitmap(bitmap, scale);
    if (!canvas) {
      return file;
    }

    const blob = await canvasToJpegBlob(canvas, jpegQuality);
    if (!blob) {
      return file;
    }

    return toJpegFile(file.name, blob);
  } finally {
    bitmap.close();
  }
}
