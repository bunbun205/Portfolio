// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv'

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

dotenv.config({ path: '.env.local' });

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    mdx()
  ]
});