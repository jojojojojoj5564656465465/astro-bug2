import sitemap from '@astrojs/sitemap'

import critters from 'astro-critters'
import compress from 'astro-compress'

import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
//import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
	server: {
		host: '0.0.0.0'
	},
	site: 'https://massage-kobido-lifting.com/',

	integrations: [
		UnoCSS({
			injectReset: true // or a path to the reset file
		}),
		critters(),
		sitemap(),
		compress(),
		robotsTxt(),
		mdx({ commonmark: true }),
		image({
			serviceEntryPoint: '@astrojs/image/sharp'
		})
	]

	//output: 'server',
	//adapter: cloudflare()
})
