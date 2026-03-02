import Link from 'next/link';
import { PostMeta } from '@/lib/posts';

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-smooth p-6 flex flex-col"
        >
          <span className="text-xs text-[#425466] mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一篇
          </span>
          <span className="font-medium text-[#0a2540] group-hover:text-[#635bff] transition-smooth line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-smooth p-6 flex flex-col text-right"
        >
          <span className="text-xs text-[#425466] mb-2 flex items-center justify-end">
            下一篇
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="font-medium text-[#0a2540] group-hover:text-[#635bff] transition-smooth line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
