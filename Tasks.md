# Mondave · Tasks

Finite checklist to make Mondave feel like a polished, portfolio-ready design-system Storybook — similar *kinds* of experiences to professional design systems (installable components, clear docs, solid foundations), **without** copying Monday branding, copy, logos, or implying affiliation.

**Goal:** Finish every remaining item below. This is not a forever backlog.

---

## How we will work

1. Pick the next open task.
2. In **Ask mode**, get a layman’s explanation of what it means and what will change.
3. Approve, then switch to **Agent mode** to execute **that task only**.
4. Mark it done here when finished.
5. Repeat.

Do not start the next task until the previous one is explained and approved.

---

## Already done

These are already in place — listed so we don’t redo them:

- [x] 40 public React components with Storybook stories
- [x] Design tokens exported from Figma → CSS variables
- [x] Global Color (Light / Dark / Black) + Spacing toolbar in Storybook
- [x] Full-canvas background fix (no gray strip on centered stories)
- [x] MDX foundations: Introduction, Tokens, Color, Spacing, Typography (placeholder), Accessibility, Deprecation
- [x] Rich MDX for 5 pilot components: Button, TextField, Modal, Checkbox, Dropdown
- [x] Interaction (`play`) tests for those pilots + `npm run test-storybook`
- [x] Mondave naming in Storybook brand / docs (no Monday product branding)
- [x] Storybook deploy config (`app/vercel.json`) and CI workflow skeleton
- [x] Layout decorators for form / dialog story context

---

## Remaining tasks (finish these)

Ordered for least confusion and lowest future maintenance.

### 1. Make the library easy for a developer to use

- [x] Rename / configure the package so it’s clearly **Mondave** (not a generic `app` folder name) → `@mondave/core`
- [x] Document the exact import pattern for components + tokens in [`app/README.md`](app/README.md) (copy-paste “how to use in a React app”)
- [x] Add a clear `exports`-friendly entry (or package entry pointing at `src/components`) so imports are straightforward
- [x] Surface package usage on Storybook **Design System → Introduction** so the change is visible in the UI

### 2. Polish Storybook welcome / intro (Mondave voice only)

- [x] Turn Introduction into a clear Mondave landing experience in Storybook (what this is, how to browse, how to use components)
- [x] Keep all wording Mondave-native — **no** Monday product names, “Vibe”, or affiliation language

### 3. Finish foundations

- [x] Export typography / text styles from Figma into the token pipeline *(Desktop Bridge text styles → `typography.css`)*
- [x] Complete [`app/src/docs/Typography.mdx`](app/src/docs/Typography.mdx) with real type scale once tokens exist
- [x] Tighten Color + Spacing MDX so foundations feel finished alongside Typography

### 4. Deepen the pilot components (quality over quantity)

For **Button, TextField, Modal, Checkbox, Dropdown** only:

- [x] Add important missing states (e.g. loading / disabled / error where they make sense)
- [x] Ensure Storybook examples show those states clearly
- [x] Update each pilot’s MDX do/don’t and parity notes after changes

### 5. Expand docs for a second wave of components

- [x] Add Mondave-voice MDX (when to use / when not / a11y notes) for **all 40** components
- [x] Remove `autodocs` vs MDX conflicts if they appear (same pattern as pilots)

### 6. Document icons simply

- [x] Document that Lucide is the current icon approach (slot props / examples)
- [x] Optional thin wrapper only if needed for consistency — **Icon** component at `Components/Icon`

### 7. Build and document custom Mondave MCP (`@mondave/mcp`)

This is a **blocking** pre-publish task and must be completed before GitHub + Vercel steps.

- [x] Define Mondave MCP parity matrix vs Vibe MCP (tool coverage, inputs/outputs, guidance quality)
- [x] Scaffold a standalone package for `@mondave/mcp` (not Storybook MCP) with strict typed tool contracts
- [x] Implement full Vibe-like tool families for Mondave:
  - [x] Component metadata / discovery
  - [x] Component examples / boilerplate snippets
  - [x] Component accessibility guidance
  - [x] Docs search + focused retrieval
  - [x] Icon search/list/detail for Mondave icon usage
  - [x] Token search/list/detail for Mondave design tokens
  - [x] Migration-analysis style helper flow for Mondave adoption
- [x] Add robust request validation and meaningful error handling at all MCP boundaries
- [x] Add Vibe-grade guidance docs (Cursor + VS Code install/setup, workflows, tool reference, troubleshooting)
- [x] Verify with automated tests + MCP smoke checks before marking complete

### 8. Publish the portfolio piece

External steps you run (repo helper can prepare files; you approve accounts / pushes):

- [ ] Initialize git + create a public GitHub repository for Mondave
- [ ] Push source (exclude `node_modules`; decide whether to commit `storybook-static`)
- [ ] Deploy Storybook to Vercel (or similar) using existing [`app/vercel.json`](app/vercel.json)
- [ ] Put the live Storybook URL in the README

### 9. Portfolio branding asset (optional but nice)

- [ ] Provide or approve a simple Mondave logo / mark for Storybook sidebar *(external: you)*
- [ ] Wire it into [`.storybook/manager.ts`](app/.storybook/manager.ts) when available

---

## Explicitly skipped (on purpose)

These would push toward an enterprise Monday-scale platform and need ongoing maintenance. **Out of scope** for this finishable list:

| Skipped | Why |
|---------|-----|
| Full monorepo (`core` / `icons` / `style` packages) | High setup + maintenance for a portfolio demo |
| Chromatic / visual regression as required CI | Extra account + ongoing baseline upkeep |
| Codemods for migrating apps | Only useful for large consuming codebases |
| Relying only on Storybook MCP for AI agents | Not enough for requested Vibe-like parity and custom tooling |
| Cloning Vibe’s playground / welcome UI | Risk of looking copied / affiliated |
| Full Figma variant matrix for all 40 components | Diminishing returns vs pilot depth |
| Monday-platform-only integrations | Not relevant to Mondave as a standalone DS |

If you later want any of these, we’ll open a **new** finite task list — not grow this one forever.

---

## Status

- Remaining tasks: open, not executed yet
- Created for teach-first workflow: explain → approve → execute → check off
