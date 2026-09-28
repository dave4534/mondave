import type { Meta, StoryObj } from '@storybook/react-vite';
import { BreadcrumbItem, BreadcrumbsBar } from './Breadcrumbs';

const barMeta = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsBar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BreadcrumbsBar>;

const itemMeta = {
  title: 'Components/Breadcrumbs/Item',
  component: BreadcrumbItem,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BreadcrumbItem>;

export default barMeta;
type BarStory = StoryObj<typeof barMeta>;
type ItemStory = StoryObj<typeof itemMeta>;

export const Bar: BarStory = {
  args: {
    items: [
      { name: 'Workspace', label: 'Workspace' },
      { name: 'Folder', label: 'Folder' },
      { name: 'Board', label: 'Board' },
    ],
  },
};

export const ItemRegular: ItemStory = {
  ...itemMeta,
  args: { name: 'Board', state: 'Regular' },
};

export const ItemCurrent: ItemStory = {
  ...itemMeta,
  args: { name: 'Board', state: 'Current', showSeparator: false },
};

export const AllNames: ItemStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {(['Workspace', 'Folder', 'Group', 'Board', 'Children'] as const).map((name) => (
        <BreadcrumbItem key={name} name={name} state="Regular" />
      ))}
    </div>
  ),
};
