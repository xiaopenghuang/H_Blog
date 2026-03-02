import Link from 'next/link';
import { getPostsByYear } from '@/lib/posts';

export default function ArchivesPage() {
  const postsByYear = getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  const totalPosts = years.reduce((sum, year) => sum + postsByYear[year].length, 0);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            文章归档
          </h1>
          <p className="text-lg text-[#425466]">
            共 {totalPosts} 篇文章
          </p>
        </div>
      </section>

      {/* Archives List */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        {years.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#425466] text-lg mb-4">还没有文章</p>
            <p className="text-[#425466]">
              在 <code className="bg-[#f6f9fc] px-2 py-1 rounded text-sm">content/posts/</code> 目录下添加 Markdown 文件来创建文章
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year} className="bg-white rounded-xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#0a2540] mb-6 flex items-center">
                  <span className="w-12 h-12 bg-[#635bff]/10 text-[#635bff] rounded-lg flex items-center justify-center mr-4 text-lg font-bold">
                    {postsByYear[year].length}
                  </span>
                  {year} 年
                </h2>
                <div className="space-y-4">
                  {postsByYear[year].map((post) => (
                    <article
                      key={post.slug}
                      className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 border-b border-[#e6ebf1] last:border-0"
                    >
                      <time className="text-sm text-[#425466] shrink-0 w-24">
                        {post.date.slice(5)}
                      </time>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-[#0a2540] font-medium hover:text-[#635bff] transition-smooth flex-1"
                      >
                        {post.title}
                      </Link>
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-[#f6f9fc] text-[#425466] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
