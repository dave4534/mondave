import type { Meta, StoryObj } from '@storybook/react-vite';
import { Circle } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Buttons allow users take actions with a single click. Use only one primary button; remaining calls to action should use lower emphasis kinds.',
      },
    },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary', 'Brand'],
    },
    size: {
      control: 'select',
      options: ['XS', 'Small', 'Medium', 'Large'],
    },
    icon: {
      control: 'select',
      options: ['Default', 'Left', 'Right'],
    },
    loading: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    kind: 'Primary',
    size: 'Medium',
    icon: 'Default',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { kind: 'Primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { kind: 'Secondary', children: 'Secondary' },
};

export const Tertiary: Story = {
  args: { kind: 'Tertiary', children: 'Tertiary' },
};

export const Brand: Story = {
  args: { kind: 'Brand', children: 'Brand' },
};

export const AllKinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button kind="Primary">Primary</Button>
      <Button kind="Secondary">Secondary</Button>
      <Button kind="Tertiary">Tertiary</Button>
      <Button kind="Brand">Brand</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="XS">Button</Button>
      <Button size="Small">Button</Button>
      <Button size="Medium">Button</Button>
      <Button size="Large">Button</Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    icon: 'Left',
    iconElement: <Circle size={16} />,
    children: 'Button',
  },
};

export const WithRightIcon: Story = {
  args: {
    icon: 'Right',
    iconElement: <Circle size={16} />,
    children: 'Button',
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
      <Button kind="Primary" disabled>
        Primary
      </Button>
      <Button kind="Secondary" disabled>
        Secondary
      </Button>
      <Button kind="Tertiary" disabled>
        Tertiary
      </Button>
      <Button kind="Brand" disabled>
        Brand
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button kind="Primary" loading>
        Saving
      </Button>
      <Button kind="Secondary" loading>
        Saving
      </Button>
      <Button kind="Tertiary" loading>
        Saving
      </Button>
      <Button kind="Brand" loading>
        Saving
      </Button>
    </div>
  ),
};

export const MatrixKindsAndSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const kinds = ['Primary', 'Secondary', 'Tertiary', 'Brand'] as const;
    const sizes = ['XS', 'Small', 'Medium', 'Large'] as const;
    return (
      <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
            <span style={{ width: 72, color: 'var(--secondary-text-color)', fontSize: 12 }}>{size}</span>
            {kinds.map((kind) => (
              <Button key={`${kind}-${size}`} kind={kind} size={size}>
                {kind}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};