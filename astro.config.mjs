import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	site: 'https://ahmarii.github.io/',
	base: isProd ? '/softdev/' : '/',
	integrations: [mdx(), sitemap()],
});
