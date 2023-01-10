import { defineConfig } from "cypress";

require("dotenv").config({ path: `.env` });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.DEV_URL = process.env.NEXTAUTH_URL;
      config.env.GOOGLE_LOGIN_EMAIL = process.env.GOOGLE_LOGIN_EMAIL;
      config.env.GOOGLE_LOGIN_PASSWORD = process.env.GOOGLE_LOGIN_PASSWORD;

      config.chromeWebSecurity = false;
      config.experimentalModifyObstructiveThirdPartyCode = true;

      return config;
    },
    chromeWebSecurity: false,
  },
});
