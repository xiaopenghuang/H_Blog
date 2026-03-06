# 自定义配置指南

所有可配置项集中在 **两个文件** 中，修改后重启开发服务器即可生效。

---

## 文件 1：`.env.local`（私密信息，不上传 Git）

首次使用请复制模板：
```bash
cp .env.example .env.local
```

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 博客部署后的正式域名（本地开发可不填） | `https://myblog.com` |
| `NEXT_PUBLIC_EMAIL` | 联系邮箱 | `hello@example.com` |
| `NEXT_PUBLIC_QQ` | QQ 号 | `123456789` |

---

## 文件 2：`src/config/site.ts`（所有站点配置）

打开这个文件，按注释分区修改即可。以下是每个配置项的说明：

### 基本信息

```typescript
name: 'XiaoP',           // 网站名称（Logo 旁、浏览器标签、页脚）
description: '一个使用...',       // 网站描述（SEO、页脚）
```

### Logo

```typescript
logo: {
  text: 'XP',                   // Logo 方块中的文字
  subtitle: 'TECH BLOG',        // Logo 旁的副标题（桌面端可见）
},
```

### 作者信息

```typescript
author: {
  name: 'XiaoPeng',             // 你的名字
  role: '全栈开发者 / 技术爱好者', // 你的角色/职位
  bio: '热爱技术的开发者...',     // 个人简介
  avatar: 'https://github.com/xiaopenghuang.png',  // 头像（见下方说明）
  github: 'https://github.com/xxx',  // GitHub 主页
  githubUsername: 'xxx',              // GitHub 用户名
},
```

> **头像支持三种写法：**
> - 网络图片：`'https://github.com/xiaopenghuang.png'`（GitHub 头像、图床链接等）
> - 本地图片：`'/avatar.jpg'`（把图片放到 `public/` 文件夹下）
> - 文字头像：`'XP'`（显示文字在圆圈中）

### 导航菜单

```typescript
navItems: [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/posts', label: '文章', icon: '📝' },
  { href: '/tags', label: '标签', icon: '🏷️' },
  { href: '/archives', label: '归档', icon: '📚' },
  { href: '/about', label: '关于', icon: '👋' },
],
```

增删改导航项直接编辑数组。`href` 对应 `src/app/` 下的路由。页头和页脚会自动同步。

### 首页设置

```typescript
homepage: {
  recentPostsCount: 4,           // 首页显示最近几篇文章
  meteorCount: 8,                // 流星雨数量（0 = 关闭）
},
```

### GitHub 仓库展示

```typescript
githubRepos: [
  'xiaopenghuang/KonataAPI',     // 格式：用户名/仓库名
  'xiaopenghuang/API-Checker',
],
```

首页自动拉取仓库信息。增删仓库直接编辑数组，留空数组 `[]` 则不显示。

### 技术栈

```typescript
techStack: ['TypeScript', 'React', 'Next.js', ...],
```

显示在首页个人卡片中，改成你擅长的技术。

### 评论系统（Giscus）

```typescript
giscus: {
  repo: 'xiaopenghuang/H_Blog',              // 存放评论的公开仓库
  repoId: 'R_kgDORcWvxw',                    // 仓库 ID
  category: 'Announcements',                  // Discussion 分类
  categoryId: 'DIC_kwDORcWvx84C3zLy',        // 分类 ID
  mapping: 'pathname',                         // 映射方式
  lang: 'zh-CN',                               // 语言
},
```

获取 `repoId` 和 `categoryId`：访问 [giscus.app/zh-CN](https://giscus.app/zh-CN)，填入仓库名，页面底部生成的代码中包含这些值。

### 页脚

```typescript
footer: {
  text: 'Built with Next.js & Tailwind CSS.',  // 页脚版权旁的文字
},
```

---

## 博客文章

目录：`content/posts/`

每篇文章是一个 `.md` 文件，文件名即 URL 路径（`my-post.md` → `/posts/my-post`）。

头部格式：
```markdown
---
title: 文章标题
date: 2024-01-15
excerpt: 文章摘要
tags:
  - 标签1
  - 标签2
---

正文（Markdown 语法）...
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期（`YYYY-MM-DD`） |
| `excerpt` | 推荐 | 摘要，显示在列表页 |
| `tags` | 推荐 | 标签数组 |

---

## 关于页面

文件：`src/app/about/page.tsx`

直接编辑 JSX 内容。姓名、简介等已从 `siteConfig` 读取。

---

## 快速上手清单

- [ ] 复制 `.env.example` 为 `.env.local`，填入邮箱和 QQ
- [ ] 修改 `src/config/site.ts` 中的所有配置项
- [ ] 删除 `content/posts/` 下的示例文章，写自己的
- [ ] 编辑 `src/app/about/page.tsx` 关于页内容
