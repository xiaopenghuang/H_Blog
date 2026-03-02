import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
          <h1 id={generateId(children)} className="text-3xl font-bold text-[#0a2540] mt-8 mb-4 scroll-mt-24">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 id={generateId(children)} className="text-2xl font-bold text-[#0a2540] mt-8 mb-4 scroll-mt-24">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 id={generateId(children)} className="text-xl font-semibold text-[#0a2540] mt-6 mb-3 scroll-mt-24">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 id={generateId(children)} className="text-lg font-semibold text-[#0a2540] mt-4 mb-2 scroll-mt-24">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-[#425466] leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[#635bff] hover:text-[#7a73ff] underline transition-smooth"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-[#425466] mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-[#425466] mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#635bff] pl-4 my-4 text-[#425466] italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !className;

          if (isInline) {
            return (
              <code className="bg-[#f6f9fc] text-[#635bff] px-1.5 py-0.5 rounded text-sm font-mono">
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
          />
        ),
        hr: () => <hr className="border-[#e6ebf1] my-8" />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-[#e6ebf1] bg-[#f6f9fc] px-4 py-2 text-left font-semibold text-[#0a2540]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-[#e6ebf1] px-4 py-2 text-[#425466]">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
