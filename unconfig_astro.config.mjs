
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import sitemap from '@astrojs/sitemap'

import critters from 'astro-critters'
import compress from 'astro-compress'

import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
const UnoCSS = __unconfig_stub;

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
//import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
import image from '@astrojs/image'

// https://astro.build/config
const __unconfig_default =  defineConfig({
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

if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;