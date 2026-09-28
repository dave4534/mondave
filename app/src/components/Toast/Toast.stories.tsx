import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['Primary', 'Negative', 'Positive', 'Warning'],
    },
  },
  args: {
    children: 'General message toast',
    type: 'Primary',
    link: { label: 'Link to action' },
    actionButton: { label: 'Button' },
    onClose: () => undefined,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Loading: Story = {
  args: { loading: true, link: undefined, actionButton: undefined },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
      <Toast type="Primary" link={{ label: 'Link to action' }} actionButton={{ label: 'Button' }} onClose={() => undefined}>
        General message toast
      </Toast>
      <Toast type="Negative" actionButton={{ label: 'Button' }} onClose={() => undefined}>
        General message toast
      </Toast>
      <Toast type="Positive" link={{ label: 'Link to action' }} actionButton={{ label: 'Button' }} onClose={() => undefined}>
        General message toast
      </Toast>
      <Toast type="Warning" link={{ label: 'Link to action' }} actionButton={{ label: 'Button' }} onClose={() => undefined}>
        General message toast
      </Toast>
    </div>
  ),
};
