import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkboxes let users select one or more options from a set.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['regular', 'selected', 'disabled', 'indeterminate'],
    },
  },
  args: {
    label: 'Regular',
    showLabel: true,
    state: 'regular',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: { state: 'regular', label: 'Regular' },
};

export const Selected: Story = {
  args: { state: 'selected', label: 'Selected' },
};

export const Disabled: Story = {
  args: { state: 'disabled', label: 'Disabled' },
};

export const Indeterminate: Story = {
  args: { state: 'indeterminate', label: 'Indeterminate' },
};

export const WithoutLabel: Story = {
  args: { showLabel: false, state: 'regular', 'aria-label': 'Select option' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
      <Checkbox state="regular" label="Regular" />
      <Checkbox state="selected" label="Selected" />
      <Checkbox state="disabled" label="Disabled" />
      <Checkbox state="indeterminate" label="Indeterminate" />
    </div>
  ),
};

export const Interactive: Story = {
  tags: ['play-fn'],
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Accept terms"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};