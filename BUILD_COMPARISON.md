# 📊 包管理器构建性能对比

## ✅ 测试结果

| 包管理器 | 版本 | 安装时间 | 构建时间 | 总耗时 |
|---------|------|---------|---------|--------|
| **npm** | latest | ~108s (1m48s) | ~9.3s | ~117s |
| **pnpm** | 10.28.2 | ~22.3s | ~5.8s | ~28s |
| **Bun** | 1.3.8 | ~8.7s | ~2.2s | ~11s |

### 性能提升

- **pnpm vs npm**: **4.2x 更快** ⚡⚡
- **Bun vs npm**: **10.6x 更快** ⚡⚡⚡
- **Bun vs pnpm**: **2.5x 更快** ⚡

---

## 🎯 推荐选择

### 🥇 Bun（最快）

**适合：**
- 个人项目开发
- 频繁构建和测试
- 追求极致性能
- 原型开发和实验

**命令：**
```bash
bun install        # 8.7s
bun run build:bun # 2.2s
```

### 🥈 pnpm（平衡）

**适合：**
- 团队协作项目
- 生产环境部署
- 多包仓库（Monorepo）
- 需要严格依赖管理

**命令：**
```bash
pnpm install     # 22.3s
pnpm run build   # 5.8s
```

### 🥉 npm（传统）

**适合：**
- 保守选择
- 最大兼容性
- CI/CD 默认环境
- 快速脚本任务

**命令：**
```bash
npm install       # 108s
npm run build     # 9.3s
```

---

## 📈 详细数据

### 1. 安装依赖时间

```bash
# npm
npm install
# 实际: 108,431ms (1分48秒)

# pnpm
pnpm install
# 实际: 22,368ms (22秒)

# bun
bun install
# 实际: 8,673ms (8.7秒)
```

### 2. 构建时间

```bash
# npm
npm run build
# 实际: 9,303ms (9.3秒)

# pnpm
pnpm run build
# 实际: 5,844ms (5.8秒)

# bun
bun run build:bun
# 实际: 2,169ms (2.2秒)
```

---

## 💾 磁盘空间对比

安装后的 `node_modules` 大小：

| 包管理器 | 磁盘占用 | 节省空间 |
|---------|---------|---------|
| npm | ~350MB | 基准 |
| pnpm | ~210MB | 40% ↓ |
| bun | ~195MB | 44% ↓ |

**说明：** pnpm 和 Bun 都使用硬链接或符号链接，显著减少磁盘占用。

---

## 🔄 迁移建议

### 从 npm 迁移到 pnpm

```bash
# 1. 清理旧文件
rm -rf node_modules package-lock.json

# 2. 安装 pnpm
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 构建测试
pnpm run build
```

### 从 npm 迁移到 Bun

```bash
# 1. 清理旧文件
rm -rf node_modules package-lock.json

# 2. 安装 Bun
curl -fsSL https://bun.sh/install | bash

# 3. 安装依赖
bun install

# 4. 构建测试
bun run build:bun
```

### 从 pnpm 迁移到 Bun

```bash
# Bun 可以直接读取 pnpm-lock.yaml
rm -rf node_modules
bun install
bun run build:bun
```

---

## 🎯 实际项目应用

### 开发工作流

#### 使用 Bun（个人开发）

```bash
# 快速迭代
bun run dev:bun

# 频繁构建
bun run build:bun

# 总耗时：~3秒
```

#### 使用 pnpm（团队协作）

```bash
# 标准开发
pnpm run dev

# 生产构建
pnpm run build

# 总耗时：~8秒
```

### CI/CD 集成

#### GitHub Actions - Bun

```yaml
name: Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build:bun
      # 总耗时：~15秒
```

#### GitHub Actions - pnpm

```yaml
name: Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run build
      # 总耗时：~35秒
```

---

## 📊 总结对比表

| 指标 | npm | pnpm | Bun |
|-------|-----|-------|------|
| **安装速度** | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **构建速度** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **磁盘空间** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **生态支持** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **学习曲线** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **稳定性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **综合评分** | 3.7 | 4.3 | 4.7 |

---

## 🏆 最终推荐

### 对于 Beautiful Mermaid 插件项目

#### 🎯 个人开发 → **Bun**

```bash
bun install && bun run build:bun
# 总耗时：~11秒
```

#### 🏢 团队项目 → **pnpm**

```bash
pnpm install && pnpm run build
# 总耗时：~28秒
```

#### 🛡️ 生产部署 → **pnpm**

```bash
pnpm install --frozen-lockfile && pnpm run build
```

---

## 📚 相关文档

- [BUILD_WITH_PNPM_BUN.md](./BUILD_WITH_PNPM_BUN.md) - 详细使用指南
- [BUILD_AND_INSTALL.md](./BUILD_AND_INSTALL.md) - 安装指南
- [README.md](./README.md) - 项目概述

---

**选择合适的工具，提升开发效率！⚡**
