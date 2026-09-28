import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, User } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badges draw attention to new or updated content on a child element.',
      },
    },
  },
  argTypes: {
    show: { control: 'boolean' },
  },
  args: {
    show: true,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnButton: Story = {
  render: (args) => (
    <Badge {...args}>
      <Button kind="Primary">Button</Button>
    </Badge>
  ),
};

export const OnIconButton: Story = {
  render: (args) => (
    <Badge {...args}>
      <Button
        kind="Primary"
        size="Medium"
        icon="Default"
        aria-label="Notifications"
        style={{ width: 40, height: 40, padding: 0 }}
      >
        <Bell size={20} />
      </Button>
    </Badge>
  ),
};

export const OnAvatar: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--primary-selected-color)',
          color: 'var(--primary-color)',
        }}
      >
        <User size={18} />
      </span>
    </Badge>
  ),
};

export const Hidden: Story = {
  args: { show: false },
  render: (args) => (
    <Badge {...args}>
      <Button kind="Primary">Button</Button>
    </Badge>
  ),
};
