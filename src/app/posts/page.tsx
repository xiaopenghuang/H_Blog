import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import { getTagColor } from '@/lib/tagColors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '所有文章',
  description: '浏览所有博客文章',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            所有文章
          </h1>
          <p className="text-foreground-secondary">
            共 <span className="font-semibold text-accent">{posts.length}</span> 篇文章
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground-secondary text-lg">还没有文章</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block card shadow-card hover:shadow-card-hover p-5 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-accent transition-smooth">
                          {post.title}
                        </h2>
                        <p className="text-foreground-secondary text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-foreground-secondary shrink-0">
                        <time>{post.date}</time>
                        <span>&middot;</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
