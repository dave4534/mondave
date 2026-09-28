import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';

const defaultItems = [
  { label: 'Title', value: '1' },
  { label: 'Title', value: '2' },
  { label: 'Title', value: '3' },
  { label: 'Title', value: '4' },
  { label: 'Title', value: '5' },
];

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button groups present related actions as a connected segmented control.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    variant: { control: 'select', options: ['Default', 'Tertiary'] },
  },
  args: {
    items: defaultItems,
    size: 'Medium',
    variant: 'Default',
    defaultValue: '1',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'Default', size: 'Medium' },
};

export const Tertiary: Story = {
  args: { variant: 'Tertiary', size: 'Small' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
      <ButtonGroup items={defaultItems} size="Small" defaultValue="1" />
      <ButtonGroup items={defaultItems} size="Medium" defaultValue="1" />
      <ButtonGroup items={defaultItems} size="Large" defaultValue="1" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('2');
    return <ButtonGroup items={defaultItems} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '1' },
};