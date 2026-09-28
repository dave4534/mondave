import type { Meta, StoryObj } from '@storybook/react-vite';
import { Circle } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Square icon-only buttons for compact actions.',
      },
    },
  },
  argTypes: {
    kind: { control: 'select', options: ['Primary', 'Secondary', 'Tertiary'] },
    size: { control: 'select', options: ['XXS', 'XS', 'Small', 'Medium', 'Large'] },
  },
  args: {
    kind: 'Primary',
    size: 'Medium',
    'aria-label': 'Action',
    iconElement: <Circle size={16} />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { kind: 'Primary' },
};

export const Secondary: Story = {
  args: { kind: 'Secondary' },
};

export const Tertiary: Story = {
  args: { kind: 'Tertiary' },
};

export const AllKinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <IconButton kind="Primary" size="Medium" aria-label="Primary" iconElement={<Circle size={16} />} />
      <IconButton kind="Secondary" size="Medium" aria-label="Secondary" iconElement={<Circle size={16} />} />
      <IconButton kind="Tertiary" size="Medium" aria-label="Tertiary" iconElement={<Circle size={16} />} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const sizes = [
      { size: 'XXS' as const, icon: 10 },
      { size: 'XS' as const, icon: 14 },
      { size: 'Small' as const, icon: 16 },
      { size: 'Medium' as const, icon: 16 },
      { size: 'Large' as const, icon: 20 },
    ];
    return (
      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
        {sizes.map(({ size, icon }) => (
          <IconButton
            key={size}
            kind="Primary"
            size={size}
            aria-label={size}
            iconElement={<Circle size={icon} />}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
      <IconButton kind="Primary" disabled aria-label="Disabled primary" iconElement={<Circle size={16} />} />
      <IconButton kind="Secondary" disabled aria-label="Disabled secondary" iconElement={<Circle size={16} />} />
      <IconButton kind="Tertiary" disabled aria-label="Disabled tertiary" iconElement={<Circle size={16} />} />
    </div>
  ),
};