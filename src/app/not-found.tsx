import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center max-w-[1400px] mx-auto">
      <div className="text-center px-6 animate-fade-in-up">
        <div className="text-[120px] md:text-[160px] font-bold leading-none text-accent mb-2">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          页面未找到
        </h1>
        <p className="text-foreground-secondary mb-10 max-w-md mx-auto text-lg">
          抱歉，你访问的页面不存在。可能已被移动或删除。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-7 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-light transition-smooth"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center px-7 py-3.5 bg-secondary text-foreground font-semibold rounded-xl hover:bg-border transition-smooth border border-border"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </div>
  );
}
