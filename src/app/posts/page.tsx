import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            所有文章
          </h1>
          <p className="text-lg text-[#425466]">
            共 {posts.length} 篇文章
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#425466] text-lg mb-4">还没有文章</p>
            <p className="text-[#425466]">
              在 <code className="bg-[#f6f9fc] px-2 py-1 rounded text-sm">content/posts/</code> 目录下添加 Markdown 文件来创建文章
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-smooth p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2 py-1 bg-[#635bff]/10 text-[#635bff] rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-[#0a2540] mb-2 hover:text-[#635bff] transition-smooth">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-[#425466] line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#425466] shrink-0">
                    <time>{post.date}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
