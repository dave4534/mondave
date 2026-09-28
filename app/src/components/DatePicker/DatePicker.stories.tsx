import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use as a way to pick dates from a TextField.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Default', 'Date', 'Date Range'] },
    withDialog: { control: 'boolean' },
  },
  args: {
    type: 'Date',
    withDialog: true,
    label: 'Date',
    placeholder: 'Select date',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Date: Story = {
  args: { type: 'Date' },
};

export const DateRange: Story = {
  args: { type: 'Date Range', label: 'Date range' },
};

export const DefaultField: Story = {
  args: { type: 'Default', placeholder: 'MM/DD/YYYY' },
};

export const WithoutDialog: Story = {
  args: { withDialog: false },
};