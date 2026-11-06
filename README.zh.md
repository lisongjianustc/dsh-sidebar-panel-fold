# dsh-sidebar-panel-fold

[English](README.md) | [中文](README.zh.md)

DeepSeek Harness Web UI 插件：左侧栏只保留**你选择的全局面板**，其余全部收进侧边栏的「更多」菜单，把纵向空间还给工作区和会话列表。

每个往 `sidebar.panellist` 注册面板的插件（自动化任务、任务看板、技能中心、SSH、上下文洞察、智能体……）默认都会独占一行。这个插件把这份固定清单变成可配置的偏好：

- **设置 → 侧边栏面板** 列出当前所有面板，每个面板一个开关。
- 打开 → 该面板保留侧边栏入口行。
- 关闭 → 隐藏该入口行，面板入口改为出现在侧边栏「更多」菜单里，点它照常打开面板。
- **插件** 始终保留入口（它是外壳自身的入口）。

从未保存过偏好时默认：**上下文洞察**、**智能体** 显示在侧边栏，其余全部折叠。

## 环境要求

- DeepSeek Harness **0.2.2-rc.1** 及以上（依赖侧边栏的「更多」菜单与设置页席位）。
- Web GUI（`dsh web` 或桌面端）。本插件自身没有 Host 能力，也没有任何第三方依赖。

## 安装

用插件管理器从本目录安装；安装后自动启用，并对该 profile 的所有会话生效。

```text
plugin_manager install_bundle  target = /absolute/path/to/dsh-sidebar-panel-fold
```

或在应用内：**插件 → 添加插件**，选择本目录后启用。卸载在同一页面操作，或执行 `plugin_manager remove_bundle @lisongjianustc/dsh-sidebar-panel-fold`。卸载后所有折叠规则与设置页一并移除，不改动其他任何东西。

## 使用

1. 打开 **设置**（侧边栏底部 → 账号菜单 → 设置）→ **侧边栏面板**。
2. 拨动开关。每行显示 **显示在侧边栏** 或 **收进「更多」**。
3. **恢复默认** 回到出厂默认。

侧边栏即时生效，「更多」菜单列出所有被折叠的面板；选择在应用重启、Web GUI 端口变化和浏览器 profile 变化后都保留。

## 偏好存放位置

`$DSH_HOME/plugin-state/sidebar-panel-fold/visible-panels.json`（默认 `~/.dsh/plugin-state/sidebar-panel-fold/visible-panels.json`）：

```json
{ "visible": ["dsh-context", "agents"] }
```

`visible` 列出保留侧边栏入口行的面板 id，其余已注册面板一律折叠。未安装的面板 id 会被忽略，不影响使用；删除该文件即回到默认。

## 工作原理

只使用 `@deepseek-ai/dsh-client-ui-sidebar` 的公开扩展点：

1. **`sidebar.panellist`** — 各全局面板的图标与标签注册处。插件读取注册项（id、order、label），注入一条样式规则，按导航行的无障碍名称（外壳用同一个 label 投影而来）隐藏被折叠面板的入口行。面板注册变化、标签变化或切换语言时重新计算；没有需要折叠的面板时不写任何规则。
2. **`sidebar.panellist.actions`** — 侧边栏「更多」菜单的行来源。插件注册一组行，列出被折叠的面板；`onOpen(id)` 打开面板，`onDismiss()` 关闭菜单。
3. **`settings.section` + `settings.section.icon`** — 设置页与它的导航图标。

Host 半侧负责读写偏好文件，并通过一个同源前缀路由（`/sidebar-panel-fold/api/state`，GET/POST JSON）提供给页面。它只导入 Node 内置模块，不注册工具，也不持有会话状态。

刻意不做的：替换其他插件的面板注册、改写 CSS Module 哈希类名、读取其他插件 DOM 估算布局、引入 Harness UI 基础组件包（无编译产物的插件可用面只有槽位注册与 Host 路由）。

## 边界

- 折叠只是「入口行」偏好：面板本身、主面板注册、快捷键与当前选中态都不受影响；被折叠的面板随时可从「更多」打开。
- 若未来 Harness 改动侧边栏的 `nav`/`aria-label` 结构，折叠规则会不再匹配——入口行重新出现，其他功能不受影响。升级 Harness 后建议复核本插件。
- 偏好是「按用户」保存，不区分 profile 或工作区。

## 开发

纯 JavaScript，无构建步骤：

- `index.js` — Host 半侧：偏好文件与状态路由。
- `client.js` — 浏览器半侧：折叠规则、「更多」菜单行、设置页。
- `locale/*.json` — 各语言的插件展示元数据（标题/描述）。
- `cordis.patch.yml` — 插件行（`sidebar-panel-fold`）。

改完 Host 半侧后需重启该插件（插件管理里关闭再启用）以导入新模块；改完浏览器半侧后刷新页面即可。

## 许可

MIT，见 [LICENSE](LICENSE)。
