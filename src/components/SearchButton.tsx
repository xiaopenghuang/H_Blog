'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground-secondary bg-secondary/50 hover:bg-secondary rounded-lg transition-smooth"
        aria-label="搜索文章"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">搜索</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-surface rounded border border-border">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] animate-fade-in">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-xl mx-4 bg-surface rounded-xl shadow-card-hover overflow-hidden animate-scale-in">
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <svg className="w-5 h-5 text-foreground-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索文章..."
                className="flex-1 py-4 text-foreground bg-transparent placeholder-foreground-secondary outline-none"
                aria-label="搜索文章"
              />
              <button
                onClick={handleClose}
                className="text-xs text-foreground-secondary px-2 py-1 bg-secondary rounded"
                aria-label="关闭搜索"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-foreground-secondary">
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
                        className="flex flex-col gap-1 px-4 py-3 hover:bg-secondary transition-smooth"
                      >
                        <span className="font-medium text-foreground">{post.title}</span>
                        <span className="text-sm text-foreground-secondary line-clamp-1">{post.excerpt}</span>
                        <span className="text-xs text-foreground-secondary">{post.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {!query && (
                <div className="px-4 py-8 text-center text-foreground-secondary">
                  输入关键词搜索文章
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
