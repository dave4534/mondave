import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from './Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
  args: {
    placeholder: 'Search',
    showClearButton: true,
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 'Large' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
      <Search size="Small" />
      <Search size="Medium" />
      <Search size="Large" />
    </div>
  ),
};

export const WithValue: Story = {
  args: { defaultValue: 'Design system' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
