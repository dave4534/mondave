import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components');

const docs = [
  {
    folder: 'Accordion',
    title: 'Accordion',
    lead: 'Accordions reveal and hide sections of related content in a vertical stack.',
    whenToUse: ['FAQ or settings grouped by topic', 'Long pages where only one section needs focus at a time'],
    whenNotToUse: ['Short content that fits on screen — keep it visible', 'Primary navigation — use **Tabs** or **Menu**'],
    extra: `## Behavior\n\n- Expand/collapse per item\n- Use for scannable grouped content, not sequential steps — see **Steps** or **MultiStepIndicator**`,
    a11y: ['Header controls should be keyboard operable', 'Expose expanded/collapsed state to assistive tech'],
    canvas: 'Default',
  },
  {
    folder: 'AlertBanner',
    title: 'AlertBanner',
    lead: 'Alert banners communicate important page-level messages with optional actions.',
    whenToUse: ['System status or policy updates at the top of a view', 'Success or error summaries that need attention'],
    whenNotToUse: ['Transient feedback — use **Toast**', 'Inline field errors — use **TextField** validation'],
    extra: `## Types\n\n| Type | Use for |\n|------|--------|\n| primary | Neutral information |\n| positive | Success |\n| negative | Errors or failures |\n| warning | Caution |\n| dark | High-contrast emphasis |`,
    a11y: ['Include a clear message in the banner body', 'Dismiss control needs \`aria-label="Close"\`', 'Do not rely on color alone for meaning'],
    canvas: 'AllTypes',
  },
  {
    folder: 'AttentionBox',
    title: 'AttentionBox',
    lead: 'Attention boxes highlight contextual information with optional link or button actions.',
    whenToUse: ['Tips inside a form or panel', 'Secondary guidance that should not block the page'],
    whenNotToUse: ['Critical blocking messages — use **Modal** or **AlertBanner**', 'Per-field validation — use input helper text'],
    extra: `## Variants\n\n| Variant | Use for |\n|---------|--------|\n| default | Standard callout |\n| compact | Tighter layouts |`,
    a11y: ['Keep copy concise; link actions should describe the destination', 'Ensure sufficient contrast for type variants'],
    canvas: 'AllTypes',
  },
  {
    folder: 'Avatar',
    title: 'Avatar',
    lead: 'Avatars represent users or entities with image, initials, letter, or icon content.',
    whenToUse: ['User identity in lists, comments, or headers', 'Entity placeholders before an image loads'],
    whenNotToUse: ['Decorative icons — use **Icon** slots directly', 'Large profile hero imagery — use a dedicated image component'],
    extra: `## Types\n\n| Type | Use for |\n|------|--------|\n| image | Photo or uploaded avatar |\n| initials | Two-letter fallback |\n| letter | Single-character fallback |\n| icon | Generic entity |`,
    a11y: ['Provide meaningful \`alt\` text for images', 'Decorative avatars should be \`aria-hidden\` when adjacent text names the person'],
    canvas: 'AllTypes',
  },
  {
    folder: 'AvatarGroup',
    title: 'AvatarGroup',
    lead: 'Avatar groups show overlapping avatars with an overflow counter for additional members.',
    whenToUse: ['Collaborators on a board or document', 'Team preview in compact headers'],
    whenNotToUse: ['Single user identity — use **Avatar**', 'Long member lists — link to a full roster view'],
    a11y: ['Expose total count in visible text or \`aria-label\` on the group', 'Overflow "+N" should describe how many more people'],
    canvas: 'Default',
  },
  {
    folder: 'Badge',
    title: 'Badge',
    lead: 'Badges draw attention to new or updated content on a child element.',
    whenToUse: ['Unread counts on icons or avatars', '“New” indicators on navigation items'],
    whenNotToUse: ['Standalone status messaging — use **Label** or **Counter**', 'Large numeric dashboards — use **Counter**'],
    a11y: ['Pair with visible context (e.g. “Notifications” label)', 'Hide decorative badges from assistive tech when redundant'],
    canvas: 'OnButton',
  },
  {
    folder: 'Breadcrumbs',
    title: 'Breadcrumbs',
    lead: 'Breadcrumbs show the current location within a hierarchy and allow navigation upward.',
    whenToUse: ['Deep navigation hierarchies (workspace → folder → item)', 'Desktop layouts with horizontal space'],
    whenNotToUse: ['Flat apps with one level of nav', 'Mobile primary navigation — use **Menu**'],
    extra: `## Parts\n\n- **BreadcrumbsBar** — full trail\n- **BreadcrumbItem** — individual segment (regular vs current)`,
    a11y: ['Wrap the trail in \`nav\` with \`aria-label="Breadcrumb"\`', 'Mark the current page item and omit its link'],
    canvas: 'Bar',
  },
  {
    folder: 'ButtonGroup',
    title: 'ButtonGroup',
    lead: 'Button groups present related actions as a connected segmented control.',
    whenToUse: ['Switching between 2–5 views or filters', 'Mutually exclusive options in a toolbar'],
    whenNotToUse: ['Unrelated actions — use separate **Button** components', 'Single on/off — use **Toggle**'],
    a11y: ['Use \`aria-pressed\` or roving tabindex for the selected segment', 'Label the group when options are icon-only'],
    canvas: 'Default',
  },
  {
    folder: 'Chips',
    title: 'Chips',
    lead: 'Chips represent compact labels, filters, or selections.',
    whenToUse: ['Filter tags and removable selections', 'Compact status or category labels'],
    whenNotToUse: ['Primary actions — use **Button**', 'Long sentences — use body text'],
    extra: `## Types\n\nPrimary, positive, negative, and warning color roles are available.`,
    a11y: ['Removable chips need an accessible remove action', 'Disabled chips should not receive focus'],
    canvas: 'AllTypes',
  },
  {
    folder: 'Combobox',
    title: 'Combobox',
    lead: 'Comboboxes combine search with a selectable list and optional footer action.',
    whenToUse: ['Large option lists where users need to type to filter', '“Add new” flows at the bottom of a list'],
    whenNotToUse: ['Small fixed lists — use **Dropdown**', 'Free text without suggestions — use **TextField**'],
    a11y: ['Input must have an accessible name', 'Announce list visibility and selection changes'],
    canvas: 'Default',
  },
  {
    folder: 'Counter',
    title: 'Counter',
    lead: 'Counters display numeric values such as notification counts.',
    whenToUse: ['Tab counts, filter totals, or quantity badges', 'Numeric emphasis beside labels'],
    whenNotToUse: ['Arbitrary decoration without meaning', 'Progress — use **LinearProgressBar**'],
    extra: `## Styles\n\nFill and line variants with semantic color roles.`,
    a11y: ['Expose the number in context (“Messages, 3 unread”)', 'Do not rely on color alone'],
    canvas: 'Primary',
  },
  {
    folder: 'DatePicker',
    title: 'DatePicker',
    lead: 'Date pickers let users choose dates or ranges from a calendar surfaced via a text field.',
    whenToUse: ['Scheduling, deadlines, or reporting date ranges', 'When exact calendar dates matter'],
    whenNotToUse: ['Relative times (“in 2 hours”) — use plain text or presets', 'Simple year-only input — use **Dropdown**'],
    a11y: ['Calendar grid needs labeled days and keyboard navigation', 'Pair with a visible label on the trigger field'],
    canvas: 'Date',
  },
  {
    folder: 'Divider',
    title: 'Divider',
    lead: 'Dividers separate content into distinct sections.',
    whenToUse: ['Visual separation between list groups or form sections', 'Toolbar or menu item grouping'],
    whenNotToUse: ['Spacing alone — use layout tokens', 'Decorative lines without semantic separation'],
    extra: `## Orientation\n\nHorizontal and vertical dividers are supported.`,
    a11y: ['Use \`role="separator"\` when the divider conveys structure', 'Prefer spacing when separation is purely visual'],
    canvas: 'BothOrientations',
  },
  {
    folder: 'EmptyState',
    title: 'EmptyState',
    lead: 'Empty states explain what to do when a view has no content yet.',
    whenToUse: ['First-time use or cleared lists', 'No search results with a suggested next step'],
    whenNotToUse: ['Loading — use **Skeleton** or **Loader**', 'Errors — use **AlertBanner** or inline validation'],
    extra: `## Variants\n\n| Variant | Use for |\n|---------|--------|\n| default | Standard panel |\n| compact | Tight layouts |\n| inline | Inside tables or rows |\n| main | Hero-style empty views |`,
    a11y: ['Title should state the situation clearly', 'Primary action needs descriptive label text'],
    canvas: 'Default',
  },
  {
    folder: 'IconButton',
    title: 'IconButton',
    lead: 'Icon buttons are square, icon-only controls for compact actions.',
    whenToUse: ['Toolbar actions (close, edit, more)', 'Repeated actions where space is limited'],
    whenNotToUse: ['Actions that need a text label for clarity — use **Button**', 'Navigation to another page — use **Link**'],
    a11y: ['**Required:** \`aria-label\` describing the action', 'Visible \`:focus-visible\` ring on keyboard focus'],
    canvas: 'AllKinds',
  },
  {
    folder: 'Label',
    title: 'Label',
    lead: 'Labels categorize or highlight short pieces of text.',
    whenToUse: ['Status tags (Beta, New)', 'Category markers in tables or cards'],
    whenNotToUse: ['Interactive filters — use **Chips**', 'Long descriptions — use body text'],
    extra: `## Styles\n\nFill and line treatments with semantic colors and multiple sizes.`,
    a11y: ['Keep label text short and meaningful', 'Do not use labels as the only error indicator'],
    canvas: 'AllColorsFill',
  },
  {
    folder: 'LinearProgressBar',
    title: 'LinearProgressBar',
    lead: 'Linear progress bars show completion toward a goal with an optional percentage label.',
    whenToUse: ['File uploads or multi-step task progress', 'Determinate completion (0–100%)'],
    whenNotToUse: ['Indeterminate waits with unknown duration — use **Loader**', 'Single-step button feedback — use **Button** loading state'],
    extra: `## Types\n\nPrimary, positive, negative, and multi-segment variants.`,
    a11y: ['Use \`role="progressbar"\` with \`aria-valuenow\` when determinate', 'Provide a text alternative for the percentage'],
    canvas: 'AllTypes',
  },
  {
    folder: 'Link',
    title: 'Link',
    lead: 'Links navigate users to another page, route, or external resource.',
    whenToUse: ['In-text navigation and external URLs', 'Secondary actions that leave the current flow'],
    whenNotToUse: ['Submitting forms or firing commands — use **Button**', 'Toggling settings — use **Toggle**'],
    extra: `## States\n\nDefault, hover, disabled, and inverted treatments are available.`,
    a11y: ['Link text must describe the destination', 'External links should indicate they open a new context when applicable'],
    canvas: 'Default',
  },
  {
    folder: 'List',
    title: 'List',
    lead: 'Lists display vertical rows with optional icons, avatars, badges, and selection.',
    whenToUse: ['Selectable rows in a panel or picker', 'Settings or item pickers with rich row content'],
    whenNotToUse: ['Semantic document outlines — use proper heading structure', 'Data tables with sortable columns — use a table pattern'],
    a11y: ['Selectable rows need clear selected state', 'Row actions should be keyboard reachable'],
    canvas: 'Default',
  },
  {
    folder: 'Loader',
    title: 'Loader',
    lead: 'Loaders indicate that content is loading.',
    whenToUse: ['Page or section fetches with unknown duration', 'Inline waits where a button spinner is not enough'],
    whenNotToUse: ['Button submit feedback — use **Button** loading state', 'Layout placeholders — use **Skeleton**'],
    a11y: ['Use role="status" with an accessible label', 'Remove or hide the loader when loading completes'],
    canvas: 'AllSizes',
  },
  {
    folder: 'Menu',
    title: 'Menu',
    lead: 'Menus present a list of actions or destinations in a compact overlay.',
    whenToUse: ['Overflow actions (“More” menus)', 'Contextual action lists'],
    whenNotToUse: ['Form option picking — use **Dropdown** or **Combobox**', 'Persistent navigation — use app nav patterns'],
    a11y: ['Menu items must be keyboard navigable', 'Trigger should declare \`aria-expanded\`'],
    canvas: 'Default',
  },
  {
    folder: 'MultiStepIndicator',
    title: 'MultiStepIndicator',
    lead: 'Multi-step indicators visualize progress through a wizard or onboarding flow.',
    whenToUse: ['Checkout, setup wizards, or guided onboarding', 'When users need to see steps ahead and behind'],
    whenNotToUse: ['Single-step forms', 'Non-linear exploration — use **Tabs**'],
    extra: `## Layouts\n\nHorizontal and vertical orientations with compact mode.`,
    a11y: ['Announce current step and total steps', 'Do not rely on color alone for completed vs upcoming'],
    canvas: 'AllTypes',
  },
  {
    folder: 'RadioButton',
    title: 'RadioButton',
    lead: 'Radio buttons let users choose exactly one option from a set.',
    whenToUse: ['2–7 mutually exclusive choices', 'Settings where all options should be visible'],
    whenNotToUse: ['Multiple selections — use **Checkbox**', 'On/off settings — use **Toggle**', 'Many options — use **Dropdown**'],
    a11y: ['Group related radios with \`fieldset\` / \`legend\` or \`role="radiogroup"\`', 'Error state should be linked with \`aria-describedby\`'],
    canvas: 'Vertical',
  },
  {
    folder: 'Search',
    title: 'Search',
    lead: 'Search fields let users query and filter content with an optional clear control.',
    whenToUse: ['Filtering lists, tables, or directories', 'Global or scoped search in a toolbar'],
    whenNotToUse: ['Choosing from a fixed enum — use **Dropdown**', 'Multi-field advanced search — build a dedicated form'],
    a11y: ['Use \`type="search"\` or \`role="searchbox"\` with a visible label', 'Clear button needs an accessible name'],
    canvas: 'Default',
  },
  {
    folder: 'Skeleton',
    title: 'Skeleton',
    lead: 'Skeletons provide placeholder previews while content loads.',
    whenToUse: ['Initial page load where layout is known', 'Reducing layout shift before data arrives'],
    whenNotToUse: ['Short button actions — use **Button** loading state', 'Indeterminate spinner-only waits — use **Loader**'],
    extra: `## Shapes\n\nRectangle, circle, and text line placeholders.`,
    a11y: ['Mark skeleton containers as aria-busy while loading', 'Replace with real content when loaded'],
    canvas: 'AllTypes',
  },
  {
    folder: 'Slider',
    title: 'Slider',
    lead: 'Sliders let users pick a value or range along a track.',
    whenToUse: ['Numeric settings where approximate values are fine (volume, opacity)', 'Range filters with visual feedback'],
    whenNotToUse: ['Exact numeric entry — pair with **TextField** or use stepper', 'Binary choices — use **Toggle**'],
    a11y: ['Thumbs must be keyboard operable', 'Expose \`aria-valuemin\`, \`aria-valuemax\`, and \`aria-valuenow\`'],
    canvas: 'AllTypes',
  },
  {
    folder: 'SplitButton',
    title: 'SplitButton',
    lead: 'Split buttons combine a primary action with a menu of secondary alternatives.',
    whenToUse: ['Save with “Save as…” alternatives', 'Primary action plus related variants'],
    whenNotToUse: ['Unrelated actions in one control — use separate buttons', 'Single action — use **Button**'],
    a11y: ['Both segments need discernible names', 'Menu trigger must declare expanded state'],
    canvas: 'Primary',
  },
  {
    folder: 'Steps',
    title: 'Steps',
    lead: 'Steps navigate sequential content with previous/next controls and optional gallery dots.',
    whenToUse: ['Carousels, guided tours, or paginated subflows', 'Step-by-step media or instructions'],
    whenNotToUse: ['Hierarchy location — use **Breadcrumbs**', 'Form wizards with labeled steps — use **MultiStepIndicator**'],
    a11y: ['Announce current step index', 'Previous/next buttons need clear labels'],
    canvas: 'Gallery',
  },
  {
    folder: 'Sticky',
    title: 'Sticky',
    lead: 'Sticky indicates pinned or sticky items with an on/off visual state.',
    whenToUse: ['Pinning rows, notes, or columns', 'Showing that an item stays fixed while scrolling'],
    whenNotToUse: ['Generic favorites — use icon + label with clear copy', 'Primary navigation pinning'],
    a11y: ['Toggle must communicate pinned state in text or \`aria-pressed\`', 'Do not rely on icon color alone'],
    canvas: 'StickyOn',
  },
  {
    folder: 'Tabs',
    title: 'Tabs',
    lead: 'Tabs organize related content into switchable panels within the same view.',
    whenToUse: ['2–6 peer sections at the same level', 'Settings categories or record detail views'],
    whenNotToUse: ['Sequential wizard steps — use **MultiStepIndicator**', 'Deep hierarchy — use navigation'],
    extra: `## Variants\n\nNormal, counter, and stretched layouts.`,
    a11y: ['Tab list uses \`role="tablist"\`; panels use \`role="tabpanel"\`', 'Active tab should be focusable and announced'],
    canvas: 'Normal',
  },
  {
    folder: 'TextArea',
    title: 'TextArea',
    lead: 'Text areas let users enter multiple lines of text.',
    whenToUse: ['Descriptions, comments, or long-form notes', 'Multi-line validation with helper text'],
    whenNotToUse: ['Single-line values — use **TextField**', 'Rich text editing — use a dedicated editor'],
    extra: `## States\n\n| State | Use for |\n|-------|--------|\n| default | Normal input |\n| error | Validation failure |\n| success | Positive feedback |\n| disabled | Inactive |\n| readonly | Display-only |`,
    a11y: ['Label associated via \`htmlFor\` / \`id\`', '\`aria-invalid\` on error state'],
    canvas: 'States',
  },
  {
    folder: 'Tipseen',
    title: 'Tipseen',
    lead: 'Tipseen provides guided onboarding callouts with optional media and actions.',
    whenToUse: ['First-run product tours', 'Feature discovery anchored to UI elements'],
    whenNotToUse: ['Critical errors — use **Modal** or **AlertBanner**', 'Persistent help — use documentation links'],
    a11y: ['Allow users to dismiss and return later', 'Trap focus only when the tip blocks required action'],
    canvas: 'Default',
  },
  {
    folder: 'Toast',
    title: 'Toast',
    lead: 'Toasts show brief, non-blocking feedback after an action.',
    whenToUse: ['Confirming save, copy, or background task completion', 'Transient status that does not need a response'],
    whenNotToUse: ['Errors that require a decision — use **Modal**', 'Persistent page alerts — use **AlertBanner**'],
    extra: `## Types\n\nPrimary, negative, positive, and warning. Supports loading state without actions.`,
    a11y: ['Use \`role="status"\` or live region for announcements', 'Provide a dismiss control when the toast stays on screen'],
    canvas: 'AllTypes',
  },
  {
    folder: 'Toggle',
    title: 'Toggle',
    lead: 'Toggles let users switch a single setting on or off.',
    whenToUse: ['Immediate binary settings (notifications, visibility)', 'States that take effect without a separate Save'],
    whenNotToUse: ['Multiple options — use **RadioButton** or **Dropdown**', 'Actions that submit a form — use **Button**'],
    a11y: ['Use \`role="switch"\` with \`aria-checked\`', 'Visible on/off labels help all users'],
    canvas: 'Interactive',
  },
  {
    folder: 'Tooltip',
    title: 'Tooltip',
    lead: 'Tooltips reveal short helper text on hover or focus.',
    whenToUse: ['Icon-only control hints', 'Brief definitions of unfamiliar terms'],
    whenNotToUse: ['Essential instructions — put them in visible copy', 'Long content — use **Tipseen** or inline help'],
    a11y: ['Trigger must be keyboard focusable', 'Tooltip content should be available to screen readers on focus'],
    canvas: 'Default',
  },
];

function renderMdx(entry) {
  const whenUse = entry.whenToUse.map((line) => `- ${line}`).join('\n');
  const whenNot = entry.whenNotToUse.map((line) => `- ${line}`).join('\n');
  const a11y = entry.a11y.map((line) => `- ${line}`).join('\n');
  const extra = entry.extra ? `${entry.extra}\n\n` : '';

  return `import { Meta, Canvas, Stories } from '@storybook/addon-docs/blocks';
import * as ${entry.folder}Stories from './${entry.folder}.stories';

<Meta of={${entry.folder}Stories} />

# ${entry.title}

${entry.lead}

## When to use

${whenUse}

## When not to use

${whenNot}

${extra}## Accessibility

${a11y}

## Examples

<Canvas of={${entry.folder}Stories.${entry.canvas}} />

<Stories />

## Figma parity

| Axis | Status |
|------|--------|
| Core behavior | Implemented |
| All Figma variants | Partial |
`;
}

for (const entry of docs) {
  const dir = path.join(root, entry.folder);
  const file = path.join(dir, `${entry.folder}.mdx`);
  fs.writeFileSync(file, renderMdx(entry));
  console.log(`Wrote ${entry.folder}.mdx`);
}
