import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell } from 'lucide-react';
import { Accordion } from './Accordion';

const sampleItems = [
  { id: '1', title: 'Notifications', content: 'Manage how you receive notifications across channels.' },
  { id: '2', title: 'Privacy', content: 'Control who can see your profile and activity.' },
  { id: '3', title: 'Integrations', content: 'Connect third-party tools to your workspace.' },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  args: {
    items: sampleItems,
    defaultExpanded: ['1'],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    showItemIcon: true,
    items: sampleItems.map((item) => ({ ...item, icon: <Bell size={16} /> })),
  },
};
