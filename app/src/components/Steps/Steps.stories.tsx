import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Steps } from './Steps';

const meta = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Step navigation with gallery dots or numeric counter between prev/next actions.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Gallery', 'Numbers', 'GalleryOnly'] },
    onColor: { control: 'select', options: ['On White', 'On Primary'] },
  },
  args: {
    type: 'Gallery',
    onColor: 'On White',
    currentStep: 1,
    totalSteps: 3,
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};

export const Numbers: Story = {
  args: { type: 'Numbers' },
};

export const GalleryOnly: Story = {
  args: { type: 'GalleryOnly' },
};

export const OnPrimary: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 'var(--space-24)',
          backgroundColor: 'var(--primary-color)',
          borderRadius: 'var(--space-8)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { onColor: 'On Primary' },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    return (
      <Steps
        type="Gallery"
        currentStep={step}
        totalSteps={5}
        onPrevious={() => setStep((current) => Math.max(1, current - 1))}
        onNext={() => setStep((current) => Math.min(5, current + 1))}
      />
    );
  },
};
