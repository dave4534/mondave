# Mondave Design System (`@mondave/core`)

React + Storybook component library with design tokens from Figma.

## Quick start (Storybook)

```bash
cd app
npm install
npm run storybook   # http://localhost:6006
```

## Using Mondave in a React app

The package name is **`@mondave/core`**.

### 1. Install / link

Until published to npm, consume from this repo (clone, workspace, or `file:` / GitHub URL install). The package root is the `app/` directory.

### 2. Load tokens once

In your app entry (e.g. `main.tsx`):

```tsx
import '@mondave/core/tokens';
import '@mondave/core/typography';
```

That loads color/spacing CSS variables and typography tokens / `.type-*` classes.

### 3. Import components

```tsx
import { Button, Checkbox, TextField } from '@mondave/core';

export function FormActions() {
  return (
    <>
      <TextField label="Email" />
      <Button kind="Primary" size="Medium">
        Continue
      </Button>
    </>
  );
}
```

Peer dependencies: `react` and `react-dom` (v19). Icons use **Lucide React** — see **Components → Icon** for usage, sizing, and `iconElement` slot patterns. Load **Poppins** (headings) and **Figtree** (body) in your app if you use typography classes.

### Package exports

| Import | Resolves to |
|--------|-------------|
| `@mondave/core` | Component barrel (`src/components/index.ts`) |
| `@mondave/core/tokens` | Color/spacing CSS variables (`src/styles/generated/tokens.css`) |
| `@mondave/core/typography` | Type scale + utility classes (`src/styles/generated/typography.css`) |

## Storybook structure

| Section | Contents |
|---------|----------|
| **Design System** | Introduction, Tokens, Color, Spacing, Typography, Accessibility, Deprecation (MDX) |
| **Design System** | Overview, Token Smoke Test, Token Showcase (stories) |
| **Components** | 40 Figma components + **Icon** (Lucide wrapper) — each with CSF stories and MDX guidelines |

### Toolbar

Use the Storybook toolbar to switch **Color** (Light / Dark / Black) and **Spacing** (Mode 1) globally.

## Verify

```bash
npm run build
npm run build-storybook
npm run test-storybook    # 5 interaction tests (play-fn tagged stories)
```

## Stack

React 19 · TypeScript · Vite · Storybook 10 · CSS Modules · Lucide icons · Figma tokens (DTCG → CSS variables)

## Token wiring

| Collection | Selector |
|------------|----------|
| Color (Light) | `:root` |
| Color (Dark) | `.dark` on `body` |
| Color (Black) | `[data-theme="black"]` on `html` |
| Spacing | `[data-theme="mode-1"]` on `body` |

See **Design System → Token Smoke Test** to verify spacing tokens resolve.

## Components (40 + Icon)

All public component sets from Figma, each with Storybook stories and MDX guidelines.

**Icon** — Lucide-based icon wrapper and usage guide (**Components → Icon**). Not a Figma component set; documents how icons work across Mondave.

## Figma catalog

`src/figma/component-catalog.json` — node IDs for sync and regeneration.

## Token sync

- **Export:** `figma_export_tokens` (Figma → code)
- **Import:** `figma_import_tokens` (code → Figma)

## Deploy Storybook (later)

Configured via `vercel.json` in this directory. Prefer a clean GitHub repo first; then connect Vercel so the live site stays in sync with GitHub.

## Mondave MCP (`@mondave/mcp`)

Custom MCP server lives in `app/mcp` (separate package from Storybook MCP).

```bash
cd app/mcp
npm install
npm run build
```

Then point your MCP client to `app/mcp/dist/server.js` (or use `npx @mondave/mcp` after publish).

## CI

GitHub Actions workflow `.github/workflows/storybook.yml` runs build + Storybook tests on push/PR (after the repo is on GitHub).

## Scope notes

Complex sets (e.g. Button) implement core axes — not every Figma variant. Typography MDX awaits typography token export from Figma.
