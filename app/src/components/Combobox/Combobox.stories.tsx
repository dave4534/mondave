import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Simplified combobox with search, list, and optional footer action.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
  args: {
    size: 'Medium',
    options,
    showFooterButton: true,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutFooter: Story = {
  args: { showFooterButton: false },
};

export const Small: Story = {
  args: { size: 'Small' },
};

export const Large: Story = {
  args: { size: 'Large' },
};
