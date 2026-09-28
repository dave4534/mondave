import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const items = [
  { id: 'tab-1', label: 'Tab', count: 2 },
  { id: 'tab-2', label: 'Tab', count: 5 },
  { id: 'tab-3', label: 'Tab', count: 1 },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'select', options: ['normal', 'counter'] },
    stretched: { control: 'select', options: ['on', 'off'] },
  },
  args: {
    items: [
      { id: 'tab-1', label: 'Tab' },
      { id: 'tab-2', label: 'Tab' },
    ],
    type: 'normal',
    stretched: 'off',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Counter: Story = {
  args: { type: 'counter', items },
};

export const Stretched: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: { stretched: 'on', items },
};

export const CounterStretched: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: { type: 'counter', stretched: 'on', items },
};
