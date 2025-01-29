// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [
    vue({
      template: {
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith('sl-'),
        },
      },
    })
  ]
})