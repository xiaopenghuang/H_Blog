import Link from 'next/link';
import { getPostsByYear } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文章归档',
  description: '按年份浏览所有文章',
};

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export default function ArchivesPage() {
  const postsByYear = getPostsByYear();
  const years = Object.keys(postsByYear).filter(Boolean).sort((a, b) => Number(b) - Number(a));
  const totalPosts = years.reduce((sum, year) => sum + postsByYear[year].length, 0);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-48 h-48 bg-orange/15 top-[-30px] right-[20%] animate-float-slow" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-sm font-medium mb-4">
            📚 归档
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            文章<span className="gradient-text-warm">归档</span>
          </h1>
          <p className="text-foreground-secondary">
            共 <span className="font-semibold text-orange">{totalPosts}</span> 篇文章
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            {years.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-foreground-secondary text-lg">还没有文章</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-pink to-orange hidden md:block" />
                <div className="space-y-8">
                  {years.map((year, yi) => (
                    <div key={year} className={`animate-fade-in-up stagger-${Math.min(yi + 1, 5)}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-pink flex items-center justify-center text-white font-bold text-sm shadow-button shrink-0">
                          {postsByYear[year].length}
                        </div>
                        <h2 className="text-xl font-bold text-foreground">{year} 年</h2>
                      </div>
                      <div className="md:ml-16 space-y-2.5">
                        {postsByYear[year].map((post) => (
                          <article key={post.slug} className="gradient-border-card hover-lift shadow-card hover:shadow-card-hover p-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                              <time className="text-xs text-foreground-secondary shrink-0 font-mono w-16">
                                {post.date ? post.date.slice(5) : '未知'}
                              </time>
                              <Link href={`/posts/${post.slug}`} className="text-foreground text-sm font-medium hover:text-accent transition-smooth flex-1">
                                {post.title}
                              </Link>
                              <div className="flex gap-1.5">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getTagColor(tag)}`}>{tag}</span>
                                ))}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
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
