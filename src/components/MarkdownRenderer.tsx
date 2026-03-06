import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ReactNode } from 'react';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

function generateId(children: ReactNode): string {
  const text = String(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 id={generateId(children)} className="text-3xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 id={generateId(children)} className="text-2xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 id={generateId(children)} className="text-xl font-semibold text-foreground mt-6 mb-3 scroll-mt-24">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 id={generateId(children)} className="text-lg font-semibold text-foreground mt-4 mb-2 scroll-mt-24">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-foreground-secondary leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => {
          if (!href) return <span>{children}</span>;
          const isExternal = href.startsWith('http');
          if (isExternal) {
            return (
              <a
                href={href}
                className="text-accent hover:text-accent-light underline transition-smooth"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          }
          return (
            <Link href={href} className="text-accent hover:text-accent-light underline transition-smooth">
              {children}
            </Link>
          );
        },
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-foreground-secondary mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-foreground-secondary mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 my-4 text-foreground-secondary italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !className;

          if (isInline) {
            return (
              <code className="bg-secondary text-accent px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }

          const code = String(children).replace(/\n$/, '');
          const language = match ? match[1] : '';

          return <CodeBlock code={code} language={language} />;
        },
        pre: ({ children }) => <>{children}</>,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ''}
            className="rounded-lg shadow-card my-4 max-w-full"
            loading="lazy"
          />
        ),
        hr: () => <hr className="border-border my-8" />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border bg-secondary px-4 py-2 text-left font-semibold text-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2 text-foreground-secondary">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
