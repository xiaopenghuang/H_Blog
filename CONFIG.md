# 博客配置指南

## 基本信息修改

### 1. 博客名称

**文件**: `src/components/Header.tsx`

```tsx
// 第 21-24 行，修改 "My Blog" 为你的博客名称
<Link href="/" className="...">
  My Blog  // ← 改这里
</Link>
```

**文件**: `src/components/Footer.tsx`

```tsx
// 第 9 行
© {currentYear} My Blog. All rights reserved.  // ← 改这里
```

**文件**: `src/app/layout.tsx`

```tsx
// 第 18-19 行
export const metadata: Metadata = {
  title: "My Blog",  // ← 改这里
  description: "A personal blog built with Next.js",  // ← 改这里
};
```

---

### 2. 个人头像

**文件**: `src/app/about/page.tsx` 和 `src/app/page.tsx`

目前使用渐变色 + 文字作为头像占位。如需使用真实图片：

```tsx
// 将这段
<div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#635bff] to-[#00d4ff] flex items-center justify-center text-white text-4xl font-bold">
  Hi
</div>

// 替换为
<img
  src="/avatar.jpg"  // 把图片放到 public/avatar.jpg
  alt="头像"
  className="w-32 h-32 rounded-full object-cover"
/>
```

---

### 3. 社交链接

**文件**: `src/components/Footer.tsx` (页脚)

```tsx
// 第 17-19 行，修改 GitHub 链接
<a href="https://github.com/你的用户名" ...>

// 第 24-26 行，修改 Twitter/X 链接
<a href="https://twitter.com/你的用户名" ...>
```

**文件**: `src/app/about/page.tsx` (关于页)

```tsx
// 第 36-38 行 GitHub
<a href="https://github.com/你的用户名" ...>

// 第 44-46 行 Twitter/X
<a href="https://twitter.com/你的用户名" ...>

// 第 52-54 行 Email
<a href="mailto:你的邮箱@example.com" ...>
```

同时修改页面底部的联系方式文字（约第 100-103 行）：

```tsx
<ul className="list-disc list-inside space-y-1">
  <li>Email: 你的邮箱@example.com</li>
  <li>GitHub: github.com/你的用户名</li>
  <li>Twitter: @你的用户名</li>
</ul>
```

---

### 4. 关于页个人信息

**文件**: `src/app/about/page.tsx`

```tsx
// 第 29 行，修改名字
<h2 className="text-2xl font-bold ...">你的名字</h2>

// 第 30 行，修改职业/标签
<p className="text-[#635bff] ...">全栈开发者 / 技术爱好者</p>

// 第 68-70 行，修改自我介绍
<p>欢迎来到我的个人博客！我是一名...</p>

// 第 79 行，修改技术栈标签
{['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'].map(...)}
```

---

### 5. 首页介绍文字

**文件**: `src/app/page.tsx`

```tsx
// 第 36-39 行，修改标题
<h1 className="...">
  欢迎来到我的
  <span className="text-[#635bff]">个人博客</span>
</h1>

// 第 40-42 行，修改副标题
<p className="...">
  在这里，我分享关于技术、设计和生活的思考...
</p>

// 第 115-117 行，修改关于卡片介绍
<p className="...">
  我是一名热爱技术的开发者...
</p>
```

---

## 添加新文章

在 `content/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
date: 2024-01-20
excerpt: 文章摘要，会显示在列表中
tags:
  - 标签1
  - 标签2
---

正文内容，支持 Markdown 语法...
```

---

## 添加网站图标 (Favicon)

将图标文件放到 `public/` 目录：

- `public/favicon.ico` - 浏览器标签图标
- `public/apple-touch-icon.png` - iOS 书签图标 (180x180)

然后在 `src/app/layout.tsx` 中添加：

```tsx
export const metadata: Metadata = {
  title: "My Blog",
  description: "...",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

---

## 常用命令

```bash
npm run dev    # 开发模式 http://localhost:3000
npm run build  # 构建生产版本
npm run start  # 启动生产服务器
```

---

## 文件结构速查

```
personal-blog/
├── content/posts/       # 📝 文章 Markdown 文件
├── public/              # 🖼️ 静态资源 (图片、图标)
├── src/
│   ├── app/
│   │   ├── page.tsx     # 首页
│   │   ├── about/       # 关于页
│   │   ├── posts/       # 文章页
│   │   └── layout.tsx   # 全局布局 & SEO
│   └── components/
│       ├── Header.tsx   # 导航栏
│       └── Footer.tsx   # 页脚
└── CLAUDE.md            # 设计规范
```
