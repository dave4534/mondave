import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Mondave Design System',
    brandUrl: './?path=/docs/design-system-introduction--docs',
    // No brandImage — Storybook replaces the title text with the image when set.
    fontBase: '"Figtree", system-ui, sans-serif',
  }),
})
