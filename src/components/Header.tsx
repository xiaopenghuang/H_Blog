'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchButton from './SearchButton';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '@/config/site';

const navItems = siteConfig.navItems;

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-accent via-violet to-pink flex items-center justify-center shadow-button group-hover:shadow-glow-accent transition-all duration-300 group-hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-white font-black text-xs sm:text-sm tracking-tight">{siteConfig.logo.text}</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm sm:text-base font-extrabold gradient-text">{siteConfig.name}</span>
            <span className="text-[0.55rem] sm:text-[0.6rem] text-foreground-secondary font-medium tracking-wider hidden sm:block">{siteConfig.logo.subtitle}</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'text-accent bg-accent/10 shadow-sm'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchButton />
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-smooth"
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border/50 glass-card animate-fade-in-down">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
