import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function TagsPage() {
  const tags = getAllTags();
  const totalPosts = tags.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            标签
          </h1>
          <p className="text-lg text-[#425466]">
            共 {tags.length} 个标签，{totalPosts} 篇文章
          </p>
        </div>
      </section>

      {/* Tags Grid */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        {tags.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#425466] text-lg">还没有标签</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card p-8">
            <div className="flex flex-wrap gap-3">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#f6f9fc] hover:bg-[#635bff]/10 text-[#0a2540] hover:text-[#635bff] rounded-lg transition-smooth"
                >
                  <span className="font-medium">{tag}</span>
                  <span className="text-sm text-[#425466] bg-white px-2 py-0.5 rounded-md">
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
