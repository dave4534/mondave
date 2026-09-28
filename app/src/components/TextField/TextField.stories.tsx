import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FormPageDecorator } from '../../../.storybook/decorators/PageLayouts';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  decorators: [FormPageDecorator],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled', 'readonly'],
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder text here',
    helperText: 'Information text',
    showHelper: true,
    showIconRight: true,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['play-fn'],
  args: { size: 'Large' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Label' });
    await userEvent.type(input, 'Hello');
    await expect(input).toHaveValue('Hello');
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      <TextField size="Small" label="Small" />
      <TextField size="Medium" label="Medium" />
      <TextField size="Large" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      <TextField state="default" label="Default" />
      <TextField state="error" label="Error" helperText="Something went wrong" />
      <TextField state="success" label="Success" helperText="Looks good" />
      <TextField state="disabled" label="Disabled" />
      <TextField state="readonly" label="Read only" value="Read only value" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: { label: undefined, showHelper: false },
};

export const WithCharacterLimit: Story = {
  args: { showCharacterLimit: true, characterLimit: '12/200' },
};
