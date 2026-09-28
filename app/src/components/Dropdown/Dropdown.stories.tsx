import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { DialogPageDecorator } from '../../../.storybook/decorators/PageLayouts';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
  { value: 'three', label: 'Option three' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  decorators: [DialogPageDecorator],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    state: { control: 'select', options: ['default', 'error', 'disabled', 'readonly'] },
  },
  args: {
    options,
    placeholder: 'Placeholder text here ',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['play-fn'],
  args: { size: 'Medium' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Dropdown' });
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole('option', { name: 'Option two' }));
    await expect(trigger).toHaveTextContent('Option two');
  },
};

export const Selected: Story = {
  args: { defaultValue: 'two' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const ReadOnly: Story = {
  args: { state: 'readonly', defaultValue: 'one' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
      <Dropdown state="default" options={options} aria-label="Default" />
      <Dropdown state="error" options={options} aria-label="Error" />
      <Dropdown state="disabled" options={options} aria-label="Disabled" />
      <Dropdown state="readonly" options={options} aria-label="Read only" defaultValue="two" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
      <Dropdown size="Small" options={options} />
      <Dropdown size="Medium" options={options} />
      <Dropdown size="Large" options={options} />
    </div>
  ),
};
