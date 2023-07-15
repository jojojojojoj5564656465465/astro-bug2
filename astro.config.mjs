import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import deno from "@astrojs/deno";
import critters from 'astro-critters';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import Icons from 'unplugin-icons/vite'
// https://astro.build/config
export default defineConfig({
    experimental: {
   assets: true
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },
  output: 'server',
  adapter: deno(),
  site: 'https://example.com',
  integrations: [
    robotsTxt(),
    mdx({ commonmark: true }),
    sitemap(),
    UnoCSS({
      injectReset: true
    }),
    critters(),
    compress({
      css: false,
      html: {
        removeComments: true,
        removeAttributeQuotes: false
      },
      img: false,
      js: false,
      svg: true
    })
  ],
  vite: {
    plugins: [
      Icons({
        autoInstall: true,
        compiler: 'astro'
      })
    ]
  }
})