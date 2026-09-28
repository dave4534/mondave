import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sticky } from './Sticky';

const meta = {
  title: 'Components/Sticky',
  component: Sticky,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Pin indicator for sticky/pinned items.',
      },
    },
  },
  argTypes: {
    isSticky: { control: 'boolean' },
  },
  args: {
    isSticky: true,
  },
} satisfies Meta<typeof Sticky>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StickyOn: Story = {
  args: { isSticky: true },
};

export const StickyOff: Story = {
  args: { isSticky: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};