---
title: Tailwind CSS 实用技巧
date: 2024-01-05
excerpt: 分享一些在日常开发中非常实用的 Tailwind CSS 技巧，帮助你更高效地编写样式代码。
tags:
  - 技术
  - CSS
  - Tailwind
---

# Tailwind CSS 实用技巧

Tailwind CSS 是一个功能类优先的 CSS 框架，它让我们能够快速构建现代化的用户界面。本文分享一些实用技巧。

## 1. 使用任意值

当预设的值不满足需求时，可以使用方括号语法：

```html
<div class="w-[137px] h-[50vh] bg-[#635bff]">
  自定义宽度、高度和颜色
</div>
```

## 2. 响应式设计

Tailwind 的响应式前缀让适配不同屏幕变得简单：

```html
<div class="text-sm md:text-base lg:text-lg">
  响应式文字大小
</div>
```

断点说明：

| 前缀 | 最小宽度 |
|------|----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## 3. 状态变体

处理悬停、焦点等状态：

```html
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2 active:bg-blue-700">
  交互按钮
</button>
```

## 4. 组合使用 Group 和 Peer

`group` 和 `peer` 让你可以基于父元素或兄弟元素的状态来设置样式：

```html
<div class="group">
  <h3 class="group-hover:text-blue-500">标题</h3>
  <p class="group-hover:opacity-100 opacity-50">描述</p>
</div>
```

## 5. 使用 @apply 提取组件

当某些样式组合频繁使用时，可以用 `@apply` 提取：

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
}
```

## 6. 暗色模式

Tailwind 内置暗色模式支持：

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  自动适应暗色模式
</div>
```

## 7. 动画效果

使用内置的过渡和动画类：

```html
<div class="transition-all duration-300 ease-in-out hover:scale-105">
  平滑缩放效果
</div>
```

## 8. 精致阴影

多层阴影创造更精致的效果：

```html
<div class="shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
  多层阴影卡片
</div>
```

## 总结

Tailwind CSS 的强大之处在于它的灵活性和可组合性。掌握这些技巧后，你会发现编写样式变得更加高效和愉快！
