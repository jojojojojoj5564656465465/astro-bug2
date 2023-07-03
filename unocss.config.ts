import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTagify,
	presetWind,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

import { Colors } from './src/data/colors.ts'

export default defineConfig({
	//extractors: [extractorSvelte],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	presets: [
		presetWind(),
		presetAttributify({ ignoreAttributes: ['block'] }),
		presetTagify(),
		presetIcons({
			cdn: 'https://esm.sh/',

			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
				height: '1.2em',
				width: '1.2em'
			}
		})
	],
	content: {
		pipeline: {
			include: [
				// the default
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				// include js/ts files
				'src/**/*.{js,ts}'
			],
			exclude: [
				'node_modules',
				'dist',
				'.git',
				'.husky',
				'.vscode',
				'public',
				'build',
				'mock',
				'./stats.html'
			]
		}
	},

	rules: [
		[
			/^family-([a-zA-Z_]*)$/,
			([, c]) => {
				c = c.replace('_', ' ')
				return {
					'font-family': `${c}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
				}
			}
		],

		[
			'text-shadow',
			{
				'text-shadow':
					'-1px -1px 1px #000, 1px -1px 1px #673b2c, -1px 1px 1px #673b2c, 1px 1px 1px #673b2c'
			}
		],
		[
			'card-box',
			{
				'box-shadow': '0 0 10px 0 #176a73',
				border: '2px solid #176a73'
			}
		],
		[
			/^flex-(row|col)-([1-9])$/,
			([, direction, number]) => {
				type PositionProps = Readonly<'start' | 'center' | 'end'>
				const positions = {
					1: ['start', 'start'],
					2: ['center', 'start'],
					3: ['end', 'start'],
					4: ['start', 'center'],
					5: ['center', 'center'],
					6: ['end', 'center'],
					7: ['start', 'end'],
					8: ['center', 'end'],
					9: ['end', 'end']
				} as const satisfies Record<
					number,
					readonly [PositionProps, PositionProps]
				>

				//IIFE ==>
				const direction2 = ((): 'row' | 'column' => {
					const d = direction as Readonly<'row' | 'col'>
					return d === 'row' ? 'row' : 'column'
				})()

				const [justify, align] =
					positions[Number(number) as keyof typeof positions]

				return {
					display: 'flex',
					'flex-direction': direction2,
					'justify-content': justify,
					'align-items': align
				}
			},
			{ autocomplete: 'flex-(col|row)-(1|2|3|4|5|6|7|8|9)' }
		],
		[
			/^p-(\d+)-(\d+)?-?(\d+|auto)?-?(\d+|auto)?$/,
			([, t, r, b, l]) => {
				const effectiveArr: string[] = [t, r, b, l].filter(Boolean)
				const paddingList: string[] = []
				for (const e of effectiveArr) {
					if (!e || e === 'auto') {
						paddingList.push('auto')
					} else paddingList.push(`${Number(e) / 4}rem`)
				}
				return { padding: paddingList.join(' ') }
			},
			{ autocomplete: 'p-<num>-<num>-<num>-<num>' }
		],
		[
			/^m-(\d+)-(\d+)?-?(\d+|auto)?-?(\d+|auto)?$/,
			([, t, r, b, l]) => {
				const effectiveArr: string[] = [t, r, b, l].filter(Boolean)
				const marginList: string[] = []
				for (const e of effectiveArr) {
					if (!e || e === 'auto') {
						marginList.push('auto')
					} else marginList.push(`${Number(e) / 4}rem`)
				}
				return { margin: marginList.join(' ') }
			},
			{ autocomplete: 'm-<num>-<num>-<num>-<num>' }
		]
	],
	shortcuts: [
		[
			/^(font|bg|border|stroke|outline|ring|divide|text)-\[(.*)\]$/,
			([, category, stringElement]) => {
				type Category =
					| 'font'
					| 'bg'
					| 'border'
					| 'stroke'
					| 'outline'
					| 'text'
					| 'ring'
					| 'divide'
				type MediaQuery = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
				const categories: readonly Category[] = [
					'font',
					'bg',
					'border',
					'stroke',
					'outline',
					'text',
					'ring',
					'divide'
				]
				const mediaQuery: readonly MediaQuery[] = [
					'sm',
					'md',
					'lg',
					'xl',
					'2xl'
				]
				const rulesForBrakets: Record<string, string> = {
					open: '[',
					close: ']'
				}

				if (!categories.includes(category as Category)) {
					throw new Error(`category in not in unocss list config=> ${category}`)
				}

				function splitString(str: string): Set<string> {
					const result = new Set<string>()
					let currentElement = ''
					let parenthesesCount = true
					for (const char of str) {
						if (char === rulesForBrakets.open) {
							parenthesesCount = false
						} else if (char === rulesForBrakets.close) {
							parenthesesCount = true
						}
						if (char === ',' && parenthesesCount === true) {
							result.add(currentElement.toLowerCase().trim())
							currentElement = ''
						} else {
							currentElement += char.trim()
						}
					}
					if (currentElement.trim() !== '') {
						result.add(currentElement.toLowerCase().trim())
					}
					return result
				}

				const arraySet = splitString(stringElement)

				const regexAtribuffy = new RegExp(
					`([^:]+):\\${rulesForBrakets.open}([^\\]]+)\\${rulesForBrakets.close}$`
				)
				const mycustomSet = new Set<string>()

				for (const v of arraySet) {
					if (v.includes(':')) {
						if (v.match(regexAtribuffy)) {
							const match = v.match(regexAtribuffy)

							if (match) {
								const [, md, rest] = match
								if (!mediaQuery.includes(md as MediaQuery)) {
									throw new Error('bad media querie')
								}
								const [breakpoint] = md.trim().split(':')

								for (const e of rest.split(',')) {
									if (e.includes(':')) {
										const index: number = e.lastIndexOf(':')
										const state = e.slice(0, index)
										const css = e.slice(index + 1)
										const result = `${breakpoint}:${state}:${category}-${css.trim()}`
										mycustomSet.add(result)
									} else {
										mycustomSet.add(`${breakpoint}:${category}-${e.trim()}`)
									}
								}
							}
						} else {
							const index = v.lastIndexOf(':')
							const breakpointORstate = v.slice(0, index)
							const css = v.slice(index + 1)
							const value = `${breakpointORstate}:${category}-${css.trim()}`
							mycustomSet.add(value.trim())
						}
					} else {
						mycustomSet.add(`${category}-${v.trim()}`)
					}
				}
				return Array.from(mycustomSet).join(' ')
			}
		],
		{
			btn: 'focus:outline-none focus:(ring ring-offset-4 ring-4) inline m-0.25 font-semibold rounded-lg shadow-md cursor-pointer md:(p-2-4)'
		},

		[
			/^btn-(.*)$/,
			([, color]) => {
				const defaultBtn =
					'p-3-9 active:rotate-2 font-semibold rounded-lg block border md:inline-block font-medium text-center focus:outline-none focus:ring'
				if (color.indexOf('-') === -1) {
					return `bg-${color} hover:bg-${color} focus:(rotate-1 bg-${color}) ${defaultBtn}`
				} else {
					const [c, d] = color.split('-')
					const e: string =
						~~d > 500 ? (~~d - 200).toString() : (~~d + 200).toString()
					return `bg-${c}-${d} hover:bg-${c}-${e} focus:(rotate-1 bg-${c}-${e}) ${defaultBtn}`
				}
			},
			{ autocomplete: 'btn-$colors' }
		],

		{
			container:
				'px-1 relative 2xl:px-[calc(50%-(81rem/2))] xl:(px-[calc(50%-(71rem/2))] mx-auto) box-border'
		},
		{
			'absolute-center': '-translate-1/2 left-1/2 top-1/2'
		},
		[/^size-(\d)$/, ([, s]) => `h-${s} w-${s}`, { autocomplete: 'size-<num>' }]
	],
	theme: {
		colors: {
			primary: 'oklch(35.46% 0.024 188.04)',
			secondary: '#3E6259',
			ternary: '#5B8266',
			text: {
				dark: '#212922',
				light: '#AEF6C7'
			},

			bg: Colors.secondary,
			bgstrong: 'oklch(26.08% 0.017 183.63)',
			calltoaction: Colors.calltoaction,
			textwhite: '#FFFFFF',
			yell: Colors.yellow
		},

		fontFamily: {
			primary: 'playfair-display',
			secondary: 'Yrsa',
			ternary: 'hind guntur',
			title: 'Sunlight'
		},
		fontSize: {
			cqi: ['clamp(0.60rem, .65cqi, .9cqi)', '1'],
			xs: ['clamp(0.78rem, calc(0.77rem + 0.03vw), 0.80rem)', '1'],
			sm: ['clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem)', '1'],
			base: ['clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem)', '1'],
			md: ['clamp(1.35rem, calc(1.28rem + 0.37vw), 1.56rem)', '1'],
			lg: ['clamp(1.62rem, calc(1.50rem + 0.58vw), 1.95rem)', '1'],
			xl: ['clamp(1.94rem, calc(1.77rem + 0.87vw), 2.44rem)', '1'],
			'2xl': ['clamp(2.33rem, calc(2.08rem + 1.25vw), 3.05rem)', '1'],
			'3xl': ['clamp(2.80rem, calc(2.45rem + 1.77vw), 3.82rem)', '1'],
			'4xl': ['clamp(3.36rem, calc(2.87rem + 2.45vw), 4.77rem)', '1'],
			'5xl': ['clamp(4.03rem, calc(3.36rem + 3.36vw), 5.96rem)', '1'],
			'6xl': ['clamp(4.84rem, calc(3.93rem + 4.54vw), 7.45rem)', '1']
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		breakpoints: {
			xs: '280px',
			sm: '480px',
			md: '720px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1680px'
		},
		aspectRatio: {
			'4/3': '4 / 3',
			'1/3': '1 / 3',
			'1/2': '1 / 2'
		}
	},

	safelist: 'dark light prose prose-sm m-auto text-left'.split(' ')
})
