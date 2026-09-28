import type { Meta, StoryObj } from '@storybook/react-vite';
import { Counter } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Counters display numeric values such as notification counts.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Large'] },
    color: { control: 'select', options: ['Primary', 'Negative', 'Dark', 'Light'] },
    kind: { control: 'select', options: ['Fill', 'Line'] },
  },
  args: {
    children: '5',
    size: 'Large',
    color: 'Primary',
    kind: 'Fill',
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { color: 'Primary', kind: 'Fill' },
};

export const AllColorsFill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Counter color="Primary" kind="Fill">
        5
      </Counter>
      <Counter color="Negative" kind="Fill">
        5
      </Counter>
      <Counter color="Dark" kind="Fill">
        5
      </Counter>
      <Counter color="Light" kind="Fill">
        5
      </Counter>
    </div>
  ),
};

export const AllColorsLine: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Counter color="Primary" kind="Line">
        5
      </Counter>
      <Counter color="Negative" kind="Line">
        5
      </Counter>
      <Counter color="Dark" kind="Line">
        5
      </Counter>
      <Counter color="Light" kind="Line">
        5
      </Counter>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <Counter size="Small">5</Counter>
      <Counter size="Large">5</Counter>
    </div>
  ),
};

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const colors = ['Primary', 'Negative', 'Dark', 'Light'] as const;
    const kinds = ['Fill', 'Line'] as const;
    return (
      <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
        {kinds.map((kind) => (
          <div key={kind} style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center' }}>
            <span style={{ width: 48, color: 'var(--secondary-text-color)', fontSize: 12 }}>{kind}</span>
            {colors.map((color) => (
              <Counter key={`${kind}-${color}`} color={color} kind={kind}>
                5
              </Counter>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
