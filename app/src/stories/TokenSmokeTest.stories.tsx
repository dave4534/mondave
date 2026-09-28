import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Proves spacing + color tokens resolve in Storybook.
 * If the spacing box has sharp corners or no padding, data-theme is missing.
 */
function TokenSmokeTest() {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-24)', maxWidth: 480 }}>
      <section>
        <h2 style={{ fontSize: 14, marginBottom: 'var(--space-8)' }}>Spacing tokens</h2>
        <div
          style={{
            background: 'var(--primary-highlighted-color)',
            border: '1px solid var(--ui-border-color)',
            borderRadius: 'var(--space-4)',
            padding: 'var(--space-16)',
            color: 'var(--primary-text-color)',
          }}
        >
          border-radius: var(--space-4) · padding: var(--space-16)
        </div>
        <p style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 'var(--space-8)' }}>
          Sharp corners or tight text = spacing mode not active.
        </p>
      </section>
      <section>
        <h2 style={{ fontSize: 14, marginBottom: 'var(--space-8)' }}>Color tokens</h2>
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          <div
            style={{
              background: 'var(--primary-color)',
              color: 'var(--text-color-on-primary)',
              padding: 'var(--space-8) var(--space-16)',
              borderRadius: 'var(--space-4)',
            }}
          >
            Primary
          </div>
          <div
            style={{
              border: '1px solid var(--ui-border-color)',
              color: 'var(--primary-text-color)',
              padding: 'var(--space-8) var(--space-16)',
              borderRadius: 'var(--space-4)',
            }}
          >
            Border
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Design System/Token Smoke Test',
  component: TokenSmokeTest,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TokenSmokeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
