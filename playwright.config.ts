import { defineConfig } from '@playwright/test';
// Tipado local de la única variable Node utilizada; no agrega @types/node al proyecto.
declare const process: { env: { CCVS_TEST_BASE_URL?: string } };
// Permite reutilizar un preview explícito sin confundirlo con un dev server en otro puerto.
const baseURL = process.env.CCVS_TEST_BASE_URL ?? 'http://127.0.0.1:4322';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  timeout: 30000,
  use: { baseURL, headless: true },
  webServer: process.env.CCVS_TEST_BASE_URL ? undefined : { command: 'npm run preview -- --port 4322', url: baseURL, reuseExistingServer: true, timeout: 30000 },
});
