# 🚀 使用 Bun 构建 Beautiful Mermaid 插件

本项目使用 [Bun](https://bun.sh/) 作为包管理器和构建工具，提供极快的安装和构建速度。

## 📦 安装依赖

```bash
cd beautiful-mermaid-obsidian
bun install
```

---

## 🔨 构建插件

```bash
# 开发模式（监听文件变化）
bun run dev

# 生产构建
bun run build

# 类型检查
bun run type-check
```

---

## ⚡ 为什么使用 Bun？

| 特性 | 说明 |
|------|------|
| **极快速度** | 比 npm 快 20 倍，比 pnpm 快 4 倍 |
| **内置工具** | 不需要安装额外包管理器 |
| **兼容性好** | Drop-in 替代 Node.js |
| **零配置** | 开箱即用 |

---

## 📋 完整构建流程

```bash
# 1. 进入项目目录
cd beautiful-mermaid-obsidian

# 2. 安装依赖
bun install

# 3. 构建插件
bun run build

# 4. 查看生成的文件
ls -lh main.js manifest.json
```

---

## 🛠️ 开发模式

```bash
bun run dev
```

监听文件变化，自动重新构建。只需重载 Obsidian 即可看到更改。

---

## 🔄 从其他包管理器迁移

### 如果已经有 node_modules（npm/pnpm）

```bash
# 清理旧的依赖
rm -rf node_modules package-lock.json pnpm-lock.yaml

# 使用 Bun 重新安装
bun install
```

Bun 会自动识别现有的 lockfile 并安装依赖。

---

## 📝 快速开始指南

```bash
# 安装 Bun（如果还没安装）
curl -fsSL https://bun.sh/install | bash

# 克隆项目
git clone https://github.com/chinaphp/beautiful-mermaid-obsidian.git
cd beautiful-mermaid-obsidian

# 安装依赖
pnpm install

# 构建
pnpm run build

# 安装到 Obsidian
./install.sh
```

### 选择 2：Bun（最快）

```bash
# 安装 Bun（如果还没安装）
curl -fsSL https://bun.sh/install | bash

# 克隆项目
git clone github.com/chinaphp/beautiful-mermaid-obsidian
cd beautiful-mermaid-obsidian

# 安装依赖
bun install

# 构建
bun run build:bun

# 安装到 Obsidian
./install.sh
```

---

## 🧪 测试构建结果

无论使用哪种包管理器，构建后的文件应该相同：

```bash
# 检查 main.js
ls -lh main.js

# 输出应该类似于：
# -rw-r--r-- 1 user  staff   9.9K Feb  4 16:32 main.js
```

---

## 🐛 故障排除

### 问题：pnpm install 失败

**解决方案：**
```bash
# 清理缓存
pnpm store prune

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题：bun install 失败

**解决方案：**
```bash
# 更新 Bun
bun upgrade

# 重新安装
rm -rf node_modules bun.lockb
bun install
```

### 问题：构建后文件大小不同

**说明：** 这是正常的，不同包管理器可能产生略微不同的打包结果。只要文件能正常工作即可。

---

## 📚 相关资源

- [pnpm 官网](https://pnpm.io/)
- [Bun 官网](https://bun.sh/)
- [Obsidian 插件开发](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [esbuild 文档](https://esbuild.github.io/)

---

## 🎉 总结

| 任务 | pnpm | Bun |
|------|-------|-----|
| 安装依赖 | `pnpm install` | `bun install` |
| 开发构建 | `pnpm run dev` | `bun run dev:bun` |
| 生产构建 | `pnpm run build` | `bun run build:bun` |
| 清理缓存 | `pnpm store prune` | `bun pm cache rm` |

**推荐：** 
- 团队项目 → **pnpm**
- 个人开发 → **Bun**
- 保守选择 → **npm**

---

**选择你喜欢的包管理器，享受更快的构建速度！⚡**
