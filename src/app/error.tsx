'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-3">出了点问题</h2>
        <p className="text-foreground-secondary mb-6">
          {error.message || '页面加载时发生了意外错误'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-smooth"
        >
          重试
        </button>
      </div>
    </div>
  );
}
