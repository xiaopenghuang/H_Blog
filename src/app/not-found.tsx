import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden max-w-[1400px] mx-auto">
      <div className="hero-gradient absolute inset-0" />
      <div className="orb w-80 h-80 bg-accent/15 top-[10%] right-[-5%] animate-float-slow" />
      <div className="orb w-52 h-52 bg-pink/10 bottom-[10%] left-[-3%] animate-float" />
      <div className="orb w-36 h-36 bg-cyan/10 top-[40%] left-[30%] animate-float-slower" />

      <div className="relative text-center px-6 animate-fade-in-up">
        <div className="text-[120px] md:text-[160px] font-bold leading-none gradient-text mb-2">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          页面飞到外太空了
        </h1>
        <p className="text-foreground-secondary mb-10 max-w-md mx-auto text-lg">
          抱歉，你访问的页面不存在。可能已被移动或删除。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-gradient inline-flex items-center px-7 py-3.5 text-white font-semibold rounded-xl shadow-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              返回首页
            </span>
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center px-7 py-3.5 glass-card text-foreground font-semibold rounded-xl hover-lift hover:shadow-card-hover"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </div>
  );
}
