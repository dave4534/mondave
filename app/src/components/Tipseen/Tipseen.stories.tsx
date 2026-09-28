import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tipseen } from './Tipseen';

const meta = {
  title: 'Components/Tipseen',
  component: Tipseen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tip-seen is a virtual unboxing experience that helps users get started with the system.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Inverted', 'Primary'] },
    tipPosition: { control: 'select', options: ['No', 'Bottom', 'Left', 'Right', 'Top'] },
    withImage: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
  args: {
    type: 'Inverted',
    tipPosition: 'No',
    withImage: false,
    showCloseButton: true,
    onClose: () => undefined,
    stepLabel: '1/3',
  },
} satisfies Meta<typeof Tipseen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: { withImage: true },
};

export const Primary: Story = {
  args: { type: 'Primary' },
};

export const WithTip: Story = {
  args: { tipPosition: 'Bottom' },
};

export const AllTipPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-48)',
        padding: 'var(--space-48)',
      }}
    >
      <Tipseen tipPosition="Top" onClose={() => undefined} stepLabel="1/3" />
      <Tipseen tipPosition="Right" onClose={() => undefined} stepLabel="2/3" />
      <Tipseen tipPosition="Bottom" onClose={() => undefined} stepLabel="3/3" />
      <Tipseen tipPosition="Left" onClose={() => undefined} stepLabel="1/3" />
    </div>
  ),
};