import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertBanner } from './AlertBanner';

const meta = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'positive', 'negative', 'dark', 'warning'],
    },
  },
  args: {
    children: 'Alert banner message',
    type: 'primary',
    link: { label: 'this is a CTA' },
    onClose: () => undefined,
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { type: 'primary' } };

export const WithButton: Story = {
  args: {
    type: 'positive',
    actionButton: { label: 'Title' },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-8)', maxWidth: 610 }}>
      <AlertBanner type="primary" link={{ label: 'this is a CTA' }} onClose={() => undefined}>
        Alert banner message
      </AlertBanner>
      <AlertBanner type="positive" link={{ label: 'this is a CTA' }} actionButton={{ label: 'Title' }} onClose={() => undefined}>
        Alert banner message
      </AlertBanner>
      <AlertBanner type="negative" link={{ label: 'this is a CTA' }} actionButton={{ label: 'Title' }} onClose={() => undefined}>
        Alert banner message
      </AlertBanner>
      <AlertBanner type="dark" link={{ label: 'this is a CTA' }} actionButton={{ label: 'Title' }} onClose={() => undefined}>
        Alert banner message
      </AlertBanner>
      <AlertBanner type="warning" link={{ label: 'this is a CTA' }} actionButton={{ label: 'Title' }} onClose={() => undefined}>
        Alert banner message
      </AlertBanner>
    </div>
  ),
};
