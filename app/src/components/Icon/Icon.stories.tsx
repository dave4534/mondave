import type { Meta, StoryObj } from '@storybook/react-vite';
import { Settings } from 'lucide-react';
import { Icon } from './Icon';
import { IconIconsList } from './IconIconsList';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon component unifies Lucide icons, direct Lucide usage, and custom SVG icons in Mondave.',
      },
    },
  },
  argTypes: {
    icon: {
      description: 'Lucide icon component reference.',
      control: false,
    },
    size: {
      description: 'Preset size token or custom pixel value.',
      control: 'select',
      options: ['Small', 'Medium', 'Large'],
      table: { defaultValue: { summary: 'Medium' } },
    },
    color: {
      description: 'Semantic color mapped to Mondave tokens.',
      control: 'select',
      options: [
        'primary',
        'secondary',
        'on-primary',
        'disabled',
        'negative',
        'positive',
        'warning',
        'current',
      ],
      table: { defaultValue: { summary: 'secondary' } },
    },
    label: {
      description: 'Accessible name when the icon conveys meaning on its own.',
      control: 'text',
    },
    strokeWidth: {
      description: 'Lucide stroke width.',
      control: { type: 'number', min: 1, max: 3, step: 0.5 },
      table: { defaultValue: { summary: '2' } },
    },
    onClick: {
      description: 'When provided, renders an interactive icon button.',
      control: false,
    },
  },
  args: {
    icon: Settings,
    size: 'Medium',
    color: 'secondary',
    label: 'Settings',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Overview',
};

export const Lucide: Story = {
  name: 'Lucide',
  render: () => <Icon icon={Settings} size={16} label="Settings" />,
};

export const CustomSvg: Story = {
  name: 'Custom SVG',
  render: () => (
    <span
      style={{
        display: 'inline-flex',
        width: 20,
        height: 20,
        color: 'var(--primary-color)',
      }}
      role="img"
      aria-label="Custom mark"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 2l2.2 6.8H19l-5.6 4.1 2.2 6.8L10 15.6 4.4 19.7l2.2-6.8L1 8.8h6.8L10 2z" />
      </svg>
    </span>
  ),
};

export const Color: Story = {
  render: () => (
    <div style={{ color: 'var(--primary-color)' }}>
      <Icon icon={Settings} size={16} color="current" label="Settings" />
    </div>
  ),
};

export const IconsListStory: Story = {
  name: 'Icons List',
  parameters: { layout: 'padded' },
  render: () => <IconIconsList />,
};
