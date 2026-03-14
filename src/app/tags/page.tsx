import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '标签',
  description: '按标签浏览所有文章',
};

function getTagStyle(_tag: string) {
  return 'bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20';
}

export default function TagsPage() {
  const tags = getAllTags();
  const totalPosts = tags.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="min-h-screen">
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            标签
          </h1>
          <p className="text-foreground-secondary">
            共 <span className="font-semibold text-accent">{tags.length}</span> 个标签，<span className="font-semibold text-accent">{totalPosts}</span> 篇文章
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            {tags.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground-secondary text-lg">还没有标签</p>
              </div>
            ) : (
              <div className="card p-8 shadow-card">
                <div className="flex flex-wrap gap-3">
                  {tags.map(({ tag, count }, i) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-smooth ${getTagStyle(tag)}`}
                    >
                      <span>{tag}</span>
                      <span className="text-xs bg-surface/80 px-2 py-0.5 rounded-md font-semibold">{count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
