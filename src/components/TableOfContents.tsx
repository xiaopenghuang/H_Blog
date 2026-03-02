'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-card p-4">
        <h3 className="text-sm font-semibold text-[#0a2540] mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#635bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          目录
        </h3>
        <ul className="space-y-1 text-sm max-h-[60vh] overflow-y-auto">
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
                className={`block py-1.5 transition-smooth border-l-2 ${
                  activeId === id
                    ? 'text-[#635bff] border-[#635bff] bg-[#635bff]/5'
                    : 'text-[#425466] border-transparent hover:text-[#0a2540] hover:border-[#e6ebf1]'
                }`}
                style={{ paddingLeft: `${(level - 2) * 12 + 12}px` }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
