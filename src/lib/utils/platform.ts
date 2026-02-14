/**
 * Platform Detection Utility
 * 
 * Detects whether the app is running inside a Capacitor native shell
 * or in a regular web browser.
 */

import { Capacitor } from '@capacitor/core';

/**
 * Check if running inside a native app (Android/iOS)
 */
export function isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
}

/**
 * Get the current platform
 */
export function getPlatform(): 'android' | 'ios' | 'web' {
    return Capacitor.getPlatform() as 'android' | 'ios' | 'web';
}

/**
 * Check if running on Android
 */
export function isAndroid(): boolean {
    return Capacitor.getPlatform() === 'android';
}

/**
 * Check if running on iOS
 */
export function isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios';
}

/**
 * Check if running in a regular web browser
 */
export function isWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
}
