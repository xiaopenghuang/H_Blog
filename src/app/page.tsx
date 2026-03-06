import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/config/site';
import HeroProfileCard from '@/components/HeroProfileCard';
import GitHubCardLarge from '@/components/GitHubCardLarge';
import MeteorShower from '@/components/MeteorShower';

const TAG_COLORS = ['tag-purple', 'tag-cyan', 'tag-pink', 'tag-orange', 'tag-green'];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, siteConfig.homepage.recentPostsCount);
  const totalTags = new Set(allPosts.flatMap(p => p.tags)).size;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-30" />
        <MeteorShower count={siteConfig.homepage.meteorCount} />

        {/* Floating orbs */}
        <div className="orb w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-accent/20 top-[-80px] left-[-40px] animate-float-slow" />
        <div className="orb w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 bg-cyan/15 bottom-[-40px] right-[-20px] animate-float-slower" />
        <div className="orb w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-pink/12 top-[20%] right-[30%] animate-float hidden sm:block" />
        <div className="orb w-24 sm:w-32 h-24 sm:h-32 bg-violet/10 bottom-[10%] left-[25%] animate-float-slow hidden sm:block" />

        {/* Particles - hidden on mobile */}
        <div className="particle top-[15%] left-[12%] bg-accent hidden sm:block" style={{ '--duration': '4s', '--delay': '0s' } as React.CSSProperties} />
        <div className="particle top-[35%] right-[15%] bg-pink hidden sm:block" style={{ '--duration': '3s', '--delay': '1s' } as React.CSSProperties} />
        <div className="particle top-[60%] left-[40%] bg-cyan hidden sm:block" style={{ '--duration': '5s', '--delay': '0.5s' } as React.CSSProperties} />
        <div className="particle top-[25%] right-[40%] bg-orange hidden sm:block" style={{ '--duration': '3.5s', '--delay': '1.5s' } as React.CSSProperties} />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-12 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Hero Text */}
            <div className="flex-1 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 backdrop-blur-sm border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse-glow" />
                欢迎访问
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.15] mb-6">
                探索技术与创意的
                <span className="gradient-text block mt-2">无限可能</span>
              </h1>
              <p className="text-lg text-foreground-secondary mb-8 leading-relaxed max-w-xl">
                在这里，我分享关于技术、设计和生活的思考。希望这些文字能给你带来一些启发和帮助。
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {siteConfig.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/posts"
                  className="btn-gradient inline-flex items-center px-7 py-3.5 text-white font-semibold rounded-xl shadow-button hover:shadow-glow-accent"
                >
                  <span className="relative z-10 flex items-center">
                    浏览文章
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-7 py-3.5 glass-card text-foreground font-semibold rounded-xl hover-lift hover:shadow-card-hover border border-border/50"
                >
                  了解更多
                </Link>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="w-full lg:w-[440px] shrink-0 animate-slide-in-right">
              <HeroProfileCard />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 md:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up">
          {[
            { label: '文章', value: allPosts.length, gradient: 'from-accent to-violet', icon: '📝' },
            { label: '标签', value: totalTags, gradient: 'from-pink to-rose', icon: '🏷️' },
            { label: '阅读时间', value: '∞', gradient: 'from-cyan to-green', icon: '⏱️' },
            { label: '创作中', value: '...', gradient: 'from-orange to-pink', icon: '🚀' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 text-center hover-lift border border-border/30">
              <div className="text-2xl mb-1.5">{stat.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-foreground-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="w-1.5 h-7 bg-gradient-to-b from-accent to-cyan rounded-full" />
            最新文章
          </h2>
          <Link
            href="/posts"
            className="text-sm text-accent font-medium hover:text-accent-light transition-smooth flex items-center gap-1 group"
          >
            查看全部
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-smooth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 mb-14">
          {recentPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`block gradient-border-card hover-lift shadow-card hover:shadow-card-hover p-6 animate-fade-in-up stagger-${Math.min(i + 1, 5)} group`}
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">
                {post.title}
              </h3>
              <p className="text-foreground-secondary text-sm mb-4 flex-1 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <time className="text-xs text-foreground-secondary">{post.date}</time>
                <span className="text-xs text-foreground-secondary">{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* GitHub Projects */}
        {siteConfig.githubRepos.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="w-1.5 h-7 bg-gradient-to-b from-pink to-orange rounded-full" />
                GitHub 开源项目
              </h2>
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent font-medium hover:text-accent-light transition-smooth flex items-center gap-1 group"
              >
                更多项目
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-smooth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {siteConfig.githubRepos.map((repo) => (
                <GitHubCardLarge key={repo} repo={repo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
