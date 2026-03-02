import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from '@/lib/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import PostNavigation from '@/components/PostNavigation';
import RelatedPosts from '@/components/RelatedPosts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: '文章未找到' };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug, post.tags);

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      {/* Article Header */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/posts"
            className="inline-flex items-center text-[#635bff] hover:text-[#7a73ff] transition-smooth mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs font-medium px-2 py-1 bg-[#635bff]/10 text-[#635bff] rounded-md hover:bg-[#635bff]/20 transition-smooth"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#425466]">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content with TOC */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex gap-8">
          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
              <MarkdownRenderer content={post.content} />
            </div>
          </article>
          <TableOfContents content={post.content} />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <RelatedPosts posts={relatedPosts} />
            </div>
            <div className="hidden xl:block w-64 shrink-0" />
          </div>
        </section>
      )}

      {/* Post Navigation */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <PostNavigation prev={prev} next={next} />
          </div>
          <div className="hidden xl:block w-64 shrink-0" />
        </div>
      </section>
    </div>
  );
}
