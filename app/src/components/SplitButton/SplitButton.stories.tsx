import type { Meta, StoryObj } from '@storybook/react-vite';
import { Circle } from 'lucide-react';
import { SplitButton } from './SplitButton';

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Split button is a dual-function menu button that offers a default action and secondary alternatives.',
      },
    },
  },
  argTypes: {
    kind: { control: 'select', options: ['Primary', 'Secondary', 'Tertiary'] },
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
  args: {
    kind: 'Primary',
    size: 'Medium',
    children: 'Button',
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithIcon: Story = {
  args: {
    iconElement: <Circle size={16} />,
    children: 'Button',
  },
};

export const AllKinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
      <SplitButton kind="Primary">Button</SplitButton>
      <SplitButton kind="Secondary">Button</SplitButton>
      <SplitButton kind="Tertiary">Button</SplitButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
      <SplitButton size="Small">Button</SplitButton>
      <SplitButton size="Medium">Button</SplitButton>
      <SplitButton size="Large">Button</SplitButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};