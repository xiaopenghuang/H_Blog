'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchButton from './SearchButton';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '文章' },
  { href: '/tags', label: '标签' },
  { href: '/archives', label: '归档' },
  { href: '/about', label: '关于' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e6ebf1]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[#0a2540] hover:text-[#635bff] transition-smooth"
        >
          My Blog
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'text-[#635bff] bg-[#635bff]/10'
                      : 'text-[#425466] hover:text-[#0a2540] hover:bg-[#f6f9fc]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchButton />
        </div>
      </div>
    </header>
  );
}
