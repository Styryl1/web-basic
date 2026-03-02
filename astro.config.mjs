// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tinaDirective from './astro-tina-directive/register.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://englishplumber.nl',
  adapter: cloudflare(),
  integrations: [react(), sitemap(), tinaDirective()],
});
