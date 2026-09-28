import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dividers separate content into distinct sections.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 275 }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ height: 120, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export const BothOrientations: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-24)', alignItems: 'stretch', minHeight: 120 }}>
      <div style={{ flex: 1 }}>
        <Divider />
      </div>
      <Divider orientation="vertical" />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'var(--secondary-text-color)', fontSize: 14 }}>Content</span>
      </div>
    </div>
  ),
};
