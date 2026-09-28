import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeletons provide a placeholder preview while content loads.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Circle', 'Rectangle', 'H1 Text', 'H2 Text', 'Paragraph Text'],
    },
  },
  args: {
    type: 'Rectangle',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rectangle: Story = {
  args: { type: 'Rectangle' },
};

export const Circle: Story = {
  args: { type: 'Circle' },
};

export const TextShapes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
      <Skeleton type="H1 Text" />
      <Skeleton type="H2 Text" />
      <Skeleton type="Paragraph Text" />
    </div>
  ),
};

export const AllTypes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-24)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Skeleton type="Circle" />
      <Skeleton type="Rectangle" />
      <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
        <Skeleton type="H1 Text" />
        <Skeleton type="H2 Text" />
        <Skeleton type="Paragraph Text" />
      </div>
    </div>
  ),
};
