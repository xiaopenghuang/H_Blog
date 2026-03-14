import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title || 'Article';
  const tags = post?.tags || [];
  const date = post?.date || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Tags */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Middle: Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '48px' : '56px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </div>

        {/* Bottom: Author & Date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              {siteConfig.author.name[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: 600 }}>
                {siteConfig.author.name}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '18px' }}>{date}</span>
            </div>
          </div>
          <span
            style={{
              color: '#6366f1',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {siteConfig.name}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
