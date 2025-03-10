import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    reportTitle: "Cypress Test Report",
    json: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on)
    },
    baseUrl: "https://unstable.dev.signalocean.com",
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    viewportWidth: 1200,
    viewportHeight: 900,
  },
})