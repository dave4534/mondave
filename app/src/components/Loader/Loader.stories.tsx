import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loaders indicate that content is loading.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['XS', 'S', 'M', 'L'] },
  },
  args: {
    size: 'M',
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-24)', alignItems: 'center' }}>
      <Loader size="XS" />
      <Loader size="S" />
      <Loader size="M" />
      <Loader size="L" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 'var(--space-32)',
          background: 'var(--inverted-color-background)',
          borderRadius: 'var(--space-4)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { size: 'L' },
};
