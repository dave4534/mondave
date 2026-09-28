import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { DialogPageDecorator } from '../../../.storybook/decorators/PageLayouts';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Basic modal dialog with header, body slot, and footer actions.',
      },
    },
  },
  decorators: [DialogPageDecorator],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    scroll: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    open: true,
    size: 'Small',
    scroll: false,
    title: 'Modal title',
    subtitle: 'Modal subtitle, can come with icon and link.',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Modal body content goes here.</p>,
    onClose: () => undefined,
  },
};

export const Closable: Story = {
  tags: ['play-fn'],
  render: function ClosableModal() {
    const [open, setOpen] = useState(true);
    if (!open) {
      return (
        <button type="button" onClick={() => setOpen(true)}>
          Reopen modal
        </button>
      );
    }
    return (
      <Modal open={open} onClose={() => setOpen(false)} title="Closable modal">
        <p>Click Close or press Escape.</p>
      </Modal>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(canvas.getByRole('button', { name: 'Reopen modal' })).toBeInTheDocument();
  },
};

export const WithScroll: Story = {
  args: {
    scroll: true,
    onClose: () => undefined,
    children: (
      <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index} style={{ margin: 0 }}>
            Scrollable content row {index + 1}
          </p>
        ))}
      </div>
    ),
  },
};

export const Saving: Story = {
  render: function SavingModal() {
    const [saving, setSaving] = useState(false);

    return (
      <Modal
        title="Save changes?"
        subtitle="Your edits will apply to this workspace."
        onClose={() => undefined}
        primaryAction={{
          label: saving ? 'Saving…' : 'Save',
          loading: saving,
          onClick: () => {
            setSaving(true);
            window.setTimeout(() => setSaving(false), 1500);
          },
        }}
        secondaryAction={{
          label: 'Cancel',
          disabled: saving,
          onClick: () => undefined,
        }}
      >
        <p>Click Save to see the primary action enter a loading state.</p>
      </Modal>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Modal
          key={size}
          size={size}
          title={`${size} modal`}
          subtitle="Subtitle copy"
          onClose={() => undefined}
        >
          <p>Body for {size.toLowerCase()} modal.</p>
        </Modal>
      ))}
    </div>
  ),
};