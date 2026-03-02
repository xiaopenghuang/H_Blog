'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface SearchProps {
  posts: SearchResult[];
}

export default function Search({ posts }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery)
    );
    setResults(filtered);
  }, [query, posts]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#425466] bg-[#f6f9fc] hover:bg-[#e6ebf1] rounded-lg transition-smooth"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">搜索</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white rounded border border-[#e6ebf1]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-[#0a2540]/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        ref={modalRef}
        className="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-card-hover overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 border-b border-[#e6ebf1]">
          <svg className="w-5 h-5 text-[#425466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="flex-1 py-4 text-[#0a2540] placeholder-[#425466] outline-none"
          />
          <button
            onClick={handleClose}
            className="text-xs text-[#425466] px-2 py-1 bg-[#f6f9fc] rounded"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-[#425466]">
              没有找到相关文章
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    onClick={handleClose}
                    className="flex flex-col gap-1 px-4 py-3 hover:bg-[#f6f9fc] transition-smooth"
                  >
                    <span className="font-medium text-[#0a2540]">{post.title}</span>
                    <span className="text-sm text-[#425466] line-clamp-1">{post.excerpt}</span>
                    <span className="text-xs text-[#425466]">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="px-4 py-8 text-center text-[#425466]">
              输入关键词搜索文章
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
