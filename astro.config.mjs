// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import netlify from '@astrojs/netlify'
import sentry from '@sentry/astro'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  integrations: [vue(), process.env.NODE_ENV === 'production' ? sentry({
    dsn: 'https://646a1ed8c1e8c353250febd5c6cd90df@o4508733140959232.ingest.de.sentry.io/4508733143842896',
    sourceMapsUploadOptions: {
      project: 'censo-rizoma',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  }) : null],
})