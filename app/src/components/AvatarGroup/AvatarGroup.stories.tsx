import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup';

const sampleImage =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face';

const sampleItems = [
  { id: '1', type: 'IMG' as const, src: sampleImage, alt: 'User 1' },
  { id: '2', type: 'Initials' as const, text: 'AB' },
  { id: '3', type: 'Initials' as const, text: 'CD' },
  { id: '4', type: 'Initials' as const, text: 'EF' },
  { id: '5', type: 'Initials' as const, text: 'GH' },
];

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Overlapping avatar stack with overflow counter.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Large', 'Medium', 'Small', 'XS'] },
    state: { control: 'select', options: ['Default', 'Disabled'] },
  },
  args: {
    size: 'Medium',
    state: 'Default',
    items: sampleItems,
    max: 3,
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 'Large' },
};

export const Small: Story = {
  args: { size: 'Small' },
};

export const Disabled: Story = {
  args: { state: 'Disabled' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
      <AvatarGroup size="Large" items={sampleItems} />
      <AvatarGroup size="Medium" items={sampleItems} />
      <AvatarGroup size="Small" items={sampleItems} />
      <AvatarGroup size="XS" items={sampleItems} />
    </div>
  ),
};
