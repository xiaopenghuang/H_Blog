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

  const lineCount = code.split('\n').length;

  return (
    <div className="relative group mb-4 rounded-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-10 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-[#8b949e] font-mono ml-2">{language || 'text'}</span>
          <span className="text-xs text-[#484f58]">{lineCount} lines</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-[#8b949e] hover:text-white transition-smooth flex items-center gap-1 opacity-0 group-hover:opacity-100"
          aria-label={copied ? '已复制' : '复制代码'}
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

      {/* Code content */}
      {html ? (
        <div
          className="[&>pre]:!bg-[#0d1117] [&>pre]:!p-4 [&>pre]:!m-0 [&>pre]:overflow-x-auto [&>pre]:text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="bg-[#0d1117]">
          <pre className="p-4 text-sm text-[#e6edf3] overflow-x-auto font-mono animate-pulse">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
