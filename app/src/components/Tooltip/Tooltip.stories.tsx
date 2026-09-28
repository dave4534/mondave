import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    arrowPosition: { control: 'select', options: ['Top', 'Bottom', 'Left', 'Right'] },
    widthMode: { control: 'select', options: ['max', 'custom'] },
    children: { control: false },
  },
  args: {
    content: 'Tooltip label',
    arrowPosition: 'Bottom',
    children: <span />,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button kind="Secondary" size="Small">
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const WithTitle: Story = {
  render: (args) => (
    <Tooltip {...args} showTitle title="Tooltip title">
      <Button kind="Secondary" size="Small">
        With title
      </Button>
    </Tooltip>
  ),
};

export const ArrowPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-48)', padding: 'var(--space-80)' }}>
      {(['Top', 'Bottom', 'Left', 'Right'] as const).map((position) => (
        <Tooltip key={position} arrowPosition={position} content={`Arrow ${position}`}>
          <Button kind="Tertiary" size="Small">
            {position}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
