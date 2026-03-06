'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import GitHubCard from './GitHubCard';

const navItems = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/posts', label: '文章', icon: '📝' },
  { href: '/tags', label: '标签', icon: '🏷️' },
  { href: '/archives', label: '归档', icon: '📚' },
  { href: '/about', label: '关于', icon: '👋' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-5">
        {/* Profile Card */}
        <div className="glass-card rounded-2xl p-5 shadow-card animate-fade-in-up">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent via-pink to-cyan p-0.5 mb-3 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-2xl font-bold text-foreground">
                {siteConfig.author.avatar}
              </div>
            </div>
            <h3 className="font-bold text-foreground text-base">{siteConfig.author.name}</h3>
            <p className="text-xs gradient-text font-medium mt-0.5">{siteConfig.author.role}</p>
            <p className="text-xs text-foreground-secondary mt-2 leading-relaxed">
              {siteConfig.author.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary/60 hover:bg-accent/10 flex items-center justify-center text-foreground-secondary hover:text-accent transition-smooth"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="w-8 h-8 rounded-lg bg-secondary/60 hover:bg-pink/10 flex items-center justify-center text-foreground-secondary hover:text-pink transition-smooth"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href={`tencent://message/?uin=${siteConfig.author.qq}&Site=&Menu=yes`}
                className="w-8 h-8 rounded-lg bg-secondary/60 hover:bg-cyan/10 flex items-center justify-center text-foreground-secondary hover:text-cyan transition-smooth"
                aria-label="QQ"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.003 2C6.486 2 2.001 6.486 2.001 12.003c0 2.097.648 4.044 1.755 5.65l-.483 2.88a.75.75 0 00.998.833l2.622-.955a9.946 9.946 0 005.11 1.405c5.517 0 10.002-4.486 10.002-10.003C22.005 6.296 17.52 2 12.003 2zM8.25 10.5a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm3.75 0a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm3.75 0a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z" />
                </svg>
              </a>
              <a
                href="/rss.xml"
                className="w-8 h-8 rounded-lg bg-secondary/60 hover:bg-orange/10 flex items-center justify-center text-foreground-secondary hover:text-orange transition-smooth"
                aria-label="RSS"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 110 4.36 2.18 2.18 0 010-4.36zM4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44zm0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="glass-card rounded-2xl p-4 shadow-card animate-fade-in-up stagger-1">
          <h4 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-2 px-2">导航</h4>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-smooth ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* GitHub Repos */}
        {siteConfig.githubRepos.length > 0 && (
          <div className="animate-fade-in-up stagger-2">
            <h4 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-3 px-1">GitHub 项目</h4>
            <div className="space-y-3">
              {siteConfig.githubRepos.map((repo) => (
                <GitHubCard key={repo} repo={repo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
