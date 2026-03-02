export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            关于我
          </h1>
          <p className="text-lg text-[#425466]">
            了解更多关于我和这个博客的故事
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
          {/* Profile */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-12 border-b border-[#e6ebf1]">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#635bff] to-[#00d4ff] flex items-center justify-center text-white text-4xl font-bold shrink-0">
              Hi
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#0a2540] mb-2">你的名字</h2>
              <p className="text-[#635bff] font-medium mb-3">全栈开发者 / 技术爱好者</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#425466] hover:text-[#635bff] transition-smooth"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#425466] hover:text-[#635bff] transition-smooth"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:your@email.com"
                  className="text-[#425466] hover:text-[#635bff] transition-smooth"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 text-[#425466] leading-relaxed">
            <h3 className="text-xl font-semibold text-[#0a2540]">👋 你好！</h3>
            <p>
              欢迎来到我的个人博客！我是一名热爱技术的开发者，对编程、设计和创造有着浓厚的兴趣。
            </p>

            <h3 className="text-xl font-semibold text-[#0a2540]">🚀 关于这个博客</h3>
            <p>
              这个博客是我记录学习历程、分享技术心得和生活感悟的地方。我相信知识的分享能够帮助更多的人，
              也希望通过写作来整理和深化自己的思考。
            </p>

            <h3 className="text-xl font-semibold text-[#0a2540]">💻 技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#f6f9fc] text-[#0a2540] rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-[#0a2540]">📫 联系我</h3>
            <p>
              如果你有任何问题、建议或者只是想打个招呼，欢迎通过以下方式联系我：
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Email: your@email.com</li>
              <li>GitHub: github.com/yourusername</li>
              <li>Twitter: @yourusername</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
