# dsh-sidebar-panel-fold

[English](README.md) | [中文](README.zh.md)

A DeepSeek Harness Web UI plugin that keeps **only the global panels you choose** in the left sidebar and folds every other panel into its **More** menu — so the workspace and session list get the vertical space back.

Every plugin that adds a `sidebar.panellist` entry (Automation tasks, Task Board, Skill Center, SSH, Context Insights, Agents, and so on) would otherwise get its own launcher row. This plugin turns that fixed list into a preference:

- **设置 → 侧边栏面板** (Settings → Sidebar panels) shows one switch per registered panel.
- Switch on → the panel keeps its launcher row in the sidebar.
- Switch off → the launcher row is hidden, and the panel appears in the sidebar's **More** menu instead; clicking it opens the panel as usual.
- **Plugins** always keeps its launcher — it is the shell's own entry.

Defaults when no preference is stored yet: **Context Insights** and **Agents** stay, everything else folds.

## Requirements

- DeepSeek Harness **0.2.2-rc.1** or newer (the sidebar More menu and the settings section seats this plugin builds on).
- The Web GUI (`dsh web` / desktop app). The bundle has no Host capability of its own and no third-party dependencies.

## Install

The bundle is installed from this checkout with the plugin manager; it is enabled on install and affects every session in the profile.

```text
plugin_manager install_bundle  target = /absolute/path/to/dsh-sidebar-panel-fold
```

Or, in the app: **Plugins → Add plugin**, pick this directory, then enable it. Uninstall from the same page, or `plugin_manager remove_bundle @lisongjianustc/dsh-sidebar-panel-fold`. Removing the plugin removes every fold rule and the settings page; nothing else is touched.

## Usage

1. Open **Settings** (sidebar foot → account menu → Settings) → **Sidebar panels**.
2. Flip the switches. Each row reads either **Shown in the sidebar** or **Folded into More**.
3. **Restore defaults** puts the shipped default back.

The sidebar updates immediately, the More menu lists whatever is folded, and the choice survives app restarts, Web GUI port changes and browser-profile changes.

## Where the preference lives

`$DSH_HOME/plugin-state/sidebar-panel-fold/visible-panels.json` (default `~/.dsh/plugin-state/sidebar-panel-fold/visible-panels.json`):

```json
{ "visible": ["dsh-context", "agents"] }
```

`visible` lists the panel ids whose launcher stays in the sidebar; every other registered panel is folded. A panel that is not installed costs nothing — unknown ids are simply ignored. Delete the file to fall back to the defaults.

## How it works

The plugin uses only public extension points of `@deepseek-ai/dsh-client-ui-sidebar`:

1. **`sidebar.panellist`** — every global panel registers its icon and label here. The plugin reads the registrations (id, order, label) and injects one stylesheet rule that hides the launcher row of each folded panel, matched by the row's accessible name (the same label the shell projects). Rules are recomputed when panels register, when a panel label changes, and on a language switch; folding nothing writes no rules.
2. **`sidebar.panellist.actions`** — the rows of the sidebar's More menu. The plugin registers one row set that lists the folded panels; `onOpen(id)` opens the panel, `onDismiss()` closes the menu.
3. **`settings.section` + `settings.section.icon`** — the Settings page and its navigation glyph.

The Host half reads and writes the preference file and serves it to the page over one same-origin prefix route (`/sidebar-panel-fold/api/state`, GET/POST JSON). It imports only Node builtins, registers no tools, and holds no session state.

Deliberately avoided: replacing another plugin's panel registration, rewriting CSS-module hashes, reading another plugin's DOM for layout, and importing Harness UI primitives (the two surfaces a plugin may reach without a compiled build are the slot registry and the host route).

## Limits

- Folding is a launcher-row preference: the panel itself, its main-panel registration, its keyboard shortcuts and the current selection are untouched. A folded panel can always be opened from **More**.
- If a future Harness version changes the sidebar's `nav`/`aria-label` structure, the fold rules simply stop matching — the rows come back and nothing else breaks. Re-check this plugin after a Harness update.
- The preference is per user, not per profile or per workspace.

## Development

Plain JavaScript, no build step:

- `index.js` — Host half: preference file plus the state route.
- `client.js` — browser half: fold rules, More-menu rows, settings page.
- `locale/*.json` — panel display metadata (title/description) per locale.
- `cordis.patch.yml` — the bundle row (`sidebar-panel-fold`).

After editing the Host half, restart the bundle (disable → enable in the plugin manager) so the new module is imported; after editing the browser half, reload the page.

## License

MIT — see [LICENSE](LICENSE).
