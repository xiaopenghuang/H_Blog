'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="阅读进度">
      <div
        className="h-full bg-gradient-to-r from-accent via-pink to-cyan transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {progress > 0 && (
        <div
          className="absolute top-0 h-full w-8 bg-white/30 blur-sm"
          style={{ left: `${progress - 2}%` }}
        />
      )}
    </div>
  );
}
