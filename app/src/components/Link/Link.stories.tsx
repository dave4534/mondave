import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalLink } from 'lucide-react';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Links navigate users to another page or external resource.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Large'] },
    state: { control: 'select', options: ['Default', 'Hover', 'Disabled'] },
    iconPosition: { control: 'select', options: ['No icon', 'Start', 'End'] },
    inverted: { control: 'boolean' },
  },
  args: {
    children: 'Read more',
    size: 'Large',
    state: 'Default',
    iconPosition: 'No icon',
    inverted: false,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  args: { state: 'Hover' },
};

export const Disabled: Story = {
  args: { state: 'Disabled' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Link size="Small">Read more</Link>
      <Link size="Large">Read more</Link>
    </div>
  ),
};

export const WithStartIcon: Story = {
  args: {
    iconPosition: 'Start',
    iconElement: <ExternalLink size={20} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    iconPosition: 'End',
    iconElement: <ExternalLink size={20} />,
  },
};

export const Inverted: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 'var(--space-24)',
          background: 'var(--inverted-color-background)',
          borderRadius: 'var(--space-4)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { inverted: true },
};
