import Link from 'next/link';
import { PostMeta } from '@/lib/posts';

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

interface RelatedPostsProps {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl shadow-card p-6 md:p-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </span>
        相关文章
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block p-3 rounded-xl hover:bg-secondary/50 transition-smooth">
              <div className="flex flex-wrap gap-2 mb-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="font-medium text-foreground group-hover:text-accent transition-smooth line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-foreground-secondary mt-1 line-clamp-1">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
