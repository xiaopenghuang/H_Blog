'use client';

import { useState, useEffect } from 'react';

interface PostActionsProps {
  slug: string;
  title: string;
}

export default function PostActions({ slug, title }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`like-${slug}`);
    if (stored) {
      setLiked(true);
    }
    const count = parseInt(localStorage.getItem(`like-count-${slug}`) || '0', 10);
    setLikeCount(count);
  }, [slug]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      const newCount = Math.max(0, likeCount - 1);
      setLikeCount(newCount);
      localStorage.removeItem(`like-${slug}`);
      localStorage.setItem(`like-count-${slug}`, String(newCount));
    } else {
      setLiked(true);
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      localStorage.setItem(`like-${slug}`, '1');
      localStorage.setItem(`like-count-${slug}`, String(newCount));
    }
  };

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: ignore */
    }
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToWeibo = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(title);
    window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
          liked
            ? 'bg-pink/15 text-pink border border-pink/30 shadow-glow-pink'
            : 'bg-secondary/80 text-foreground-secondary hover:bg-pink/10 hover:text-pink border border-border/50'
        }`}
      >
        <svg
          className={`w-5 h-5 ${liked ? 'like-pop fill-pink' : ''}`}
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {liked ? '已点赞' : '点赞'}
        {likeCount > 0 && <span className="text-xs opacity-70">({likeCount})</span>}
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-sm bg-secondary/80 text-foreground-secondary hover:bg-accent/10 hover:text-accent border border-border/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          分享
        </button>

        {showShareMenu && (
          <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-surface border border-border rounded-xl shadow-card-hover p-2 min-w-[150px] z-50 animate-scale-in">
            <button
              onClick={() => { handleCopyLink(); setShowShareMenu(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground-secondary hover:bg-secondary/80 hover:text-foreground transition-smooth"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {copied ? '已复制!' : '复制链接'}
            </button>
            <button
              onClick={() => { shareToTwitter(); setShowShareMenu(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground-secondary hover:bg-secondary/80 hover:text-foreground transition-smooth"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              分享到 X
            </button>
            <button
              onClick={() => { shareToWeibo(); setShowShareMenu(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground-secondary hover:bg-secondary/80 hover:text-foreground transition-smooth"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM20.196 9.4a5.007 5.007 0 00-4.673-3.332l-.628.065a.672.672 0 01-.14-1.335l.628-.065A6.349 6.349 0 0121.5 10.893l-.065.628a.672.672 0 01-1.335-.14l.096-.981zm-2.896.849a2.558 2.558 0 00-2.393-1.713l-.314.033a.521.521 0 01-.109-1.036l.314-.033a3.6 3.6 0 013.371 2.413l.033.314a.521.521 0 01-1.036.109l-.033-.314.167.227z" />
              </svg>
              分享到微博
            </button>
          </div>
        )}
      </div>

      {/* Scroll to comments */}
      <button
        onClick={() => {
          document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-sm bg-secondary/80 text-foreground-secondary hover:bg-cyan/10 hover:text-cyan border border-border/50 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        评论
      </button>
    </div>
  );
}
