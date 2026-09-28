import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Labels categorize or highlight short pieces of text.',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['Primary', 'Dark', 'Positive', 'Negative'] },
    kind: { control: 'select', options: ['Fill', 'Line'] },
    state: { control: 'select', options: ['Default', 'Hover', 'Active'] },
    size: { control: 'select', options: ['Medium', 'Small'] },
  },
  args: {
    children: 'Label',
    color: 'Primary',
    kind: 'Fill',
    state: 'Default',
    size: 'Medium',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const AllColorsFill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
      <Label color="Primary">Label</Label>
      <Label color="Dark">Label</Label>
      <Label color="Positive">Label</Label>
      <Label color="Negative">Label</Label>
    </div>
  ),
};

export const AllColorsLine: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
      <Label color="Primary" kind="Line">
        Label
      </Label>
      <Label color="Dark" kind="Line">
        Label
      </Label>
      <Label color="Positive" kind="Line">
        Label
      </Label>
      <Label color="Negative" kind="Line">
        Label
      </Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
      <Label state="Default">Default</Label>
      <Label state="Hover">Hover</Label>
      <Label state="Active">Active</Label>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Label size="Small">Label</Label>
      <Label size="Medium">Label</Label>
    </div>
  ),
};
