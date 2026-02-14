'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function SplashScreen() {
    const [show, setShow] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Only show on initial load (session storage check)
        // To allow re-showing for demo, we could use a query param, but for now stick to session.
        const hasSeenSplash = typeof window !== 'undefined' ? sessionStorage.getItem('hasSeenSplash') : null;

        if (hasSeenSplash) {
            setShow(false);
            return;
        }

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasSeenSplash', 'true');
        }

        // Hide after animation duration (2.5s to match CSS)
        const timer = setTimeout(() => setShow(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(var(--color-background))] splash-screen">
            <div className="relative w-32 h-32 flex flex-col items-center">
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-2xl overflow-visible">
                    {/* Background Rect - Animate scale/opacity */}
                    <rect
                        width="32"
                        height="32"
                        rx="6"
                        fill="#3b82f6"
                        className="origin-center animate-logo-pulse"
                    />

                    {/* Text Paths - Animate drawing stroke then fill */}
                    <g className="animate-draw animate-fill">
                        <path
                            d="M8 8h10a4 4 0 010 8H8V8z"
                            fill="white"
                            stroke="white"
                            strokeWidth="0.5"
                            fillOpacity="0"
                        />
                        <path
                            d="M8 16h6v8H8v-8z"
                            fill="white"
                            stroke="white"
                            strokeWidth="0.5"
                            fillOpacity="0"
                        />
                    </g>
                </svg>

                {/* App Name Fade In */}
                <p className="mt-6 text-white font-bold text-2xl tracking-widest animate-[fade-in-up_0.8s_ease-out_0.5s_both]">
                    PDFCraft
                </p>
            </div>
        </div>
    );
}
