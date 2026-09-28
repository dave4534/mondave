import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: '1', label: 'Regular' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

const meta = {
  title: 'Components/RadioButton',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio button group with vertical or horizontal layout.',
      },
    },
  },
  argTypes: {
    positioning: { control: 'select', options: ['vertical', 'horizontal'] },
  },
  args: {
    options,
    defaultValue: '1',
    positioning: 'vertical',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { positioning: 'horizontal' },
};

export const WithError: Story = {
  args: { error: 'Radio group error' },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: '1', label: 'Regular' },
      { value: '2', label: 'Disabled', disabled: true },
      { value: '3', label: 'Option 3' },
    ],
  },
};
