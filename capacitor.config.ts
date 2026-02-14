import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pdfcraft.app',
  appName: 'PDFCraft',
  webDir: 'out',
  server: {
    // Use https scheme for WASM/Worker/Service Worker compatibility
    androidScheme: 'https',
  },
  android: {
    // Allow mixed content for local WASM loading
    allowMixedContent: true,
    // WebView settings for better performance with WASM
    webContentsDebuggingEnabled: true,
  },
};

export default config;
