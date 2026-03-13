---
title: Claude Code 与 Codex CLI 配置实战
date: 2026-03-13
excerpt: 聊完了理论和场景策略，这篇直接上手，看看在 Claude Code 和 Codex CLI 中怎么配置 Prompt、Skills 和 MCP。
tags:
  - 技术
  - AI
  - Agent
  - Claude Code
---

# Claude Code 与 Codex CLI 配置实战

前两篇分别聊了 Prompt、Skills、MCP 的概念和场景搭配策略。这篇不讲理论了，直接上手——看看在 Claude Code 和 Codex CLI 这两个主流编码 Agent 工具里，具体怎么配置这三样东西。

## Claude Code 配置指南

Claude Code 的设计哲学是清晰的目录结构加简单的命令行操作，配置起来很直观。

### 配置 Prompt

在 Claude Code 中，System Prompt 就是 `CLAUDE.md` 文件。它有一套分层加载机制：

| 范围 | 路径 | 说明 |
| :--- | :--- | :--- |
| 用户全局 | `~/.claude/CLAUDE.md` | 跨所有项目的个人偏好 |
| 项目共享 | `./CLAUDE.md` | 团队通用规范，提交到 Git |
| 子目录特定 | `path/to/sub/CLAUDE.md` | 特定目录下的规则 |
| 规则文件 | `.claude/rules/*.md` | 按文件路径动态加载的精细规则 |

快速开始很简单：进入项目目录，运行 `/init`，Claude Code 会自动分析代码库，生成一份包含技术栈和编码规范的 `CLAUDE.md` 作为起点。

有两个实用技巧：用 `@path/to/file.md` 语法可以在 `CLAUDE.md` 中导入其他文件内容；每个文件建议不超过 200 行，太长了 Agent 的遵循效果会打折扣。

### 配置 Skills

Skills 是 Claude Code 的能力扩展模块。一个 Skill 就是一个目录，核心是 `SKILL.md` 文件：

```bash
~/.claude/skills/my-awesome-skill/
├── SKILL.md         # 核心指令
└── scripts/
    └── helper.sh    # 可选的辅助脚本
```

`SKILL.md` 由两部分组成——YAML frontmatter 配置元数据，Markdown 正文编写指令：

```yaml
---
name: my-awesome-skill
description: "当用户需要做某件事时使用此技能。"
disable-model-invocation: true
---

执行步骤：
1. 运行命令: `bash ${CLAUDE_SKILL_DIR}/scripts/helper.sh`
2. 分析输出
3. 总结结果
```

个人通用技能放 `~/.claude/skills/`，项目专用技能放 `.claude/skills/`。调用方式有两种：用 `/skill-name` 手动触发，或者让 Claude 根据 `description` 自动匹配。

### 配置 MCP

MCP 让 Claude Code 能连接外部服务。主要通过命令行管理：

```bash
# 添加远程 HTTP 服务器
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 添加本地 STDIO 服务器
claude mcp add --transport stdio my-tool --env API_KEY=... -- npx -y my-tool-server

# 查看和删除
claude mcp list
claude mcp remove notion
```

添加时可以用 `--scope` 指定生效范围：`user` 对所有项目生效，`project` 写入 `.mcp.json` 供团队共享，`local`（默认）仅对你在此项目中生效。会话中随时用 `/mcp` 查看当前连接状态。

## Codex CLI 配置指南

OpenAI 的 Codex CLI 给了用户更高的自由度，配置主要靠 `config.toml` 和特定目录结构。

### 配置 Prompt

Codex CLI 的系统提示词默认文件名是 `AGENTS.md`。它的加载逻辑是从全局到局部，把所有发现的文件内容拼接起来——越靠近当前工作目录的指令，优先级越高。

加载顺序：
1. 全局：`~/.codex/AGENTS.md`
2. 项目根目录：`$GIT_ROOT/AGENTS.md`
3. 当前目录及父目录：`./AGENTS.md`、`../AGENTS.md` 等

如果你想自定义文件名或调整大小限制，可以在 `~/.codex/config.toml` 里配：

```toml
# 自定义文件名
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]

# 调整最大体积（默认 32KB）
project_doc_max_bytes = 65536
```

### 配置 Skills

Codex 的 Skills 概念和 Claude Code 类似，但目录结构略有不同：

| 作用域 | 路径 | 场景 |
| :--- | :--- | :--- |
| 用户级 | `$HOME/.agents/skills/` | 个人通用技能 |
| 仓库级 | `$REPO_ROOT/.agents/skills/` | 团队共享技能 |
| 系统级 | `/etc/codex/skills/` | 管理员统一配置 |

除了 `SKILL.md`，Codex 还支持可选的 `agents/openai.yaml` 做更精细的控制：

```yaml
policy:
  # false 表示只能通过 $skill-name 显式调用
  allow_implicit_invocation: false

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
```

使用时在提示中提及技能名，或用 `$skill-name` 显式调用。Codex 还内置了 `$skill-installer`，可以从社区安装新技能。

### 配置 MCP

Codex 的 MCP 配置集中在 `config.toml` 里，控制选项很丰富：

```toml
# 本地 STDIO 服务器
[mcp_servers.my_local_db]
command = "python"
args = ["-m", "my_db_mcp_server"]

[mcp_servers.my_local_db.env]
DB_CONNECTION_STRING = "..."

# 远程 HTTP 服务器
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"

# 精细控制工具权限
[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
disabled_tools = ["eval_js"]
```

也可以用命令行快速添加：

```bash
codex mcp add my-tool -- npx -y my-tool-mcp
```

## 总结对比

| 组件 | Claude Code | Codex CLI |
| :--- | :--- | :--- |
| Prompt | `CLAUDE.md`，分层加载 | `AGENTS.md`，拼接加载，`config.toml` 可配 |
| Skills | `~/.claude/skills/`，`SKILL.md` + frontmatter | `~/.agents/skills/`，`SKILL.md` + `openai.yaml` |
| MCP | `claude mcp` 命令行，`--scope` 指定范围 | `config.toml` 集中配置，`codex mcp` 辅助 |

两款工具的设计思路各有侧重：Claude Code 偏向约定优于配置，上手快；Codex CLI 给了更多自定义空间，灵活度高。选哪个取决于你的使用习惯，核心的 Prompt + Skills + MCP 三层架构是相通的。
