import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} | 标签 | My Blog`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/tags"
            className="inline-flex items-center text-[#635bff] hover:text-[#7a73ff] transition-smooth mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            所有标签
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4 flex items-center gap-3">
            <span className="w-10 h-10 bg-[#635bff]/10 text-[#635bff] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </span>
            {decodedTag}
          </h1>
          <p className="text-lg text-[#425466]">
            共 {posts.length} 篇文章
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-smooth p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/tags/${encodeURIComponent(t)}`}
                        className={`text-xs font-medium px-2 py-1 rounded-md transition-smooth ${
                          t === decodedTag
                            ? 'bg-[#635bff] text-white'
                            : 'bg-[#635bff]/10 text-[#635bff] hover:bg-[#635bff]/20'
                        }`}
                      >
                        {t}
                      </Link>
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
      </section>
    </div>
  );
}
