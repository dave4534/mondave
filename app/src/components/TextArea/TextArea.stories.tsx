import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Large'] },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled', 'readonly'],
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Users can type here ',
    helperText: 'Information text',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 'Large' } };

export const Small: Story = { args: { size: 'Small' } };

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      <TextArea state="default" />
      <TextArea state="error" helperText="Required field" />
      <TextArea state="success" helperText="Saved" />
      <TextArea state="disabled" />
      <TextArea state="readonly" value="Read only content" />
    </div>
  ),
};
