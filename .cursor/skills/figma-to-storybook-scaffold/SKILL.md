---
name: figma-to-storybook-scaffold
description: >-
  Scaffolds a React + Storybook component library from an empty directory by
  exporting Figma variables via Figma Console MCP (DTCG JSON, CSS custom
  properties, CSS Modules). Gathers required project inputs first, verifies MCP
  and environment prerequisites, then executes a phased checklist. Use when
  starting a greenfield design system, mise-en-place setup, Figma-to-code token
  export, or Storybook scaffolding from a Figma file.
---

# Figma-to-Storybook Scaffold

Scaffold a **design-system-agnostic** React + Storybook codebase from an empty directory, with tokens exported from Figma via **Figma Console MCP**.

**Do not skip Step 0.** Collect required inputs before writing files or calling export tools.

---

## Environmental prerequisites

Verify these before Step 1. Report results to the user; stop and explain how to fix any failure.

| Prerequisite | How to verify | If missing |
|--------------|---------------|------------|
| **Node.js + npm** | Run `node --version` and `npm --version` | Install Node.js LTS; re-run verification |
| **Empty project directory** | No `package.json` in cwd (unless user explicitly chose non-greenfield) | Confirm with user or use a new directory |
| **Figma Desktop** | User must have Figma desktop app running | Open Figma Desktop |
| **Figma Console MCP** | MCP server `user-figma-console` enabled in Cursor | Enable in Cursor MCP settings |
| **Desktop Bridge plugin** | `figma_get_status` with `probe: true` returns success | Open target file in Figma; run `figma_reconnect` if needed |
| **Target Figma file open** | Status / `figma_list_open_files` shows expected file name | User opens the file in Figma |
| **Figma variables exist** | `figma_get_variables` returns collections with modes | Token export will be empty; stop and inform user |

**Known on this machine (re-verify at runtime):** Node and npm are available (`node` / `npm` on PATH). Versions change — always run the check; do not assume.

---

## Step 0 — Gather required inputs (mandatory)

Use **AskQuestion** (or ask conversationally if unavailable). **Do not proceed** until required fields are answered.

### Required

| Input | Question | Notes |
|-------|----------|-------|
| `figma_file_name` | What is the exact name of the Figma file to sync with? | Must match the open file; used to validate MCP connection |
| `component_scope` | What should be built after scaffolding? | Options below |

**`component_scope` options:**

1. **`scaffold-only`** — Tokens + project setup only; no React components yet *(recommended first run)*. Storybook will still show generic `Example/*` starter stories unless you remove them — **these are not from Figma.**
2. **`figma-selection`** — Build the component currently selected in Figma
3. **`named-component`** — Build a specific component by name (ask follow-up: component name)

### Optional overrides (ask once; apply defaults if user skips)

| Input | Default | Question |
|-------|---------|----------|
| `package_name` | Derived from directory name (kebab → `@scope/name` or `name`) | npm package name? |
| `token_dir` | `src/styles/tokens/` | Where should token files live? |
| `generated_token_dir` | `src/styles/generated/` | Where should generated token outputs (e.g. css-vars) live? |
| `components_dir` | `src/components/` | Where should components live? |
| `css_naming` | `bem` | CSS Modules naming: `bem`, `camelCase`, or `as-is`? |
| `icon_library` | `lucide-react` | Icon library (or `none`) |
| `package_manager` | `npm` | `npm`, `pnpm`, or `yarn` |
| `storybook_port` | auto (6006+) | Fixed Storybook port, or auto |
| `token_modes` | `all` | Export all Figma modes, or specific list (e.g. Light, Dark) |
| `token_prefix` | none | CSS variable prefix (e.g. `ds-`) |
| `run_storybook` | `yes` | Start Storybook when scaffold completes? |
| `refinement_pass` | `if-components-built` | Auto-run Figma parity pass after first component? |
| `build_scope` | `single-batch` | Build scope: `single-component`, `single-batch`, or `full-ds-phased` |

### Default stack (use unless user overrides)

| Layer | Default |
|-------|---------|
| Framework | React + TypeScript |
| Build | Vite |
| Docs / dev | Storybook (latest React, via package manager) |
| Styling | CSS Modules + CSS custom properties |
| Tokens | Figma → DTCG JSON → generated `tokens.css` |
| Token spec | W3C DTCG (`format: dtcg` + `format: css-vars`) |

**Do not invent token values.** All design tokens must come from `figma_export_tokens`.

---

## Execution checklist

Create todos for **every step** below. Mark complete only when verification criteria pass.

```
- [ ] 0. Inputs gathered
- [ ] 1. Environment verified
- [ ] 2. Figma MCP verified
- [ ] 3. React + Vite + Storybook scaffolded
- [ ] 4. Tokens exported from Figma (file re-verified)
- [ ] 5. Token selectors audited + wired into Storybook
- [ ] 5b. Token smoke-test story passes visual check
- [ ] 6. Components built (if scope ≠ scaffold-only)
- [ ] 7. Storybook stories added (if components built)
- [ ] 7b. Starter Example/* stories removed (if components built)
- [ ] 8. README written
- [ ] 9. Storybook running (if requested)
- [ ] 10. Refinement pass (if applicable)
- [ ] 11. Post-run hardening checks
- [ ] 12. Storybook maturity (theme toolbar, MDX, a11y, play tests, deploy config)
```

---

## Step 1 — Verify environment

1. Run `node --version` and `npm --version` (or chosen package manager).
2. Confirm cwd is the intended project root.
3. If greenfield: confirm no conflicting `package.json` unless user approved non-greenfield.

**Pass:** Node/npm available; directory state matches user intent.

---

## Step 2 — Verify Figma MCP connection

1. Call `figma_get_status` with `{ "probe": true }`.
2. Confirm the active file name matches `figma_file_name` from Step 0.
3. Call `figma_get_variables` — confirm collections and modes exist.
4. If wrong file: ask user to open the correct file, or use `figma_navigate` if URL was provided.

**Pass:** Probe succeeds; file name matches; variables are non-empty.

**Re-check before Step 4:** Long installs can switch the active Figma file. Call `figma_get_status` again immediately before `figma_export_tokens`. Use `figma_navigate` if the file name no longer matches.

---

## Step 3 — Scaffold React + Vite + Storybook

1. Initialize Vite React TypeScript project in cwd (non-interactive flags).
2. Install Storybook for React (latest stable via chosen package manager).
3. Install `icon_library` if not `none`.
4. Create folder structure:
   - `{token_dir}` (e.g. `src/styles/tokens/`)
   - `{components_dir}` (e.g. `src/components/`)
5. Import token CSS in Storybook preview and app entry so modes apply globally.

**Pass:** `package.json` exists; Storybook scripts run; directories created.

---

## Step 4 — Export tokens from Figma

1. **Re-verify** active Figma file matches `figma_file_name` (`figma_get_status` or `figma_navigate`).
2. Call `figma_get_variables` to inspect collections, modes, and tier structure.
3. Export DTCG canonical source:
   - `figma_export_tokens` with `format: "dtcg"`, `outputPath: "{token_dir}"` (directory, not a file path), `modes` per user input.
4. Export CSS custom properties:
   - `figma_export_tokens` with `format: "css-vars"`, `outputPath: "{generated_token_dir}"` (directory), same `modes`.
5. If tool returns `suggestedScaffold` (no `tokens.config.json`): write scaffold config, then re-export.
6. Write `tokens.config.json` at project root for future `figma_import_tokens` round-trips.

**Pass:** `tokens.json` and `tokens.css` exist; values reflect Figma variables; exported modes present.

**`outputPath` rule:** Pass a **directory** path (e.g. `src/styles/tokens/`). Do not pass a `.json` or `.css` file path — the tool nests files incorrectly.

---

## Step 5 — Wire tokens into styling

### 5a. Audit token selectors (mandatory)

After export, **read `tokens.css`** and list every top-level selector that defines variables:

| Common pattern | Meaning |
|----------------|---------|
| `:root` | Default / light color tokens |
| `.dark` | Dark color mode |
| `[data-theme="…"]` | Named Figma mode (e.g. spacing collection) |

**Critical:** Color and spacing tokens may live under **different selectors**. Components using `var(--space-*)` will look broken (sharp corners, no padding) if spacing selectors are not applied in Storybook.

Record which selectors each component needs in the README.

### 5b. Apply all selectors in Storybook preview

1. Import `tokens.css` in `.storybook/preview.ts` (or `.tsx`).
2. Apply non-`:root` token selectors on `document.body` (via a small `useEffect` shell component) so spacing and other mode-scoped variables resolve for every story.
3. Import token CSS in app entry (`main.tsx`) with the same attributes on `#root` or `body`.
4. Use CSS Modules with `css_naming` convention for component styles.
5. **Canvas background belongs on `.sb-show-main`, not the story decorator.** Stories with `layout: 'centered'` render inside `#storybook-root`, which Storybook shrink-wraps to content width. Putting `background` + `minHeight: '100vh'` on a decorator div creates a tall narrow gray strip beside the white canvas. `width: '100%'` does **not** fix this — the parent is already shrink-wrapped.

Create `.storybook/preview.css`:

```css
.sb-show-main {
  background-color: var(--ui-background-color);
}

.docs-story {
  background-color: var(--ui-background-color);
}
```

**Example preview shell** (adjust attribute values to match your exported `tokens.css`):

```tsx
// preview.tsx
import { useEffect, type ReactNode } from 'react'
import './preview.css'

function TokenStoryShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'mode-1')
    return () => document.body.removeAttribute('data-theme')
  }, [])

  return (
    <div style={{ fontFamily: 'Figtree, system-ui, sans-serif', color: 'var(--primary-text-color)' }}>
      {children}
    </div>
  )
}
```

Decorator: wrap `<Story />` in `<TokenStoryShell>` — **no** `background` or `minHeight` on the decorator itself.

### 5c. Token smoke-test story (mandatory)

Add **Design System / Token Smoke Test** (or extend an existing token story) that visibly proves tokens resolve:

- A box using `border-radius: var(--space-4)` — must show rounded corners
- A box using `padding: var(--space-16)` — must show visible padding
- Swatches for `--primary-color`, `--ui-border-color`

**Fail action:** A selector from the audit is missing on the Storybook wrapper — fix before building components.

**Pass:** Rounded corners and padding render correctly, dark-mode toggles color tokens, and all token selectors from `tokens.css` are active in Storybook.

---

## Step 6 — Build components (conditional)

**Skip entirely if `component_scope` is `scaffold-only`.**

### Resolve target component

| Scope | Action |
|-------|--------|
| `figma-selection` | `figma_get_selection` → get nodeId |
| `named-component` | `figma_search_components` → resolve nodeId by name |

### Choose build scope strategy (mandatory)

When user requests "entire design system", do **not** attempt one monolithic generation pass.

| `build_scope` | Strategy |
|---------------|----------|
| `single-component` | Build one component end-to-end with refinement |
| `single-batch` | Build 3-8 related components (recommended default) |
| `full-ds-phased` | Build in multiple batches with checkpoints after each batch |

For full design systems, filter to **public** component sets first; skip internal primitives by default (names starting with `.` or `_`) unless explicitly requested.

### Implement from Figma specs

1. Primary path: call `figma_get_component_for_development` with `nodeId` and `codebasePath: {components_dir}`.
2. Fallback path (if API/token errors like 403 Invalid token): use Desktop Bridge tools (`figma_analyze_component_set`, `figma_get_component`, `figma_execute`) to extract variant axes and visual specs.
3. Read variant properties, descriptions, annotations (`figma_get_annotations` if needed).
4. Map Figma properties to React props — use **actual** property names from Figma, not assumed names.
5. Bind colors/spacing/type to CSS variables from `tokens.css` — no hardcoded hex unless token export failed.
6. **Document which CSS variables** each component uses and which Storybook `data-theme` / class they require.
7. For icon slots: use `icon_library`; map Figma icon names to library icons where possible.
8. Create `{components_dir}/{ComponentName}/` with `.tsx`, `.module.css`, and `.stories.tsx`.
9. **Before finishing:** visually confirm padding and `border-radius` in Storybook — not just background color.

**Pass:** Component files exist; props match Figma variant set; styles reference CSS variables.

---

## Step 7 — Storybook stories (conditional)

**Skip if no components built.**

Derive stories from the Figma component set — not a fixed template:

1. One story per significant variant property value.
2. All sizes (if size property exists).
3. Matrix story: variants × sizes when applicable.
4. Mode story or global decorator: light + dark (or user `token_modes`).
5. Interactive states present in Figma (hover, disabled, etc.).

**Pass:** Stories render without errors; matrix covers Figma variant combinations.

### Remove starter stories (mandatory when components built)

Delete Storybook Vite starter files so users are not confused:

- `src/stories/Button.tsx`, `Button.stories.ts`, `button.css`
- `src/stories/Header.*`, `Page.*`, `Configure.mdx`

Real components live in `{components_dir}/`, not `src/stories/Example/*`.

---

## Step 8 — Write README

Include:

- Project purpose and stack (with any overrides from Step 0)
- Token architecture as exported (collection names, modes, tiers — describe what Figma has, not a fixed tier model)
- **Token selector map:** which `data-theme` / class each collection needs (e.g. `data-theme="mode-1"` for spacing)
- **Component parity level:** per component, note implemented axes vs deferred axes/states
- Directory layout (`token_dir`, `components_dir`)
- Commands: install, `storybook`, build
- Token sync: export (`figma_export_tokens`) and import (`figma_import_tokens`) workflow

**Pass:** README reflects this project’s actual choices and paths.

---

## Step 9 — Run Storybook (conditional)

If `run_storybook` is yes:

1. Run package manager storybook script (e.g. `npm run storybook`).
2. If port 6006 is busy, use next available port; report URL to user.
3. Confirm stories load and tokens apply.

**Pass:** Storybook serves; user can view components and modes.

---

## Step 10 — Refinement pass (conditional)

Run when `refinement_pass` is `if-components-built` and components were built, or when user reports visual mismatch.

1. Re-fetch `figma_get_component_for_development` for the built component.
2. Compare implementation vs Figma:
   - Variant properties and values
   - Descriptions and annotations
   - Padding, gap, typography, radius, color bindings
   - Icon slot behavior
3. List gaps explicitly, then fix component + CSS Modules.
4. Optional: `figma_check_design_parity` if available.
5. Re-run Storybook verification.

**Pass:** Implementation aligns with Figma specs and token bindings; gaps documented if any remain.

---

## Step 11 — Post-run hardening checks

Run these checks before declaring completion:

1. Token smoke-test story still passes after all component additions.
2. Centered component stories (e.g. Checkbox, Toggle) show a full-width canvas background — not a narrow gray strip beside white.
3. Storybook has no misleading `Example/*` starter stories.
4. `README` contains selector map and component parity levels.
5. If `build_scope` was `full-ds-phased`, summarize completed batches and remaining batches.
6. Call out any fallback usage (`figma_execute` path) and why.

**Pass:** No known setup gotchas remain for the next run.

---

## Step 12 — Storybook maturity (recommended after scaffold)

Elevate Storybook from a component gallery to a documentation experience.

### 12a. Global theme toolbar

In `.storybook/preview.tsx`:

- Add `globalTypes` for `colorMode` (light / dark / black) and `spacingMode` (e.g. `mode-1`)
- Apply selectors on `document.body` / `document.documentElement` in a `TokenStoryShell` component
- Keep canvas background on `.sb-show-main` via `.storybook/preview.css` — not on the story decorator
- Remove per-story `DarkMode` decorators once the toolbar works

### 12b. Branding and navigation

- Create `.storybook/manager.ts` with `brandTitle`, `brandImage`, and theme
- Set `parameters.options.storySort` order: Design System → Components

### 12c. MDX foundations

Add `src/docs/*.mdx` pages:

| Page | Title |
|------|-------|
| Introduction.mdx | Design System/Introduction |
| Tokens.mdx | Design System/Tokens |
| Color.mdx | Design System/Color |
| Spacing.mdx | Design System/Spacing |
| Typography.mdx | Design System/Typography (placeholder until Figma export) |
| Accessibility.mdx | Design System/Accessibility |
| Deprecation.mdx | Design System/Deprecation |

Pilot components: co-locate `Component.mdx` with usage guidelines and Figma parity tables. **Remove `autodocs` tag** when MDX docs page exists for the same component.

### 12d. Accessibility enforcement

- Set `parameters.a11y.test: 'error'` in preview
- Fix pilot components: Button, TextField, Checkbox, Modal, Link
- Document rules in Accessibility.mdx

### 12e. Interaction tests

- Add `play` functions to pilot interactive stories
- Tag with `play-fn` and configure `storybookTest({ tags: { include: ['play-fn'] } })` in `vite.config.ts`
- Add npm script: `"test-storybook": "vitest --project storybook"`

### 12f. Layout decorators

Create `.storybook/decorators/PageLayouts.tsx`:

- `FormPageDecorator` — TextField, TextArea, Search
- `DialogPageDecorator` — Modal, Dropdown, Combobox

### 12g. Deploy and CI (repo + external)

**In repo:**

- `app/vercel.json` for static Storybook (`build-storybook` → `storybook-static`)
- `.github/workflows/storybook.yml` for build + test-storybook
- README deploy instructions

**External (user):**

- Vercel project + domain
- Optional Chromatic project token

**Pass:** Theme toolbar works; MDX foundations render; 5 pilot MDX pages exist; `npm run test-storybook` passes; deploy config documented.

---

## MCP tools reference

| Tool | When |
|------|------|
| `figma_get_status` | Connection health (`probe: true`) |
| `figma_list_open_files` | Confirm correct file open |
| `figma_get_variables` | Inspect collections before export |
| `figma_export_tokens` | Figma → DTCG JSON / CSS vars / other formats |
| `figma_import_tokens` | Code JSON changes → Figma variables |
| `figma_get_selection` | Resolve selected component |
| `figma_search_components` | Find component by name |
| `figma_get_component_for_development` | Deep specs for implementation |
| `figma_analyze_component_set` | Variant axes and diffable component-set analysis |
| `figma_get_component` | Metadata fallback for local component details |
| `figma_execute` | Desktop Bridge fallback for custom extraction and inspection |
| `figma_get_annotations` | Designer notes and constraints |
| `figma_capture_screenshot` / `figma_take_screenshot` | Visual comparison |
| `figma_check_design_parity` | Automated code vs design check |

---

## Guardrails

1. **Never guess** `figma_file_name` or component names — use Step 0 answers.
2. **Never invent tokens** — export from Figma; stop if variables are empty.
3. **Never assume** variant names (primary/secondary/danger) — read from Figma.
4. **Never build components** when `component_scope` is `scaffold-only`.
5. **Prefer primitives first** — tokens before composite components unless user requests otherwise.
6. **Expect refinement** — first pass may be approximate; Step 10 is normal.
7. **Never assume all tokens are on `:root`** — audit selectors; wire every mode.
8. **Re-verify Figma file** before every `figma_export_tokens` call.
9. **Use directory paths** for `figma_export_tokens` `outputPath`, not file paths.
10. **Remove `Example/*` starter stories** when real Figma components are added.
11. **Verify spacing visually** — blue background alone does not mean tokens work.
12. **Use phased delivery** for full design systems; do not generate everything in one pass.
13. **Skip internal primitives by default** (`.` / `_` prefixes) unless user asks for them.
14. **Canvas background on `.sb-show-main`** — never on the story decorator. Centered layout shrink-wraps `#storybook-root`; decorator backgrounds become a narrow gray column.
15. **Use global theme toolbar** — replace per-story `DarkMode` decorators with `colorMode` / `spacingMode` globals.
16. **MDX + autodocs conflict** — remove `autodocs` tag when a co-located `Component.mdx` exists.
17. **Tag play-test stories** with `play-fn` and scope Vitest via `storybookTest` tags.

---

## Expected output structure

```
{project-root}/
├── tokens.config.json          # optional; enables round-trip sync
├── package.json
├── README.md
├── .storybook/
│   ├── preview.tsx               # Token shell + theme toolbar + decorators
│   ├── preview.css               # .sb-show-main canvas background
│   ├── manager.ts                # Branding
│   └── decorators/
│       └── PageLayouts.tsx       # FormPage, DialogPage decorators
├── src/
│   ├── docs/                     # MDX foundations (Introduction, Tokens, …)
│   ├── styles/
│   │   └── tokens/               # or {token_dir}
│   │       ├── tokens.json       # DTCG source
│   │       └── tokens.css        # CSS custom properties
│   └── components/               # or {components_dir}
│       └── {ComponentName}/
│           ├── {ComponentName}.tsx
│           ├── {ComponentName}.module.css
│           └── {ComponentName}.stories.tsx
```

Component folder names and story content are **derived from Figma**, not predefined.

---

## Quick-start user prompt

After the skill is active, the user may say:

```
Run figma-to-storybook scaffold.
```

The agent must still complete **Step 0** before executing the checklist.
