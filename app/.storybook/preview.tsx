import type { Preview } from '@storybook/react-vite'
import { useEffect, type ReactNode } from 'react'
import '../src/styles/generated/tokens.css'
import '../src/styles/generated/typography.css'
import './preview.css'

export type ColorMode = 'light' | 'dark' | 'black'
export type SpacingMode = 'mode-1'

interface TokenStoryShellProps {
  children: ReactNode
  colorMode?: ColorMode
  spacingMode?: SpacingMode
}

export function TokenStoryShell({
  children,
  colorMode = 'light',
  spacingMode = 'mode-1',
}: TokenStoryShellProps) {
  useEffect(() => {
    const { documentElement: html, body } = document

    html.removeAttribute('data-theme')
    body.removeAttribute('data-theme')
    body.classList.remove('dark')

    body.setAttribute('data-theme', spacingMode)

    if (colorMode === 'dark') {
      body.classList.add('dark')
    } else if (colorMode === 'black') {
      html.setAttribute('data-theme', 'black')
    }

    return () => {
      html.removeAttribute('data-theme')
      body.removeAttribute('data-theme')
      body.classList.remove('dark')
    }
  }, [colorMode, spacingMode])

  return (
    <div
      style={{
        fontFamily: "'Figtree', system-ui, sans-serif",
        color: 'var(--primary-text-color)',
      }}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Color theme',
      toolbar: {
        title: 'Color',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'black', title: 'Black', icon: 'circlehollow' },
        ],
        dynamicTitle: true,
      },
    },
    spacingMode: {
      description: 'Spacing token mode',
      toolbar: {
        title: 'Spacing',
        icon: 'component',
        items: [{ value: 'mode-1', title: 'Mode 1' }],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: 'light',
    spacingMode: 'mode-1',
  },
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Design System',
          [
            'Introduction',
            'Tokens',
            'Color',
            'Spacing',
            'Typography',
            'Accessibility',
            'Deprecation',
            'Overview',
            'Token Smoke Test',
            '*',
          ],
          'Components',
          ['*'],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
  decorators: [
    (Story, { globals }) => (
      <>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        />
        <TokenStoryShell
          colorMode={(globals.colorMode as ColorMode) ?? 'light'}
          spacingMode={(globals.spacingMode as SpacingMode) ?? 'mode-1'}
        >
          <Story />
        </TokenStoryShell>
      </>
    ),
  ],
}

export default preview
