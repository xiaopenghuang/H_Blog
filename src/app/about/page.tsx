import { siteConfig } from '@/config/site';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: '了解更多关于我和这个博客的故事',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            关于我
          </h1>
          <p className="text-foreground-secondary">了解更多关于我和这个博客的故事</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 md:gap-8">
          <div className="flex-1 min-w-0 space-y-5">
            <div className="card shadow-card p-7">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
                你好！
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-sm">
                欢迎来到我的个人博客！我是一名热爱技术的开发者，对编程、设计和创造有着浓厚的兴趣。
              </p>
            </div>

            <div className="card shadow-card p-7">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                关于这个博客
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-sm">
                这个博客是我记录学习历程、分享技术心得和生活感悟的地方。我相信知识的分享能够帮助更多的人，
                也希望通过写作来整理和深化自己的思考。
              </p>
            </div>

            <div className="card shadow-card p-7">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                技术栈
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {siteConfig.techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2 px-3 py-2.5 card rounded-xl">
                    <span className="font-medium text-foreground text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card shadow-card p-7">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                联系我
              </h3>
              <div className="space-y-2">
                <a href={`mailto:${siteConfig.author.email}`} className="flex items-center gap-3 text-sm text-foreground-secondary hover:text-accent transition-smooth p-2 rounded-lg hover:bg-accent/5">
                  {siteConfig.author.email}
                </a>
                <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground-secondary hover:text-accent transition-smooth p-2 rounded-lg hover:bg-accent/5">
                  {siteConfig.author.github}
                </a>
                <span className="flex items-center gap-3 text-sm text-foreground-secondary p-2">
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
