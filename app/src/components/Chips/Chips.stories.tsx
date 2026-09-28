import type { Meta, StoryObj } from '@storybook/react-vite';
import { Circle } from 'lucide-react';
import { Chips } from './Chips';

const meta = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chips represent compact labels, filters, or selections.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Primary', 'Positive', 'Negative', 'Warning'] },
    icon: { control: 'select', options: ['None', 'Left', 'Right'] },
  },
  args: {
    children: 'This is a chip',
    type: 'Primary',
    icon: 'None',
    showCloseButton: false,
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { type: 'Primary' },
};

export const Positive: Story = {
  args: { type: 'Positive' },
};

export const Negative: Story = {
  args: { type: 'Negative' },
};

export const Warning: Story = {
  args: { type: 'Warning' },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
      <Chips type="Primary">This is a chip</Chips>
      <Chips type="Positive">This is a chip</Chips>
      <Chips type="Negative">This is a chip</Chips>
      <Chips type="Warning">This is a chip</Chips>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    icon: 'Left',
    iconElement: <Circle size={14} />,
    showCloseButton: true,
  },
};

export const WithRightIcon: Story = {
  args: {
    icon: 'Right',
    iconElement: <Circle size={14} />,
    showCloseButton: true,
  },
};

export const WithCloseButton: Story = {
  args: { showCloseButton: true },
};

export const Disabled: Story = {
  args: { disabled: true, showCloseButton: true },
};