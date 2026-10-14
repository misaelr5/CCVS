import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:4322', headless: true },
  webServer: { command: 'npm run preview -- --port 4322', url: 'http://127.0.0.1:4322', reuseExistingServer: true, timeout: 30000 },
});
