import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	site: 'https://ahmarii.github.io/',
	base: isProd ? '/softdev/' : '/',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [],
		rehypePlugins: [],
		extendDefaultPlugins: true,
		imageAbsoluteUrls: true, // Allow absolute URLs
		// Add the base path to Markdown links/images automatically
		extendMarkdown(md) {
		  const basePath = isProd ? '/softdev' : '';
		  md.renderer.rules.image = (tokens, idx) => {
			const token = tokens[idx];
			const src = token.attrs[0][1];
			return `<img src="${basePath}${src}" alt="${token.content}" />`;
		  };
		},
	},
});
