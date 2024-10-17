import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://ahmarii.github.io/',
	base: process.env.NODE_ENV === 'development' ? '' : 'softdev/',
	integrations: [mdx(), sitemap()],
});
