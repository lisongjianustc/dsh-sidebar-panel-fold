window.__ModuleLoader__.load({
  id: '@lisongjianustc/dsh-sidebar-panel-fold',
  factory(require) {
    'use strict';
    const React = require('react');
    const h = React.createElement;
    const useSyncExternalStore = React.useSyncExternalStore;

    /** Locale namespace owned by this plugin. */
    const NS = 'sidebarPanelFold';
    /** Package name, used as the style tag's owner marker. */
    const PACKAGE = '@lisongjianustc/dsh-sidebar-panel-fold';
    /** Slot key shared by the More-menu row, the settings page and its icon. */
    const ENTRY_ID = 'sidebar-panel-fold';
    /** Document-relative URL of the Host state route. */
    const STATE_URL = `${ENTRY_ID}/api/state`;
    /** The shell always renders this panel, so it is never configurable here. */
    const CORE_PANEL = 'plugins';
    /** Panels shown in the sidebar before the user changes anything. */
    const DEFAULT_VISIBLE = ['dsh-context', 'agents'];

    // ---------------------------------------------------------------- copy

    const zh = {
      'section.label': '侧边栏面板',
      'page.intro': '选择留在侧边栏全局面板区的项目；关掉的项目收进「更多」，仍可随时打开。',
      'row.on': '显示在侧边栏',
      'row.off': '收进「更多」',
      'switch.aria': '{name}：{state}',
      'core.note': '「插件」始终保留在侧边栏。',
      'reset': '恢复默认',
      'empty': '当前没有可配置的面板。',
      'loading': '正在读取设置…',
      'error': '读取或保存失败，正在使用默认值。',
    };
    const en = {
      'section.label': 'Sidebar panels',
      'page.intro': 'Choose which global panels keep a launcher in the sidebar. Turned-off panels move into More and stay reachable.',
      'row.on': 'Shown in the sidebar',
      'row.off': 'Folded into More',
      'switch.aria': '{name}: {state}',
      'core.note': 'Plugins always stays in the sidebar.',
      'reset': 'Restore defaults',
      'empty': 'There are no configurable panels right now.',
      'loading': 'Loading your preference…',
      'error': 'The preference could not be read or saved; defaults are in use.',
    };
    const ja = {
      'section.label': 'サイドバーパネル',
      'page.intro': 'サイドバーの全局面板に残す項目を選びます。オフにした項目は「その他」に畳まれ、いつでも開けます。',
      'row.on': 'サイドバーに表示',
      'row.off': '「その他」に折りたたむ',
      'switch.aria': '{name}：{state}',
      'core.note': '「プラグイン」は常にサイドバーに表示されます。',
      'reset': '既定に戻す',
      'empty': '設定できるパネルがありません。',
      'loading': '設定を読み込み中…',
      'error': '設定を読み書きできませんでした。既定値を使用します。',
    };
    const de = {
      'section.label': 'Seitenleisten-Panels',
      'page.intro': 'Wählen Sie, welche globalen Panels einen Eintrag in der Seitenleiste behalten. Ausgeschaltete Panels wandern in „Mehr“ und bleiben erreichbar.',
      'row.on': 'In der Seitenleiste sichtbar',
      'row.off': 'In „Mehr“ gefaltet',
      'switch.aria': '{name}: {state}',
      'core.note': '„Plugins“ bleibt immer in der Seitenleiste.',
      'reset': 'Standard wiederherstellen',
      'empty': 'Es gibt derzeit keine konfigurierbaren Panels.',
      'loading': 'Einstellung wird geladen …',
      'error': 'Die Einstellung konnte nicht gelesen oder gespeichert werden; die Standardwerte gelten.',
    };
    const fr = {
      'section.label': 'Panneaux de la barre latérale',
      'page.intro': 'Choisissez les panneaux globaux qui gardent une entrée dans la barre latérale. Les panneaux désactivés passent dans « Plus » et restent accessibles.',
      'row.on': 'Affiché dans la barre latérale',
      'row.off': 'Replié dans « Plus »',
      'switch.aria': '{name} : {state}',
      'core.note': '« Plugins » reste toujours dans la barre latérale.',
      'reset': 'Rétablir les valeurs par défaut',
      'empty': "Aucun panneau n'est configurable pour le moment.",
      'loading': 'Lecture du réglage…',
      'error': "Le réglage n'a pas pu être lu ni enregistré ; les valeurs par défaut s'appliquent.",
    };
    const es = {
      'section.label': 'Paneles de la barra lateral',
      'page.intro': 'Elige qué paneles globales mantienen una entrada en la barra lateral. Los paneles desactivados pasan a «Más» y siguen accesibles.',
      'row.on': 'Visible en la barra lateral',
      'row.off': 'Plegado en «Más»',
      'switch.aria': '{name}: {state}',
      'core.note': '«Plugins» permanece siempre en la barra lateral.',
      'reset': 'Restaurar valores predeterminados',
      'empty': 'Ahora mismo no hay paneles configurables.',
      'loading': 'Leyendo la preferencia…',
      'error': 'No se pudo leer ni guardar la preferencia; se usan los valores predeterminados.',
    };
    const ru = {
      'section.label': 'Панели боковой панели',
      'page.intro': 'Выберите, какие глобальные панели остаются в боковой панели. Отключённые переходят в «Ещё» и остаются доступными.',
      'row.on': 'Показывать в боковой панели',
      'row.off': 'Свернуть в «Ещё»',
      'switch.aria': '{name}: {state}',
      'core.note': '«Плагины» всегда остаются в боковой панели.',
      'reset': 'Вернуть значения по умолчанию',
      'empty': 'Настраиваемых панелей сейчас нет.',
      'loading': 'Чтение настройки…',
      'error': 'Не удалось прочитать или сохранить настройку; используются значения по умолчанию.',
    };
    const pt = {
      'section.label': 'Painéis da barra lateral',
      'page.intro': 'Escolha quais painéis globais mantêm uma entrada na barra lateral. Os painéis desativados vão para «Mais» e continuam acessíveis.',
      'row.on': 'Visível na barra lateral',
      'row.off': 'Recolhido em «Mais»',
      'switch.aria': '{name}: {state}',
      'core.note': '«Plugins» permanece sempre na barra lateral.',
      'reset': 'Restaurar padrões',
      'empty': 'Não há painéis configuráveis agora.',
      'loading': 'A ler a preferência…',
      'error': 'Não foi possível ler nem guardar a preferência; os padrões estão em uso.',
    };

    // ---------------------------------------------------------------- styles

    const CSS = [
      '.spf-page{display:flex;flex-direction:column;gap:0;padding:2px 0 18px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}',
      '.spf-title{margin:0 0 4px;font-size:15px;font-weight:600;line-height:22px}',
      '.spf-intro{margin:0 0 14px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.spf-list{display:flex;flex-direction:column;border-top:1px solid var(--dsw-alias-border-l1)}',
      '.spf-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}',
      '.spf-row-text{display:flex;flex-direction:column;gap:2px;min-width:0}',
      '.spf-row-name{overflow-wrap:anywhere}',
      '.spf-row-hint{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:17px}',
      '.spf-switch{box-sizing:border-box;position:relative;flex:0 0 auto;width:36px;height:20px;padding:2px;border:0;border-radius:999px;background:var(--dsw-alias-border-l3);cursor:pointer}',
      '.spf-switch[aria-checked=true]{background:var(--dsw-alias-brand-primary)}',
      '.spf-switch:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}',
      '.spf-thumb{display:block;width:16px;height:16px;border-radius:50%;background:var(--dsw-alias-label-primary-foreground);transition:transform .12s ease}',
      '.spf-switch[aria-checked=false] .spf-thumb{background:var(--dsw-alias-switch-thumb)}',
      '.spf-switch[aria-checked=true] .spf-thumb{transform:translate(16px)}',
      '.spf-foot{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-top:14px}',
      '.spf-note{margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.spf-note-error{color:var(--dsw-alias-state-error-primary)}',
      '.spf-reset{appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;padding:5px 12px;cursor:pointer}',
      '@media(hover:hover){.spf-reset:hover{background:var(--dsw-alias-interactive-bg-hover)}}',
      '.spf-reset:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}',
      '.spf-separator{height:1px;margin:4px 6px;background:var(--dsw-alias-border-l1)}',
      // Menu rows copy the Host menu item geometry so More stays one visual list.
      '.spf-item{display:flex;align-items:center;gap:6px;width:100%;min-height:34px;padding:6px 8px;border:none;border-radius:var(--dsw-radius-md);background:transparent;cursor:pointer;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary);text-align:left}',
      '@media(hover:hover){.spf-item:hover{background:var(--dsw-alias-interactive-bg-hover)}}',
      '.spf-item:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}',
      '.spf-item-label{min-width:0;overflow-wrap:anywhere}',
    ].join('\n');

    // ---------------------------------------------------------------- helpers

    /** Small snapshot store: one stable reference until `set` replaces it. */
    function createStore(initial) {
      let value = initial;
      const listeners = new Set();
      return {
        getSnapshot: () => value,
        subscribe: (listener) => {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        set: (next) => {
          if (Object.is(next, value)) return;
          value = next;
          for (const listener of [...listeners]) listener();
        },
      };
    }

    /** Read a slot label the way the sidebar shell does: call a thunk, else use the string. */
    function resolveLabel(options) {
      const label = options.label;
      if (typeof label === 'function') {
        try {
          const value = label();
          if (typeof value === 'string' && value.length > 0) return value;
        } catch (error) {
          /* a failing thunk falls back to the panel id, as the shell does */
        }
      } else if (typeof label === 'string' && label.length > 0) {
        return label;
      }
      return options.id;
    }

    /** Project the registered global panels in shell order, without the core entry. */
    function readPanels(slots) {
      const entries = slots.entriesOfSlot('sidebar.panellist') ?? [];
      const panels = [];
      for (const entry of entries) {
        const options = entry?.options ?? {};
        if (typeof options.id !== 'string' || options.id === CORE_PANEL) continue;
        panels.push({ id: options.id, order: options.order ?? 0, label: resolveLabel(options) });
      }
      panels.sort((left, right) => left.order - right.order);
      return panels;
    }

    /** Quote one value for a CSS attribute selector. */
    function cssString(value) {
      return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\a ')}"`;
    }

    /** Keep only distinct non-blank panel ids. */
    function normalizeVisible(value) {
      if (!Array.isArray(value)) return DEFAULT_VISIBLE.slice();
      const out = [];
      for (const item of value) {
        if (typeof item !== 'string' || item === '' || out.includes(item)) continue;
        out.push(item);
      }
      return out;
    }

    /** Hide the launcher rows of folded panels; the shell keeps their main panels. */
    function syncFoldRules(style, panels, visible) {
      const shown = new Set(visible);
      const rules = [];
      for (const panel of panels) {
        if (shown.has(panel.id)) continue;
        rules.push(`nav[aria-label] button[aria-label=${cssString(panel.label)}]{display:none!important}`);
      }
      style.textContent = rules.join('\n');
    }

    // ---------------------------------------------------------------- components

    /**
     * Rows for the folded panels inside the panel list's More menu.
     * @param props - injected stores, plus the owner share (onOpen, onDismiss).
     * @returns the folded rows, or null when nothing is folded.
     */
    function FoldedPanelRows({ panels, state, onOpen, onDismiss }) {
      const list = useSyncExternalStore(panels.subscribe, panels.getSnapshot);
      const current = useSyncExternalStore(state.subscribe, state.getSnapshot);
      const shown = new Set(current.visible);
      const folded = list.filter((panel) => !shown.has(panel.id));
      if (folded.length === 0) return null;
      const children = [h('div', { key: 'separator', className: 'spf-separator', role: 'presentation' })];
      for (const panel of folded) {
        children.push(
          h(
            'button',
            {
              key: panel.id,
              type: 'button',
              role: 'menuitem',
              className: 'spf-item',
              onClick: () => {
                onDismiss();
                onOpen(panel.id);
              },
            },
            h('span', { className: 'spf-item-label' }, panel.label),
          ),
        );
      }
      return h(React.Fragment, null, children);
    }

    /** One switch row: the panel name, its current state, and the toggle. */
    function PanelRow({ panel, shown, translate, onToggle }) {
      const stateLabel = shown ? translate('row.on') : translate('row.off');
      return h(
        'div',
        { className: 'spf-row' },
        h(
          'div',
          { className: 'spf-row-text' },
          h('span', { className: 'spf-row-name' }, panel.label),
          h('span', { className: 'spf-row-hint' }, stateLabel),
        ),
        h(
          'button',
          {
            type: 'button',
            role: 'switch',
            className: 'spf-switch',
            'aria-checked': shown,
            'aria-label': translate('switch.aria', { name: panel.label, state: stateLabel }),
            onClick: () => {
              onToggle(panel.id, !shown);
            },
          },
          h('span', { className: 'spf-thumb' }),
        ),
      );
    }

    /**
     * The settings page: one switch per global panel.
     * @param props - injected stores and writers, plus the locale-bound translate function.
     * @returns the section body.
     */
    function SettingsPage({ panels, state, setVisible, restoreDefaults, translate, locale }) {
      // Subscribe to the locale so the copy follows a live language switch.
      useSyncExternalStore(locale.subscribe, locale.getSnapshot);
      const list = useSyncExternalStore(panels.subscribe, panels.getSnapshot);
      const current = useSyncExternalStore(state.subscribe, state.getSnapshot);
      const shown = new Set(current.visible);
      return h(
        'div',
        { className: 'spf-page' },
        h('h2', { className: 'spf-title' }, translate('section.label')),
        h('p', { className: 'spf-intro' }, translate('page.intro')),
        current.status === 'loading' ? h('p', { className: 'spf-note' }, translate('loading')) : null,
        current.status === 'error' ? h('p', { className: 'spf-note spf-note-error' }, translate('error')) : null,
        list.length === 0
          ? h('p', { className: 'spf-note' }, translate('empty'))
          : h(
              'div',
              { className: 'spf-list' },
              list.map((panel) =>
                h(PanelRow, {
                  key: panel.id,
                  panel,
                  shown: shown.has(panel.id),
                  translate,
                  onToggle: setVisible,
                }),
              ),
            ),
        h(
          'div',
          { className: 'spf-foot' },
          h('button', { type: 'button', className: 'spf-reset', onClick: restoreDefaults }, translate('reset')),
          h('span', { className: 'spf-note' }, translate('core.note')),
        ),
      );
    }

    /** Settings navigation glyph: a sidebar next to two list rows. */
    function SectionIcon({ size }) {
      const edge = typeof size === 'number' ? size : 16;
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: edge, height: edge, fill: 'none', 'aria-hidden': 'true' },
        h('rect', { x: 1.6, y: 2.4, width: 4.6, height: 11.2, rx: 1.2, stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', { d: 'M9.2 4.6h5.2M9.2 8h5.2M9.2 11.4h3.2', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }),
      );
    }

    // ---------------------------------------------------------------- plugin

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.dataset.plugin = PACKAGE;
          tag.dataset.pluginCss = `${PACKAGE}/sidebar-panel-fold.css`;
          tag.textContent = CSS;
          document.head.appendChild(tag);
          return () => {
            tag.remove();
          };
        }, 'sidebar-panel-fold: styles');
        ctx.effect(
          () => ctx.locale.register(NS, { zh, en, ja, de, fr, es, ru, pt }),
          'sidebar-panel-fold: dictionaries',
        );
        const t = ctx.locale.bind(NS);
        /** Bumped on every language change so the settings page re-renders its copy. */
        const localeVersion = createStore(0);
        ctx.effect(
          () => ctx.locale.subscribe(() => localeVersion.set(localeVersion.getSnapshot() + 1)),
          'sidebar-panel-fold: locale version',
        );
        /** Resolve copy against the current language at call time. */
        const translate = (key, params) => ctx.locale.bind(NS)(key, params);

        const panels = createStore([]);
        const state = createStore({ status: 'loading', visible: DEFAULT_VISIBLE.slice() });

        /** Hiding the launcher rows the shell still renders is the only effect of the list. */
        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.setAttribute('data-dsh-sidebar-panel-fold', '');
          document.head.appendChild(tag);
          const sync = () => {
            syncFoldRules(tag, panels.getSnapshot(), state.getSnapshot().visible);
          };
          const stopPanels = panels.subscribe(sync);
          const stopState = state.subscribe(sync);
          sync();
          return () => {
            stopPanels();
            stopState();
            tag.remove();
          };
        }, 'sidebar-panel-fold: fold rules');

        const refreshPanels = () => {
          panels.set(readPanels(ctx.slots));
        };
        ctx.effect(() => ctx.slots.subscribe('sidebar.panellist', refreshPanels), 'sidebar-panel-fold: panel entries');
        ctx.effect(() => ctx.locale.subscribe(refreshPanels), 'sidebar-panel-fold: panel labels');
        refreshPanels();

        /** Read the durable list from the Host; a deployment without the route keeps the defaults. */
        const load = async () => {
          try {
            const response = await fetch(STATE_URL, {
              headers: { accept: 'application/json' },
              credentials: 'same-origin',
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const body = await response.json();
            state.set({ status: 'ready', visible: normalizeVisible(body?.visible) });
          } catch (error) {
            state.set({ status: 'error', visible: DEFAULT_VISIBLE.slice() });
          }
        };

        /** Keep one visible list; the optimistic value is reverted when the Host refuses it. */
        const save = async (next) => {
          const previous = state.getSnapshot().visible;
          const optimistic = normalizeVisible(next);
          state.set({ status: 'ready', visible: optimistic });
          try {
            const response = await fetch(STATE_URL, {
              method: 'POST',
              headers: { accept: 'application/json', 'content-type': 'application/json' },
              credentials: 'same-origin',
              body: JSON.stringify({ visible: optimistic }),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const body = await response.json();
            state.set({ status: 'ready', visible: normalizeVisible(body?.visible) });
          } catch (error) {
            state.set({ status: 'error', visible: previous });
          }
        };

        void load();

        const setVisible = (id, shown) => {
          const current = state.getSnapshot().visible;
          const without = current.filter((entry) => entry !== id);
          void save(shown ? without.concat(id) : without);
        };
        const restoreDefaults = () => {
          void save(DEFAULT_VISIBLE.slice());
        };

        ctx.effect(
          () =>
            ctx.slots.inject('sidebar.panellist.actions', () =>
              ctx.slots.register(
                {
                  name: 'sidebar.panellist.actions',
                  id: ENTRY_ID,
                  order: 10,
                  locale: NS,
                  inject: () => ({ panels, state }),
                },
                FoldedPanelRows,
              ),
            ),
          'sidebar-panel-fold: more menu rows',
        );

        // The settings navigation keeps the label it was registered with, so the
        // row is re-registered on a language change rather than relying on a re-render.
        ctx.effect(() => {
          let dispose;
          const register = () => {
            if (dispose !== undefined) dispose();
            dispose = ctx.slots.inject('settings.section', () =>
              ctx.slots.register(
                {
                  name: 'settings.section',
                  id: ENTRY_ID,
                  order: 35,
                  locale: NS,
                  label: () => t('section.label'),
                  inject: () => ({ panels, state, setVisible, restoreDefaults, translate, locale: localeVersion }),
                },
                SettingsPage,
              ),
            );
          };
          register();
          const stopLocale = ctx.locale.subscribe(register);
          return () => {
            stopLocale();
            if (dispose !== undefined) dispose();
          };
        }, 'sidebar-panel-fold: settings section');
        ctx.effect(
          () =>
            ctx.slots.inject('settings.section.icon', () =>
              ctx.slots.register({ name: 'settings.section.icon', id: ENTRY_ID }, SectionIcon),
            ),
          'sidebar-panel-fold: settings icon',
        );
      },
    };
  },
});
