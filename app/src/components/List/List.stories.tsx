import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Star } from 'lucide-react';
import { List } from './List';

const sampleImage =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face';

const items = [
  { id: '1', label: 'Option 1', badge: 'Label' },
  { id: '2', label: 'Option 2', leftIcon: <Star size={16} /> },
  { id: '3', label: 'Option 3', rightIcon: <Check size={16} /> },
  {
    id: '4',
    label: 'Option 4',
    avatar: { type: 'IMG' as const, src: sampleImage, alt: 'User' },
  },
  { id: '5', label: 'Option 5', disabled: true },
];

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Vertical list of selectable items with optional icons, avatars, and badges.',
      },
    },
  },
  args: {
    items,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 250 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    items: items.map((item, index) => ({
      ...item,
      selected: index === 1,
    })),
  },
};

export const ListItemStates: Story = {
  render: () => (
    <div style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <List items={[{ id: '1', label: 'Default item' }]} />
      <List items={[{ id: '2', label: 'Selected item', selected: true }]} />
      <List items={[{ id: '3', label: 'Disabled item', disabled: true }]} />
    </div>
  ),
};
