'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const existing = ref.current.querySelector('.giscus');
    if (existing) existing.remove();

    const { giscus } = siteConfig;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscus.repo);
    script.setAttribute('data-repo-id', giscus.repoId);
    script.setAttribute('data-category', giscus.category);
    script.setAttribute('data-category-id', giscus.categoryId);
    script.setAttribute('data-mapping', giscus.mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('data-lang', giscus.lang);
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    ref.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div id="comments" className="mt-10">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-gradient-to-b from-cyan to-green rounded-full" />
        评论区
      </h3>
      <div className="bg-surface rounded-2xl shadow-card p-6 md:p-8">
        <div ref={ref} />
        <noscript>
          <p className="text-foreground-secondary text-center py-8">
            请启用 JavaScript 来查看评论。评论系统基于{' '}
            <a href="https://giscus.app" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              giscus
            </a>
            （GitHub Discussions）。
          </p>
        </noscript>
        <p className="text-xs text-foreground-secondary mt-4 text-center">
          评论基于 GitHub Discussions，请使用 GitHub 账号登录后评论。
          如果评论区未加载，请先到{' '}
          <a href="https://giscus.app/zh-CN" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            giscus.app
          </a>
          {' '}配置你的仓库。
        </p>
      </div>
    </div>
  );
}
