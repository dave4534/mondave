import type { Decorator } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const pageStyle: React.CSSProperties = {
  padding: 'var(--space-24)',
  maxWidth: 480,
  width: '100%',
}

const dialogPageStyle: React.CSSProperties = {
  padding: 'var(--space-24)',
  minHeight: 320,
  width: '100%',
  maxWidth: 640,
  position: 'relative',
}

function PageShell({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...pageStyle, ...style }}>
      <h2 style={{ margin: '0 0 var(--space-8)', fontSize: 18 }}>Example page</h2>
      <p style={{ margin: '0 0 var(--space-24)', color: 'var(--secondary-text-color)', fontSize: 14 }}>
        Component shown in a realistic layout context.
      </p>
      {children}
    </div>
  )
}

/** Form-style page for inputs and fields */
export const FormPageDecorator: Decorator = (Story) => (
  <PageShell>
    <Story />
  </PageShell>
)

/** Dialog / overlay context for modals, dropdowns, comboboxes */
export const DialogPageDecorator: Decorator = (Story) => (
  <div style={dialogPageStyle}>
    <Story />
  </div>
)

/** Toolbar strip for compact controls */
export const ToolbarPageDecorator: Decorator = (Story) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      padding: 'var(--space-12) var(--space-16)',
      borderBottom: '1px solid var(--ui-border-color)',
      width: '100%',
    }}
  >
    <Story />
  </div>
)
