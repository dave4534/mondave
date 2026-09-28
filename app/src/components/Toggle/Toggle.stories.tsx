import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggles let users switch a setting on or off.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Medium', 'Small'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showLeftLabel: { control: 'boolean' },
    showRightLabel: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'Medium',
    showLeftLabel: true,
    showRightLabel: true,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-24)', alignItems: 'center' }}>
      <Toggle size="Small" checked />
      <Toggle size="Medium" checked />
    </div>
  ),
};

export const Interactive: Story = {
  tags: ['play-fn'],
  render: function InteractiveToggle() {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  },
};

export const WithoutLabels: Story = {
  args: {
    showLeftLabel: false,
    showRightLabel: false,
    checked: true,
  },
};
