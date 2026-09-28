import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiStepIndicator } from './MultiStepIndicator';

const meta = {
  title: 'Components/MultiStepIndicator',
  component: MultiStepIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabular navigation component that helps users visualize and interact with a multi-step process.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Regular', 'Compact'] },
    type: { control: 'select', options: ['Primary', 'Success', 'Negative', 'Dark'] },
    orientation: { control: 'select', options: ['Vertical', 'Horizontal'] },
    currentStep: { control: { type: 'number', min: 1, max: 5 } },
  },
  args: {
    size: 'Regular',
    type: 'Primary',
    orientation: 'Horizontal',
    currentStep: 2,
  },
} satisfies Meta<typeof MultiStepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StepThree: Story = {
  args: { currentStep: 3 },
};

export const Vertical: Story = {
  args: { orientation: 'Vertical', currentStep: 2 },
};

export const Compact: Story = {
  args: { size: 'Compact', currentStep: 4 },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      {(['Primary', 'Success', 'Negative', 'Dark'] as const).map((type) => (
        <MultiStepIndicator key={type} type={type} currentStep={3} />
      ))}
    </div>
  ),
};