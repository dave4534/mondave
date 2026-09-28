import type { Meta, StoryObj } from '@storybook/react-vite';

type ThemeMode = 'light' | 'dark' | 'black';

interface TokenShowcaseProps {
  theme: ThemeMode;
}

const swatches = [
  { label: 'Primary', variable: '--primary-color' },
  { label: 'Primary text', variable: '--primary-text-color' },
  { label: 'Secondary text', variable: '--secondary-text-color' },
  { label: 'UI background', variable: '--ui-background-color' },
  { label: 'Brand', variable: '--brand-color' },
  { label: 'Positive', variable: '--positive-color' },
  { label: 'Negative', variable: '--negative-color' },
  { label: 'Warning', variable: '--warning-color' },
] as const;

function TokenShowcase({ theme }: TokenShowcaseProps) {
  const themeProps =
    theme === 'dark'
      ? { className: 'dark' }
      : theme === 'black'
        ? { 'data-theme': 'black' }
        : {};

  return (
    <div
      {...themeProps}
      style={{
        background: 'var(--ui-background-color)',
        color: 'var(--primary-text-color)',
        padding: 'var(--space-24)',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: 'var(--space-16)' }}>Design tokens — {theme}</h1>
      <p style={{ color: 'var(--secondary-text-color)', marginBottom: 'var(--space-24)' }}>
        Exported from Dave&apos;s Mondave Design System via Figma Console MCP
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-16)',
        }}
      >
        {swatches.map(({ label, variable }) => (
          <div
            key={variable}
            style={{
              border: '1px solid var(--ui-border-color)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div style={{ background: `var(${variable})`, height: 64 }} />
            <div style={{ padding: 'var(--space-8)', fontSize: 12 }}>
              <div>{label}</div>
              <code>{variable}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'Design System/Tokens',
  component: TokenShowcase,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'black'] satisfies ThemeMode[],
    },
  },
} satisfies Meta<typeof TokenShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { theme: 'light' } };
export const Dark: Story = { args: { theme: 'dark' } };
export const Black: Story = { args: { theme: 'black' } };
