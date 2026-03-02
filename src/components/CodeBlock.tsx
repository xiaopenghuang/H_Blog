'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    codeToHtml(code, {
      lang: language || 'text',
      theme: 'github-dark',
    }).then(setHtml).catch(() => {
      // Fallback for unsupported languages
      codeToHtml(code, {
        lang: 'text',
        theme: 'github-dark',
      }).then(setHtml);
    });
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mb-4">
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#0d1117] rounded-t-lg flex items-center justify-between px-4">
        <span className="text-xs text-[#8b949e] font-mono">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-[#8b949e] hover:text-white transition-smooth flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
      </div>
      {html ? (
        <div
          className="pt-10 rounded-lg overflow-hidden [&>pre]:!bg-[#0d1117] [&>pre]:!p-4 [&>pre]:!m-0 [&>pre]:overflow-x-auto [&>pre]:text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="pt-10 bg-[#0d1117] rounded-lg">
          <pre className="p-4 text-sm text-[#e6ebf1] overflow-x-auto font-mono">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
