'use client';

import React from 'react';
import { BackButtonHandler } from '@/components/logic/BackButtonHandler';
import { SplashScreen } from '@/components/ui/SplashScreen';

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SplashScreen />
            <BackButtonHandler />
            {children}
        </>
    );
}
