import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  try {
    const posts = getAllPosts();
    const searchData = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
    }));

    return NextResponse.json(searchData);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
