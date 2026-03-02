// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tinaDirective from './astro-tina-directive/register.js';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [react(), tinaDirective()],
});
