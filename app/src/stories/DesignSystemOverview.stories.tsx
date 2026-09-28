import type { Meta, StoryObj } from '@storybook/react-vite';
import catalog from '../figma/component-catalog.json';

function ComponentCatalog() {
  return (
    <div style={{ padding: 'var(--space-24)', maxWidth: 960 }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Mondave Design System</h1>
      <p style={{ color: 'var(--secondary-text-color)', marginBottom: 'var(--space-24)' }}>
        {catalog.length} public Figma component sets · Storybook implementations in Components/
      </p>
      <h2 style={{ fontSize: 16, marginBottom: 'var(--space-12)' }}>Component sets</h2>
      <ul style={{ columns: 2, gap: 'var(--space-16)', margin: 0, paddingLeft: 'var(--space-20)' }}>
        {catalog.map((c) => (
          <li key={c.nodeId} style={{ marginBottom: 'var(--space-4)' }}>
            {c.folder}
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'Design System/Overview',
  component: ComponentCatalog,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ComponentCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {};
