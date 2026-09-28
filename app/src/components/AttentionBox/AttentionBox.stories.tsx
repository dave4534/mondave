import type { Meta, StoryObj } from '@storybook/react-vite';
import { AttentionBox } from './AttentionBox';

const bodyText =
  'This action will cause your team to lose access to the account until you will use the correct SSO source.';

const meta = {
  title: 'Components/AttentionBox',
  component: AttentionBox,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['Primary', 'Neutral', 'Positive', 'Warning', 'Negative'],
    },
  },
  args: {
    type: 'Primary',
    title: 'Attention box title',
    children: bodyText,
    link: { label: 'Read more' },
    actionButton: { label: 'Button' },
    onClose: () => undefined,
  },
} satisfies Meta<typeof AttentionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Compact: Story = {
  args: { compact: true, title: undefined },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-16)', maxWidth: 580 }}>
      {(['Primary', 'Neutral', 'Positive', 'Warning', 'Negative'] as const).map((type) => (
        <AttentionBox
          key={type}
          type={type}
          title="Attention box title"
          link={{ label: 'Read more' }}
          actionButton={{ label: 'Button' }}
          onClose={() => undefined}
        >
          {bodyText}
        </AttentionBox>
      ))}
    </div>
  ),
};
