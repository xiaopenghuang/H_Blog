---
title: Next.js 入门指南
date: 2024-01-10
excerpt: Next.js 是一个强大的 React 框架，本文将介绍如何从零开始搭建一个 Next.js 项目，以及一些最佳实践。
tags:
  - 技术
  - Next.js
  - React
---

# Next.js 入门指南

Next.js 是由 Vercel 开发的 React 框架，它提供了许多开箱即用的功能，让构建现代 Web 应用变得更加简单。

## 为什么选择 Next.js？

Next.js 有很多优势：

- **服务端渲染 (SSR)** - 更好的 SEO 和首屏加载性能
- **静态站点生成 (SSG)** - 构建时生成静态页面
- **文件系统路由** - 基于文件结构自动生成路由
- **API 路由** - 轻松创建 API 端点
- **内置优化** - 图片、字体、脚本自动优化

## 快速开始

创建一个新的 Next.js 项目非常简单：

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## 项目结构

一个典型的 Next.js 项目结构如下：

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   └── lib/
├── public/
├── package.json
└── next.config.js
```

## App Router

Next.js 14 引入了新的 App Router，使用 `app` 目录来定义路由：

| 文件 | 作用 |
|------|------|
| `page.tsx` | 页面组件 |
| `layout.tsx` | 布局组件 |
| `loading.tsx` | 加载状态 |
| `error.tsx` | 错误处理 |

## 数据获取

在 App Router 中，组件默认是服务端组件，可以直接使用 async/await：

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

## 总结

Next.js 是一个功能强大且易于使用的框架，非常适合构建现代 Web 应用。希望这篇入门指南能帮助你快速上手！
