import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '所有文章',
  description: '浏览所有博客文章',
};

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-64 h-64 bg-accent/15 top-[-40px] right-[10%] animate-float-slow" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            📝 文章
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            所有<span className="gradient-text">文章</span>
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
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-foreground-secondary text-lg mb-4">还没有文章</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className={`block gradient-border-card hover-lift shadow-card hover:shadow-card-hover p-5 animate-fade-in-up stagger-${Math.min(i + 1, 5)} group`}
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
