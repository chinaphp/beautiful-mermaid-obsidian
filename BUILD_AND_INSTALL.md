# 🎨 Beautiful Mermaid for Obsidian - 构建与安装指南

## ✅ 构建成功！

插件已成功构建：
- **main.js**: 9.9KB
- **manifest.json**: 已更新
- **状态**: 编译通过，无错误

## 📦 快速安装

### 方法一：自动安装（推荐）

#### macOS / Linux
```bash
cd beautiful-mermaid-obsidian
chmod +x install.sh
./install.sh
```

#### Windows (PowerShell)
```powershell
cd beautiful-mermaid-obsidian
.\install.ps1
```

### 方法二：手动安装

1. **找到 Obsidian 插件目录**

   - **macOS**: `~/Library/Application Support/obsidian/plugins/`
   - **Linux**: `~/.config/obsidian/plugins/`
   - **Windows**: `%APPDATA%\obsidian\plugins\`

2. **创建插件目录**
   ```bash
   mkdir -p ~/.config/obsidian/plugins/beautiful-mermaid
   ```

3. **复制插件文件**
   ```bash
   cp manifest.json main.js styles.css ~/.config/obsidian/plugins/beautiful-mermaid/
   ```

4. **在 Obsidian 中启用**

   - 打开 Obsidian
   - 进入 `Settings` → `Community Plugins`
   - 确保开启了 `Community plugins`
   - 在插件列表中找到 `Beautiful Mermaid`
   - 点击启用

## 🎨 使用方法

### 1. 在笔记中使用 Mermaid

只需使用标准的 Mermaid 代码块：

\`\`\`mermaid
graph TD
    A[开始] --> B{决策}
    B -->|是| C[行动]
    B -->|否| D[结束]
\`\`\`

### 2. 更改主题

1. 进入 `Settings` → `Beautiful Mermaid`
2. 从下拉菜单中选择主题
3. 重载笔记以应用更改

### 3. 切换回默认 Mermaid

如果需要使用 Obsidian 默认的 Mermaid 渲染器：
1. 进入 `Settings` → `Beautiful Mermaid`
2. 关闭 `Use Default Mermaid` 选项

## 🎨 可用主题

| 主题名称 | 类型 | 预览色系 |
|---------|------|---------|
| Tokyo Night | 暗色 | 蓝紫 |
| Tokyo Night Storm | 暗色 | 柔和蓝紫 |
| Catppuccin Mocha | 暗色 | 暖色粉紫 |
| Catppuccin Latte | 亮色 | 柔和粉紫 |
| Nord | 暗色 | 冷蓝灰 |
| Nord Light | 亮色 | 浅蓝灰 |
| Dracula | 暗色 | 粉紫 |
| GitHub Dark | 暗色 | GitHub 深色 |
| GitHub Light | 亮色 | GitHub 亮色 |
| Solarized Dark | 暗色 | 经典 Solarized |
| Solarized Light | 亮色 | 经典 Solarized |
| One Dark | 暗色 | Atom One Dark |
| Zinc Dark | 暗色 | 单色 |
| Zinc Light | 亮色 | 单色 |

## 📝 测试插件

### 1. 创建测试笔记

创建一个新笔记，粘贴以下内容：

\`\`\`mermaid
mindmap
  root((Beautiful Mermaid))
    特性
      15+ 主题
      美化样式
      简单配置
    使用
      Mermaid 代码块
      自动渲染
      一键切换
\`\`\`

### 2. 查看渲染结果

- 如果插件正常工作，你应该看到一个美观的思维导图
- 背景应该是深色（Tokyo Night 主题）
- 文字和连接线应该清晰可见

### 3. 切换主题

1. 更改设置中的主题
2. 重载笔记
3. 观察颜色变化

## 🔧 故障排除

### 问题 1: 插件未显示在列表中

**解决方案:**
1. 确认文件已正确复制到插件目录
2. 检查 `manifest.json` 格式是否正确
3. 重启 Obsidian

### 问题 2: Mermaid 图表未渲染

**解决方案:**
1. 确保已启用 Obsidian 的核心 `Mermaid` 插件
2. 检查 Mermaid 代码块语法是否正确
3. 打开开发者控制台查看错误信息（`Cmd/Ctrl + Shift + I`）

### 问题 3: 主题未应用

**解决方案:**
1. 重载笔记（`Cmd/Ctrl + R`）
2. 检查浏览器缓存
3. 尝试切换到其他主题再切换回来

### 问题 4: 构建错误

**解决方案:**
```bash
# 清理并重新安装
cd beautiful-mermaid-obsidian
rm -rf node_modules
bun install
bun run build
```

## 🚀 开发模式

如果你想要修改插件代码：

### 1. 监听文件变化

```bash
bun run dev
```

这将自动重新构建代码，你只需重载 Obsidian 即可看到更改。

### 2. 开发者工具

在 Obsidian 中打开开发者工具：
- `Cmd + Option + I` (macOS)
- `Ctrl + Shift + I` (Windows/Linux)

查看控制台中的日志和错误信息。

### 3. 调试渲染器

在 `src/renderer.ts` 中添加 `console.log`：

```typescript
console.log('Rendering Mermaid with theme:', themeName);
```

## 📁 项目结构

```
beautiful-mermaid-obsidian/
├── src/
│   ├── main.ts          # 插件主入口
│   └── renderer.ts     # Mermaid 渲染逻辑
├── package.json         # NPM 配置
├── tsconfig.json       # TypeScript 配置
├── esbuild.config.mjs # 构建配置
├── manifest.json       # Obsidian 插件清单
├── main.js           # 构建输出（已生成）
├── install.sh        # macOS/Linux 安装脚本
├── install.ps1      # Windows 安装脚本
└── README.md        # 项目文档
```

## 🔄 更新插件

### 重新构建

```bash
cd beautiful-mermaid-obsidian
npm run build
```

### 重新安装

运行安装脚本将覆盖旧文件：

```bash
./install.sh    # macOS/Linux
./install.ps1   # Windows
```

或者手动复制更新的文件到 Obsidian 插件目录。

## 📊 支持的 Mermaid 图表类型

- ✅ Flowcharts (流程图)
- ✅ Sequence Diagrams (序列图)
- ✅ Class Diagrams (类图)
- ✅ State Diagrams (状态图)
- ✅ Entity Relationship Diagrams (ER图)
- ✅ Gantt Charts (甘特图)
- ✅ Pie Charts (饼图)
- ✅ User Journey (用户旅程)
- ✅ Git Graph (Git 图)


## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📜 许可证

MIT License

## 🙏 致谢

- [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) - 美观的 Mermaid 渲染
- [Obsidian](https://obsidian.md/) - 优秀的笔记应用

---

**享受美观的 Mermaid 图表吧！🎨**
