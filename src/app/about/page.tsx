import { siteConfig } from '@/config/site';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: '了解更多关于我和这个博客的故事',
};

const TECH_ICONS: Record<string, string> = {
  'TypeScript': '🔷', 'React': '⚛️', 'Next.js': '▲', 'Node.js': '🟩', 'Tailwind CSS': '🎨', 'PostgreSQL': '🐘',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden wave-divider">
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="orb w-60 h-60 bg-cyan/15 top-[-30px] right-[10%] animate-float-slow" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-4">
            👋 关于
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            关于<span className="gradient-text">我</span>
          </h1>
          <p className="text-foreground-secondary">了解更多关于我和这个博客的故事</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0 space-y-5">
            <div className="gradient-border-card shadow-card p-7 animate-fade-in-up stagger-1">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-sm">👋</span>
                你好！
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-sm">
                欢迎来到我的个人博客！我是一名热爱技术的开发者，对编程、设计和创造有着浓厚的兴趣。
              </p>
            </div>

            <div className="gradient-border-card shadow-card p-7 animate-fade-in-up stagger-2">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-pink/10 flex items-center justify-center text-sm">🚀</span>
                关于这个博客
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-sm">
                这个博客是我记录学习历程、分享技术心得和生活感悟的地方。我相信知识的分享能够帮助更多的人，
                也希望通过写作来整理和深化自己的思考。
              </p>
            </div>

            <div className="gradient-border-card shadow-card p-7 animate-fade-in-up stagger-3">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-cyan/10 flex items-center justify-center text-sm">💻</span>
                技术栈
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {siteConfig.techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2 px-3 py-2.5 glass-card rounded-xl hover-lift">
                    <span className="text-base">{TECH_ICONS[tech] || '🔧'}</span>
                    <span className="font-medium text-foreground text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="gradient-border-card shadow-card p-7 animate-fade-in-up stagger-4">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange/10 flex items-center justify-center text-sm">📫</span>
                联系我
              </h3>
              <div className="space-y-2">
                <a href={`mailto:${siteConfig.author.email}`} className="flex items-center gap-3 text-sm text-foreground-secondary hover:text-accent transition-smooth p-2 rounded-lg hover:bg-accent/5">
                  <span className="w-7 h-7 rounded-lg bg-pink/10 flex items-center justify-center text-xs">📧</span>
                  {siteConfig.author.email}
                </a>
                <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground-secondary hover:text-accent transition-smooth p-2 rounded-lg hover:bg-accent/5">
                  <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-xs">🐙</span>
                  {siteConfig.author.github}
                </a>
                <span className="flex items-center gap-3 text-sm text-foreground-secondary p-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan/10 flex items-center justify-center text-xs">💬</span>
                  QQ: {siteConfig.author.qq}
                </span>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
