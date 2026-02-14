/**
 * Native Download Helper
 * 
 * Provides file-saving functionality for native platforms (Android/iOS).
 * On native, uses Capacitor Filesystem plugin to write files to the
 * device's Downloads directory. On web, falls through to the standard
 * <a> tag download pattern.
 */

import { isNativePlatform } from '@/lib/utils/platform';

/**
 * Convert a Blob to a base64 string
 */
async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            // Remove data URL prefix (e.g., "data:application/pdf;base64,")
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Save a file natively using Capacitor Filesystem
 * 
 * Writes the blob to the device's Downloads folder and optionally
 * opens the share sheet.
 */
export async function saveFileNatively(
    blob: Blob,
    filename: string,
    options?: { share?: boolean }
): Promise<{ success: boolean; path?: string; error?: string }> {
    try {
        // Dynamically import Capacitor plugins to avoid bundling issues on web
        const { Filesystem, Directory } = await import('@capacitor/filesystem');

        const base64Data = await blobToBase64(blob);

        // Write to the Downloads directory
        const result = await Filesystem.writeFile({
            path: `Download/${filename}`,
            data: base64Data,
            directory: Directory.ExternalStorage,
            recursive: true,
        });

        // Optionally share the file
        if (options?.share) {
            try {
                const { Share } = await import('@capacitor/share');
                await Share.share({
                    title: filename,
                    url: result.uri,
                });
            } catch {
                // Share cancelled or unavailable — not a critical error
            }
        }

        return { success: true, path: result.uri };
    } catch (error) {
        // Fallback: try the Documents directory if ExternalStorage fails
        try {
            const { Filesystem, Directory } = await import('@capacitor/filesystem');
            const base64Data = await blobToBase64(blob);

            const result = await Filesystem.writeFile({
                path: filename,
                data: base64Data,
                directory: Directory.Documents,
                recursive: true,
            });

            return { success: true, path: result.uri };
        } catch (fallbackError) {
            const errorMessage = fallbackError instanceof Error
                ? fallbackError.message
                : 'Unknown error saving file';
            return { success: false, error: errorMessage };
        }
    }
}

/**
 * Download a file — platform-aware
 * 
 * On native: saves to device filesystem
 * On web: uses the standard <a> tag download trick
 */
export async function downloadFile(
    blob: Blob,
    filename: string
): Promise<{ success: boolean; error?: string }> {
    if (isNativePlatform()) {
        return saveFileNatively(blob, filename);
    }

    // Web fallback — standard browser download
    try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 100);

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown download error';
        return { success: false, error: errorMessage };
    }
}
