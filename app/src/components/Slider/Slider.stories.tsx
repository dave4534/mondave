import type { Meta, StoryObj } from '@storybook/react-vite';
import { Volume2 } from 'lucide-react';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Slider is a visual input component that reflects current state status in its appearance.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Primary', 'Positive', 'Negative'] },
    size: { control: 'select', options: ['Large', 'Medium', 'Small'] },
    range: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showIcon: { control: 'boolean' },
  },
  args: {
    type: 'Primary',
    size: 'Large',
    range: true,
    showLabel: false,
    showIcon: false,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Range: Story = {};

export const Single: Story = {
  args: { range: false, defaultValue: 55 },
};

export const WithLabel: Story = {
  args: { showLabel: true, label: 'Volume' },
};

export const WithIcon: Story = {
  args: { showIcon: true, icon: <Volume2 size={16} /> },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)', width: 325 }}>
      <Slider type="Primary" />
      <Slider type="Positive" />
      <Slider type="Negative" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)', width: 325 }}>
      <Slider size="Large" />
      <Slider size="Medium" />
      <Slider size="Small" />
    </div>
  ),
};