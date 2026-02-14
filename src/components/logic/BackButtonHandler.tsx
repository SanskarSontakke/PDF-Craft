'use client';

import { useEffect, useRef } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';

export function BackButtonHandler() {
    const router = useRouter();
    const pathname = usePathname();
    const currentPathRef = useRef(pathname);

    // Keep ref up to date avoiding re-subscription
    useEffect(() => {
        currentPathRef.current = pathname;
    }, [pathname]);

    useEffect(() => {
        let backButtonListener: any;

        const setupListener = async () => {
            try {
                backButtonListener = await App.addListener('backButton', ({ canGoBack }) => {
                    const currentPath = currentPathRef.current;

                    // Check if we are on a specific tool page (e.g. /en/tools/merge-pdf)
                    // Exclude /tools listing and /tools/category/... pages if any
                    const isToolPage = /\/tools\/[^/]+$/.test(currentPath) && !currentPath.includes('/category/');

                    if (isToolPage) {
                        // Navigate to Home
                        // Extract locale from path start /en/... -> en
                        const localeMatch = currentPath.match(/^\/([^/]+)/);
                        const locale = localeMatch ? localeMatch[1] : 'en';
                        router.push(`/${locale}`);
                    } else if (canGoBack) {
                        window.history.back();
                    } else {
                        App.exitApp();
                    }
                });
            } catch (error) {
                console.warn('Back button listener failed:', error);
            }
        };

        setupListener();

        return () => {
            if (backButtonListener) {
                backButtonListener.remove();
            }
        };
    }, [router]);

    return null;
}
