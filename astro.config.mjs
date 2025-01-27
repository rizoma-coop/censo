// @ts-check
import { defineConfig } from 'astro/config'

import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      template: {
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith('sl-'),
        },
      },
    })
  ],
})