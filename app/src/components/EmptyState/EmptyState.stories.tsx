import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'inline', 'main'],
    },
  },
  args: {
    variant: 'default',
    title: 'Write the bottom line first & keep it short',
    description:
      'Give more context here. Explain what the user will gain by taking action. If you have more to say, add a link below.',
    mainAction: { label: 'Main action' },
    supportingAction: { label: 'Read more' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = { args: { variant: 'compact' } };

export const Inline: Story = {
  args: {
    variant: 'inline',
    description: undefined,
    mainAction: undefined,
    supportingAction: undefined,
  },
};

export const Main: Story = { args: { variant: 'main' } };
