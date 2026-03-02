import Link from 'next/link';
import { PostMeta } from '@/lib/posts';

interface RelatedPostsProps {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
      <h3 className="text-lg font-semibold text-[#0a2540] mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#635bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        相关文章
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="flex flex-wrap gap-2 mb-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-[#f6f9fc] text-[#425466] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="font-medium text-[#0a2540] group-hover:text-[#635bff] transition-smooth line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-[#425466] mt-1 line-clamp-1">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
