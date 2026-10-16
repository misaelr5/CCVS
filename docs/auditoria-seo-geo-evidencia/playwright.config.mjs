import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'../../tests',
 outputDir:'../../test-results/seo-geo-audit',
 fullyParallel:false,
 workers:1,
 timeout:30000,
 reporter:[['json',{outputFile:'e2e.json'}]],
 use:{baseURL:'http://127.0.0.1:4323',headless:true},
});
