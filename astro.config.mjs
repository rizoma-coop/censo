// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    vue()
  ]
})