import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetWind,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import fs from 'node:fs/promises'
import { string } from 'astro/zod'
import type { Before, Category } from 'src/types.ts'
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
      },
      collections: {
        'i-': async (iconName) => {
          return await fetch(`src/icons/${iconName}.svg`).then((res) => {
            return res.text()
          })
        }
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
      /^flex\|([0-9])\|([0-9])\|?([a-z0-9%]{2,})?$/,
      (match) => {
        let [, grow, shrink, basis] = match as [unknown, number, number, string]
        if (Number(basis) && !basis.includes('%')) {
          basis &&= `${Number(basis) / 4}rem`
        }
        basis ??= 'auto'
        return {
          flex: `${grow} ${shrink} ${basis}`
        }
      }
    ],
    [
      /^flex-(row|col)-([1-9])$/,
      (match) => {
        const [, direction, number] = match as [unknown, 'row' | 'col', number]
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

        const columORrow: 'column' | 'row' =
          direction === 'row' ? 'row' : 'column'

        const [justify, align] = positions[number as keyof typeof positions]

        return {
          display: 'flex',
          'flex-direction': columORrow,
          'justify-content': justify,
          'align-items': align
        }
      },
      { autocomplete: 'flex-(col|row)-(1|2|3|4|5|6|7|8|9)' }
    ],

    [
      /^(p|m)-(\d+)-(\d+)?-?(\d+|auto)?-?(\d+|auto)?$/,
      (match) => {
        let [, PaddingOrMargin, t, r, b, l] = match as [
          unknown,
          'p' | 'm',
          number,
          number,
          number | 'auto',
          number | 'auto'
        ]
        const isPadding = PaddingOrMargin === 'm' ? false : (true as boolean)
        const List: string[] = []
        for (const e of [t, r, b, l].filter(Boolean)) {
          if (!e || e === 'auto') {
            List.push('auto')
          } else List.push(`${Number(e) / 4}em`)
        }
        return isPadding
          ? { padding: List.join(' ') }
          : { margin: List.join(' ') }
      },
      { autocomplete: 'p|m-<num>-<num>-<num>-<num>' }
    ],
    [
      /^(px|py|mx|my)-(\d+)-?(\d+)?$/,
      (match) => {
        const [, direction, s, optional] = match as [
          unknown,
          'px' | 'py' | 'mx' | 'my',
          number,
          number
        ]
        const combination = {
          px: 'padding-inline',
          py: 'padding-block',
          mx: 'margin-inline',
          my: 'margin-block'
        } as const satisfies Record<typeof direction, string>

        const returndirection = combination[direction]

        let value = `${Number(s) / 4}em`
        value += optional ? ` ${+optional / 4}em` : ''
        return { [returndirection]: value }
      },
      { autocomplete: 'px|py|mx|my-<num>-<num>' }
    ],
    [
      /^size-(\d+)$/,
      (match) => {
        let [, s] = match as [unknown, number]
        const sizeInRem: number = s / 4
        return [
          {
            'block-size': `${sizeInRem}rem`,
            'inline-size': `${sizeInRem}rem`
          }
        ]
      },
      { autocomplete: 'size-<num>' }
    ],
    [
      /^(mx|my)-trim$/,
      (match) => {
        const [, s] = match as [unknown, 'mx' | 'my']

        interface Dictionary {
          mx: 'inline'
          my: 'block'
          fn(x: 'mx' | 'my'): 'inline' | 'block'
        }
        const dictionary: Dictionary = {
          mx: 'inline',
          my: 'block',
          fn(x) {
            return this[x]
          }
        }
        return [
          {
            'margin-trim': dictionary.fn(s)
          }
        ]
      },
      { autocomplete: 'mx|px-trim' }
    ]
  ],

  shortcuts: [
    [
      /^(font|bg|border|stroke|outline|underline|ring|divide|text)-\[(.*)\]$/,
      (match) => {
        const [, category, stringElement] = match as [
          unknown,
          (
            | 'font'
            | 'bg'
            | 'border'
            | 'stroke'
            | 'outline'
            | 'underline'
            | 'ring'
            | 'divide'
            | 'text'
          ),
          string
        ]

        const mediaQuery = ['sm', 'md', 'lg', 'xl', '2xl'] as const
        type MediaQuery = (typeof mediaQuery)[number]

        // Function to remove extra spaces and convert "|" to ","
        const removeSpaceInString = (string: string): string => {
          return string
            .trim()
            .replace(/,+/g, ' ')
            .replace(/\s+/g, ',')
            .replace(/\|/g, ',')
        }

        // Function to split the input string into a Set of individual CSS rules
        function splitString(str: string): Set<string> {
          const result: Set<string> = new Set()
          let currentElement = ''
          let parenthesesCount = true

          for (const char of removeSpaceInString(str)) {
            if (char === '[') {
              parenthesesCount = false
            } else if (char === ']') {
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
        const regex = {
          NestedValisation: new RegExp(
            '(\\w+):\\[(.+?)\\]|(\\w+):(\\w+):\\[(.+?)\\]'
          ),
          BeforeCapture: new RegExp('(.*)\\[(.*)\\]')
        }

        const customSet = new Set<string>()

        for (const value of splitString(stringElement)) {
          if (value.includes(':')) {
            const match = value.match(regex.NestedValisation)

            if (match) {
              const [, md, rest] = match
              const breakpoint = md.trim()

              for (const entry of rest.split(',')) {
                if (entry.includes(':')) {
                  const index: number = entry.lastIndexOf(':')
                  const state = entry.slice(0, index)
                  const css = entry.slice(index + 1)
                  const result = `${breakpoint}:${state}:${category}-${css.trim()}`
                  customSet.add(result)
                } else {
                  customSet.add(`${breakpoint}:${category}-${entry.trim()}`)
                }
              }
            } else {
              const index: number = value.lastIndexOf(':')
              const breakpointOrState = value.slice(0, index)
              const css = value.slice(index + 1)
              const result = `${breakpointOrState}:${category}-${css.trim()}`
              customSet.add(result.trim())
            }
          } else {
            customSet.add(`${category}-${value.trim()}`)
          }
        }

        return Array.from(customSet).join(' ')
        //text-red text-3x **hover:text-pink
      }
    ],
    {
      btn: 'focus:outline-none focus:(ring ring-offset-4 ring-4) inline m-0.25 font-semibold rounded-lg shadow-md cursor-pointer md:(p-2-4)'
    },

    [
      /^btn-(.*)$/,
      ([, color], { theme }) => {
        const defaultBtn =
          'p-3-9 active:rotate-2 font-semibold rounded-lg block border md:inline-block font-medium text-center focus:outline-none focus:ring'
        if (!color.includes('-')) {
          return `bg-${color} hover:bg-${color} focus:(rotate-1 bg-${color}) ${defaultBtn}`
        }
        const [c, d] = color.split('-')
        const e: string =
          ~~d > 500 ? (~~d - 200).toString() : (~~d + 200).toString()
        return `bg-${c}-${d} hover:bg-${c}-${e} focus:(rotate-1 bg-${c}-${e}) ${defaultBtn}`
      },
      { autocomplete: 'btn-$colors' }
    ],

    {
      container:
        'px-1 relative 2xl:px-[calc(50%-(81rem/2))] xl:(px-[calc(50%-(71rem/2))] mx-auto) box-border'
    },
    {
      'absolute-center': '-translate-1/2 left-1/2 top-1/2'
    }
  ],
  theme: {
    colors: {
      primary: 'oklch(35.46% 0.024 188.04)',
      secondary: '#3E6259',
      ternary: '#5B8266',
      text: {
        dark: '#212922',
        light: '#AEF6C7'
      }
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
      center: true
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
