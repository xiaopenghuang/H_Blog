import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return { title: `${decodeURIComponent(tag)} | 标签` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  if (posts.length === 0) notFound();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-48 h-48 bg-pink/15 top-[-20px] right-[10%] animate-float" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-14 animate-fade-in-up">
          <Link href="/tags" className="inline-flex items-center text-accent hover:text-accent-light transition-smooth mb-6 group">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-smooth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            所有标签
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
            <span className="w-11 h-11 bg-gradient-to-br from-accent to-pink text-white rounded-xl flex items-center justify-center shadow-button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </span>
            <span className="gradient-text">{decodedTag}</span>
          </h1>
          <p className="text-foreground-secondary">共 <span className="font-semibold text-accent">{posts.length}</span> 篇文章</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0 space-y-4">
            {posts.map((post, i) => (
              <article key={post.slug} className={`gradient-border-card hover-lift shadow-card hover:shadow-card-hover p-5 animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {post.tags.map((t) => (
                        <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-smooth ${t === decodedTag ? 'bg-accent text-white shadow-sm' : `hover:opacity-80 ${getTagColor(t)}`}`}>
                          {t}
                        </Link>
                      ))}
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-1.5 hover:text-accent transition-smooth">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-foreground-secondary text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground-secondary shrink-0">
                    <time>{post.date}</time>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
