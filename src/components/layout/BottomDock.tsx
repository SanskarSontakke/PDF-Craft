'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, Search, Grid3X3, Globe, Command, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { searchTools, SearchResult } from '@/lib/utils/search';
import { getToolContent } from '@/config/tool-content';
import { getAllTools } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { LanguageSelector } from './LanguageSelector';

export interface BottomDockProps {
    locale: Locale;
}

export const BottomDock: React.FC<BottomDockProps> = ({ locale }) => {
    const t = useTranslations('common');
    const pathname = usePathname();
    const router = useRouter();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isDockCollapsed, setIsDockCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [localizedTools, setLocalizedTools] = useState<Record<string, { title: string; description: string }>>({});
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchPanelRef = useRef<HTMLDivElement>(null);
    const langPanelRef = useRef<HTMLDivElement>(null);

    // Determine active item
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
    const isTools = pathname.startsWith(`/${locale}/tools`);

    // Detect if we're on a specific tool page (not the tools listing or category)
    const isToolPage = /\/tools\/[^/]+$/.test(pathname) && !pathname.includes('/category/');

    // Dock position: top on tool pages, bottom on other pages
    const isTopPosition = isToolPage;

    // Load localized tool content on mount
    useEffect(() => {
        const allTools = getAllTools();
        const contentMap: Record<string, { title: string; description: string }> = {};

        allTools.forEach(tool => {
            const content = getToolContent(locale, tool.id);
            if (content) {
                contentMap[tool.id] = {
                    title: content.title,
                    description: content.metaDescription
                };
            }
        });

        setLocalizedTools(contentMap);
    }, [locale]);

    // Search logic
    useEffect(() => {
        if (searchQuery.trim()) {
            const results = searchTools(searchQuery, localizedTools);
            setSearchResults(results.slice(0, 8));
            setSelectedIndex(-1);
        } else {
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    }, [searchQuery, localizedTools]);

    // Focus search input when opening
    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
            setSearchQuery('');
            setSearchResults([]);
        }
    }, [isSearchOpen]);

    // Close panels on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (isSearchOpen && searchPanelRef.current && !searchPanelRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
            if (isLangOpen && langPanelRef.current && !langPanelRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isSearchOpen, isLangOpen]);

    // Keyboard shortcut Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsDockCollapsed(false); // expand dock if collapsed
                setIsSearchOpen(prev => !prev);
                setIsLangOpen(false);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setIsLangOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const result = searchResults[selectedIndex];
            router.push(`/${locale}/tools/${result.tool.slug}`);
            setIsSearchOpen(false);
        }
    }, [searchResults, selectedIndex, locale, router]);

    const handleSearchSelect = useCallback((slug: string) => {
        router.push(`/${locale}/tools/${slug}`);
        setIsSearchOpen(false);
    }, [locale, router]);

    const dockItems = [
        {
            id: 'home',
            icon: Home,
            label: t('navigation.home'),
            href: `/${locale}`,
            active: isHome,
        },
        {
            id: 'search',
            icon: Search,
            label: 'Search',
            onClick: () => { setIsSearchOpen(!isSearchOpen); setIsLangOpen(false); },
            active: isSearchOpen,
        },
        {
            id: 'tools',
            icon: Grid3X3,
            label: t('navigation.tools'),
            href: `/${locale}/tools`,
            active: isTools && !isSearchOpen,
        },
        {
            id: 'language',
            icon: Globe,
            label: 'Language',
            onClick: () => { setIsLangOpen(!isLangOpen); setIsSearchOpen(false); },
            active: isLangOpen,
        },
    ];

    // Collapsed: show thin bar at bottom that expands dock at top
    if (isDockCollapsed) {
        return (
            <button
                onClick={() => setIsDockCollapsed(false)}
                className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 dock-collapse-bar focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                aria-label="Expand navigation dock"
            >
                <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-[hsl(var(--color-card)/0.4)] backdrop-blur-md border border-[hsl(var(--color-border)/0.2)] hover:bg-[hsl(var(--color-card)/0.6)] transition-colors cursor-pointer">
                    <ChevronUp className="w-3.5 h-3.5 text-[hsl(var(--color-muted-foreground)/0.6)]" />
                    <div className="w-8 h-0.5 rounded-full bg-[hsl(var(--color-muted-foreground)/0.3)]" />
                    <ChevronUp className="w-3.5 h-3.5 text-[hsl(var(--color-muted-foreground)/0.6)]" />
                </div>
            </button>
        );
    }

    // Panel position classes based on dock position
    const panelPositionClass = isTopPosition
        ? 'top-full mt-3'     // panels below dock when dock is at top
        : 'bottom-full mb-3'; // panels above dock when dock is at bottom

    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 z-50 ${isTopPosition ? 'top-4 dock-top' : 'bottom-4 dock-container'
                }`}
            style={isTopPosition ? {} : { paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            {/* Search Panel - Full Screen / Bottom Sheet */}
            {isSearchOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45]"
                        onClick={() => setIsSearchOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        ref={searchPanelRef}
                        className="fixed inset-x-0 bottom-0 top-auto w-full max-w-2xl mx-auto h-[80vh] bg-[hsl(var(--color-card))] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-[hsl(var(--color-border))] z-[50] flex flex-col overflow-hidden"
                        style={{ animation: 'dock-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('navigation.search') || "Search tools"}
                    >
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center py-3 cursor-grab active:cursor-grabbing border-b border-[hsl(var(--color-border)/0.1)]">
                            <div className="w-12 h-1.5 rounded-full bg-[hsl(var(--color-muted-foreground)/0.3)]" />
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-[hsl(var(--color-border)/0.3)]">
                            <Search className="w-5 h-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                            <input aria-label={t("tools.search.placeholder") || "Search for tools..."}
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                placeholder={t('tools.search.placeholder') || "Search for tools..."}
                                className="flex-1 bg-transparent text-lg text-[hsl(var(--color-foreground))] placeholder:text-[hsl(var(--color-muted-foreground))] outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                aria-label={t('common.buttons.close') || "Close search"}
                                className="p-2 -mr-2 text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted)/0.5)] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
                            >
                                <ChevronDown className="w-6 h-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => {
                                    const localized = localizedTools[result.tool.id];
                                    const displayTitle = localized?.title || result.tool.id.replace(/-/g, ' ');
                                    const displayDesc = localized?.description || '';

                                    const IconComponent = getToolIcon(result.tool.icon);

                                    return (
                                        <button
                                            key={result.tool.slug}
                                            onClick={() => handleSearchSelect(result.tool.slug)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 text-left rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))] ${index === selectedIndex
                                                ? 'bg-[hsl(var(--color-primary)/0.1)] ring-1 ring-[hsl(var(--color-primary)/0.2)]'
                                                : 'hover:bg-[hsl(var(--color-muted)/0.4)]'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${index === selectedIndex ? 'bg-[hsl(var(--color-primary)/0.2)]' : 'bg-[hsl(var(--color-muted))]'}`}>
                                                <IconComponent className={`w-5 h-5 ${index === selectedIndex ? 'text-[hsl(var(--color-primary))]' : 'text-[hsl(var(--color-muted-foreground))]'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-[hsl(var(--color-foreground))] truncate">
                                                    {displayTitle}
                                                </p>
                                                {displayDesc && (
                                                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] truncate opacity-80">
                                                        {displayDesc}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-[hsl(var(--color-muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronDown className="w-4 h-4 -rotate-90" />
                                            </div>
                                        </button>
                                    );
                                })
                            ) : (
                                searchQuery ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 bg-[hsl(var(--color-muted)/0.5)] rounded-full flex items-center justify-center mb-4">
                                            <Search className="w-8 h-8 text-[hsl(var(--color-muted-foreground))]" />
                                        </div>
                                        <p className="text-lg font-medium text-[hsl(var(--color-foreground))] mb-1">
                                            {t('tools.search.noResults') || "No tools found"}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                            Try searching with different keywords
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-[hsl(var(--color-muted-foreground))]">
                                        <p>Type to search...</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Language Panel */}
            {isLangOpen && (
                <div
                    ref={langPanelRef}
                    className={`absolute ${panelPositionClass} right-0 bg-[hsl(var(--color-card)/0.95)] backdrop-blur-xl border border-[hsl(var(--color-border)/0.5)] rounded-2xl shadow-2xl overflow-hidden`}
                    style={{ animation: 'dock-slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
                >
                    <div className="p-3">
                        <LanguageSelector currentLocale={locale} />
                    </div>
                </div>
            )}

            {/* Dock Bar */}
            <nav
                className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-[hsl(var(--color-card)/0.92)] backdrop-blur-xl border border-[hsl(var(--color-border)/0.4)] shadow-lg shadow-black/25"
                role="navigation"
                aria-label="Main navigation"
            >
                {dockItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.active;

                    const content = (
                        <div className="relative flex flex-col items-center">
                            {/* Spotlight glow */}
                            {isActive && (
                                <div className={`absolute ${isTopPosition ? '-bottom-3' : '-top-3'} left-1/2 -translate-x-1/2 w-6 h-3 bg-[hsl(var(--color-primary)/0.6)] rounded-full blur-md dock-spotlight`} />
                            )}
                            <Icon
                                className={`w-5 h-5 transition-all duration-200 ${isActive
                                    ? 'text-[hsl(var(--color-primary))] scale-110'
                                    : 'text-[hsl(var(--color-muted-foreground))]'
                                    }`}
                            />
                            <span
                                className={`text-[9px] mt-0.5 transition-colors duration-200 ${isActive
                                    ? 'text-[hsl(var(--color-primary))]'
                                    : 'text-[hsl(var(--color-muted-foreground))]'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </div>
                    );

                    if (item.href) {
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`relative flex items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))] ${isActive
                                    ? 'bg-[hsl(var(--color-primary)/0.1)]'
                                    : 'hover:bg-[hsl(var(--color-muted)/0.5)]'
                                    }`}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className={`relative flex items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))] ${isActive
                                ? 'bg-[hsl(var(--color-primary)/0.1)]'
                                : 'hover:bg-[hsl(var(--color-muted)/0.5)]'
                                }`}
                            aria-label={item.label}
                            aria-pressed={isActive}
                        >
                            {content}
                        </button>
                    );
                })}

                {/* Collapse divider + button */}
                <div className="w-px h-6 bg-[hsl(var(--color-border)/0.3)] mx-0.5" />
                <button
                    onClick={() => {
                        setIsDockCollapsed(true);
                        setIsSearchOpen(false);
                        setIsLangOpen(false);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[hsl(var(--color-muted)/0.5)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
                    aria-label="Minimize dock"
                >
                    <Minus className="w-3.5 h-3.5 text-[hsl(var(--color-muted-foreground)/0.6)]" />
                </button>
            </nav>
        </div>
    );
};

export default BottomDock;
