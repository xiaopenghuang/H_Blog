import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight mb-6">
              欢迎来到我的
              <span className="text-[#635bff]">个人博客</span>
            </h1>
            <p className="text-lg text-[#425466] mb-8 leading-relaxed">
              在这里，我分享关于技术、设计和生活的思考。希望这些文字能给你带来一些启发和帮助。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="inline-flex items-center px-6 py-3 bg-[#635bff] text-white font-medium rounded-lg shadow-button hover:bg-[#7a73ff] transition-smooth"
              >
                浏览文章
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-white text-[#0a2540] font-medium rounded-lg shadow-card hover:shadow-card-hover transition-smooth"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#0a2540]">最新文章</h2>
          <Link
            href="/posts"
            className="text-[#635bff] font-medium hover:text-[#7a73ff] transition-smooth flex items-center"
          >
            查看全部
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-smooth p-6 flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2 py-1 bg-[#635bff]/10 text-[#635bff] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-[#0a2540] mb-2 hover:text-[#635bff] transition-smooth">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-[#425466] text-sm mb-4 flex-1 line-clamp-3">
                {post.excerpt}
              </p>
              <time className="text-xs text-[#425466]">{post.date}</time>
            </article>
          ))}
        </div>
      </section>

      {/* About Card Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-xl shadow-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#635bff] to-[#00d4ff] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shrink-0">
            Hi
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#0a2540] mb-3">关于我</h2>
            <p className="text-[#425466] mb-4 leading-relaxed">
              我是一名热爱技术的开发者，喜欢探索新技术和分享知识。这个博客是我记录学习历程和思考的地方。
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-[#635bff] font-medium hover:text-[#7a73ff] transition-smooth"
            >
              了解更多
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
