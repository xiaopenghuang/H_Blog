'use client';

import { useEffect, useState, useCallback } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = extractHeadings(content);

  const updateActiveHeading = useCallback(() => {
    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let current = '';
    for (const el of headingElements) {
      if (el.getBoundingClientRect().top <= 120) {
        current = el.id;
      }
    }
    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    updateActiveHeading();
    return () => window.removeEventListener('scroll', updateActiveHeading);
  }, [updateActiveHeading]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 w-64 shrink-0" aria-label="目录">
      <div className="glass-card rounded-2xl shadow-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </span>
          目录
        </h3>
        <ul className="space-y-0.5 text-sm max-h-[60vh] overflow-y-auto">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    const top = element.offsetTop - 100;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className={`block py-1.5 rounded-lg transition-smooth ${
                  activeId === id
                    ? 'text-accent bg-accent/5 font-medium'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-secondary/50'
                }`}
                style={{ paddingLeft: `${(level - 2) * 12 + 12}px` }}
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 transition-smooth ${
                  activeId === id ? 'bg-accent' : 'bg-border'
                }`} />
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
