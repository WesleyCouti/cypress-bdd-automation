import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,

  viewportWidth: 1440,
  viewportHeight: 900,

  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,

  retries: {
    runMode: process.env.CI ? 2 : 1,
    openMode: 0
  },

  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

  e2e: {
    baseUrl:
      process.env.BASE_URL ??
      'https://www.saucedemo.com',

    specPattern: 'cypress/e2e/**/*.feature',

    supportFile: 'cypress/support/e2e.ts',

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [
            createEsbuildPlugin(config)
          ]
        })
      );

      return config;
    }
  }
});
