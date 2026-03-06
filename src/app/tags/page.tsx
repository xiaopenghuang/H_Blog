import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '标签',
  description: '按标签浏览所有文章',
};

const TAG_BG_COLORS = [
  'bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20',
  'bg-cyan/10 text-cyan hover:bg-cyan/20 border border-cyan/20',
  'bg-pink/10 text-pink hover:bg-pink/20 border border-pink/20',
  'bg-orange/10 text-orange hover:bg-orange/20 border border-orange/20',
  'bg-green/10 text-green hover:bg-green/20 border border-green/20',
];

function getTagStyle(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_BG_COLORS[Math.abs(hash) % TAG_BG_COLORS.length];
}

export default function TagsPage() {
  const tags = getAllTags();
  const totalPosts = tags.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-52 h-52 bg-pink/15 top-[-20px] right-[15%] animate-float" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/10 text-pink text-sm font-medium mb-4">
            🏷️ 标签
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            标签<span className="gradient-text-warm">云</span>
          </h1>
          <p className="text-foreground-secondary">
            共 <span className="font-semibold text-pink">{tags.length}</span> 个标签，<span className="font-semibold text-accent">{totalPosts}</span> 篇文章
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            {tags.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-foreground-secondary text-lg">还没有标签</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 animate-fade-in-up shadow-card">
                <div className="flex flex-wrap gap-3">
                  {tags.map(({ tag, count }, i) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-smooth hover-lift ${getTagStyle(tag)} stagger-${Math.min(i + 1, 5)} animate-fade-in-up`}
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
