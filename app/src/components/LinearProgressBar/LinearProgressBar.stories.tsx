import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinearProgressBar } from './LinearProgressBar';

const meta = {
  title: 'Components/LinearProgressBar',
  component: LinearProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Horizontal progress indicator with optional percentage label.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Primary', 'Positive', 'Negative', 'Multi'] },
    label: { control: 'select', options: ['On', 'Off'] },
  },
  args: {
    type: 'Primary',
    size: 'Small',
    label: 'On',
    value: 30,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 277 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinearProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Positive: Story = {
  args: { type: 'Positive' },
};

export const Negative: Story = {
  args: { type: 'Negative' },
};

export const Multi: Story = {
  args: { type: 'Multi' },
};

export const WithoutLabel: Story = {
  args: { label: 'Off' },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)', width: 277 }}>
      <LinearProgressBar type="Primary" label="On" value={30} />
      <LinearProgressBar type="Positive" label="On" value={30} />
      <LinearProgressBar type="Negative" label="On" value={30} />
      <LinearProgressBar type="Multi" label="On" value={30} />
    </div>
  ),
};
