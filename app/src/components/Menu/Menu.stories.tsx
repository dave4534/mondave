import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight, Settings, User } from 'lucide-react';
import { Menu } from './Menu';

const items = [
  { id: '1', label: 'Profile', leftIcon: <User size={16} /> },
  { id: '2', label: 'Settings', leftIcon: <Settings size={16} />, rightIcon: <ChevronRight size={16} /> },
  { id: '3', label: 'Sign out' },
];

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Simplified menu list container with optional caption.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
  args: {
    size: 'Small',
    items,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCaption: Story = {
  args: { caption: 'Account' },
};

export const Medium: Story = {
  args: { size: 'Medium' },
};

export const Large: Story = {
  args: { size: 'Large' },
};
