# 🚀 使用 pnpm 或 Bun 构建 Beautiful Mermaid 插件

## 📦 安装依赖

### 使用 pnpm（推荐 - 最快）

```bash
cd beautiful-mermaid-obsidian
pnpm install
```

### 使用 Bun（最快的运行时）

```bash
cd beautiful-mermaid-obsidian
bun install
```

### 使用 npm（传统）

```bash
cd beautiful-mermaid-obsidian
npm install
```

---

## 🔨 构建插件

### 使用 pnpm

```bash
# 开发模式（监听文件变化）
pnpm run dev

# 生产构建
pnpm run build
```

### 使用 Bun

```bash
# 开发模式
pnpm run dev:bun

# 生产构建
pnpm run build:bun
```

### 使用 npm

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
```

---

## ⚡ 性能对比

| 包管理器 | 安装速度 | 构建速度 | 优势 |
|---------|---------|---------|------|
| **Bun** | ⚡⚡⚡ | ⚡⚡⚡ | 最快，零配置 |
| **pnpm** | ⚡⚡ | ⚡⚡ | 节省磁盘空间，严格依赖 |
| **npm** | ⚡ | ⚡ | 最通用，默认支持 |

---

## 📋 完整构建流程

### 使用 pnpm

```bash
# 1. 进入项目目录
cd beautiful-mermaid-obsidian

# 2. 安装依赖
pnpm install

# 3. 构建插件
pnpm run build

# 4. 查看生成的文件
ls -lh main.js manifest.json
```

### 使用 Bun

```bash
# 1. 进入项目目录
cd beautiful-mermaid-obsidian

# 2. 安装依赖
bun install

# 3. 构建插件
bun run build:bun

# 4. 查看生成的文件
ls -lh main.js manifest.json
```

---

## 🛠️ 开发模式

### pnpm 开发模式

```bash
pnpm run dev
```

监听文件变化，自动重新构建。只需重载 Obsidian 即可看到更改。

### Bun 开发模式

```bash
bun run dev:bun
```

Bun 的开发模式启动更快，适合频繁修改代码。

---

## 📊 为什么使用 pnpm 或 Bun？

### pnpm 优势

- ✅ **快速** - 比 npm 快 2 倍
- ✅ **节省空间** - 使用硬链接，节省 50% 磁盘空间
- ✅ **严格依赖** - 避免幽灵依赖问题
- ✅ **Monorepo 支持** - 适合大型项目

### Bun 优势

- ✅ **极快** - 比 npm 快 20 倍，比 pnpm 快 4 倍
- ✅ **内置工具** - 不需要安装额外包管理器
- ✅ **兼容性好** - Drop-in 替代 Node.js
- ✅ **零配置** - 开箱即用

---

## 🔄 从 npm 迁移

### 如果已经有 node_modules

```bash
# 清理旧的依赖
rm -rf node_modules package-lock.json

# 使用 pnpm 重新安装
pnpm install

# 或使用 Bun
bun install
```

### 如果已经有 pnpm-lock.yaml

可以直接使用 Bun：

```bash
bun install
```

Bun 会自动识别 pnpm-lock.yaml。

---

## 🎯 推荐使用场景

### 使用 pnpm 如果：

- 🏢 团队项目，需要统一依赖管理
- 📦 多包仓库（Monorepo）
- 💻 需要与现有 CI/CD 管道兼容
- 🎯 追求构建速度和磁盘空间平衡

### 使用 Bun 如果：

- ⚡ 需要最快的构建速度
- 🚀 个人项目或原型开发
- 🎯 想要零配置体验
- 💻 本地开发为主

---

## 📝 快速开始指南

### 选择 1：pnpm（推荐）

```bash
# 安装 pnpm（如果还没安装）
npm install -g pnpm

# 克隆项目
git clone <your-repo-url>
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
git clone <your-repo-url>
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
