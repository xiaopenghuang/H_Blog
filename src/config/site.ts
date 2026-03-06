export const siteConfig = {
  // ============ 基本信息 ============
  name: 'XiaoPeng',
  description: '生活如此多娇，岂能辜负。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com',

  // ============ Logo ============
  logo: {
    text: 'XP',
    subtitle: 'TECH BLOG',
  },

  // ============ 作者信息 ============
  author: {
    name: 'XiaoPeng',
    role: 'VibeCoding爱好者',
    bio: '热爱技术的开发者，喜欢探索新技术和分享知识。专注于 AI 工具开发与 Web 应用。',
    avatar: 'src/config/1.jpg',
    email: process.env.NEXT_PUBLIC_EMAIL || '',
    qq: process.env.NEXT_PUBLIC_QQ || '',
    github: 'https://github.com/xiaopenghuang',
    githubUsername: 'xiaopenghuang',
  },

  // ============ 导航菜单 ============
  navItems: [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/posts', label: '文章', icon: '📝' },
    { href: '/tags', label: '标签', icon: '🏷️' },
    { href: '/archives', label: '归档', icon: '📚' },
    { href: '/about', label: '关于', icon: '👋' },
  ],

  // ============ 首页设置 ============
  homepage: {
    recentPostsCount: 4,
    meteorCount: 8,
  },

  // ============ GitHub 仓库展示 ============
  githubRepos: [
    'xiaopenghuang/KonataAPI',
    'xiaopenghuang/API-Checker',
  ],

  // ============ 技术栈 ============
  techStack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Tailwind CSS', 'Vue'],

  // ============ 评论系统 (Giscus) ============
  giscus: {
    repo: 'xiaopenghuang/H_Blog',
    repoId: 'R_kgDORcWvxw',
    category: 'Announcements',
    categoryId: 'DIC_kwDORcWvx84C3zLy',
    mapping: 'pathname',
    lang: 'zh-CN',
  },

  // ============ 页脚信息 ============
  footer: {
    text: 'Built with Next.js & Tailwind CSS.',
  },
};
