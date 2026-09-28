import type { Meta, StoryObj } from '@storybook/react-vite';
import { User } from 'lucide-react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatars represent users or entities with image, letter, initials, or icon types.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Large', 'Medium', 'Small', 'XS'] },
    type: { control: 'select', options: ['IMG', 'Letter', 'Initials', 'Icon'] },
  },
  args: {
    size: 'Medium',
    type: 'IMG',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face';

export const Image: Story = {
  args: { type: 'IMG', src: sampleImage, alt: 'User photo', size: 'Large' },
};

export const Initials: Story = {
  args: { type: 'Initials', text: 'RM', size: 'Medium' },
};

export const Letter: Story = {
  args: { type: 'Letter', text: 'F', size: 'Small' },
};

export const Icon: Story = {
  args: { type: 'Icon', size: 'Medium', iconElement: <User size={16} /> },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Avatar type="Initials" text="RM" size="Large" />
      <Avatar type="Initials" text="RM" size="Medium" />
      <Avatar type="Initials" text="RM" size="Small" />
      <Avatar type="Initials" text="RM" size="XS" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Avatar type="IMG" src={sampleImage} alt="User" size="Medium" />
      <Avatar type="Initials" text="RM" size="Medium" />
      <Avatar type="Letter" text="F" size="Medium" />
      <Avatar type="Icon" size="Medium" iconElement={<User size={16} />} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { type: 'IMG', src: sampleImage, disabled: true, size: 'Medium' },
};