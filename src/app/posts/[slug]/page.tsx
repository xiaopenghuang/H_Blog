import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from '@/lib/posts';
import { siteConfig } from '@/config/site';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import PostNavigation from '@/components/PostNavigation';
import RelatedPosts from '@/components/RelatedPosts';
import PostActions from '@/components/PostActions';
import Comments from '@/components/Comments';

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/posts/${slug}`,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug, post.tags);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: siteConfig.author.name },
    url: `${siteConfig.url}/posts/${slug}`,
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />

      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-56 h-56 bg-accent/15 top-[-30px] right-[5%] animate-float-slow" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14 animate-fade-in-up">
          <Link href="/posts" className="inline-flex items-center text-accent hover:text-accent-light transition-smooth mb-6 group">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-smooth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className={`text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-smooth ${getTagColor(tag)}`}>
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-snug">{post.title}</h1>

          <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-sm text-foreground-secondary">
            <time className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {post.date}
            </time>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="flex gap-4 md:gap-8">
          <article className="flex-1 min-w-0 animate-fade-in">
            <div className="bg-surface rounded-2xl shadow-card p-5 sm:p-8 md:p-12">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Post Actions - Like, Share, Comment */}
            <div className="mt-8 py-6 border-t border-b border-border/50">
              <PostActions slug={slug} title={post.title} />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-8">
                <RelatedPosts posts={relatedPosts} />
              </div>
            )}

            <div className="mt-8">
              <PostNavigation prev={prev} next={next} />
            </div>

            {/* Comments Section */}
            <Comments />
          </article>
          <TableOfContents content={post.content} />
        </div>
      </div>
    </div>
  );
}
