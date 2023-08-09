export interface MetaSEO {
	title?: string
	description?: string
	image?: string
	canonical?: string | URL
	noindex?: boolean
	nofollow?: boolean
	ogTitle?: string
	ogType?: string
}

export interface WebFontsConfig {
	provider?: 'google' | 'bunny' | 'fontshare' | 'none'
	fonts: {
		[key: string]: string | string[] | FontDefinition[]
	}
}

export interface FontDefinition {
	name: string
	weights?: string[]
	italic?: boolean
}

export type OklchString = `oklch(${number}% ${number} ${number})`
export type Oklch = {
	l: number
	c: number
	h: number
}

type StringElement = string | number | Array<string | number | Before>

export type Category =
  | 'font'
  | 'bg'
  | 'border'
  | 'stroke'
  | 'outline'
  | 'underline'
  | 'ring'
  | 'divide'
  | 'text'

export type Before =
  | 'hover'
  | 'focus'
  | 'focus-within'
  | 'focus-visible'
  | 'active'
  | 'visited'
  | 'target'
  | 'first'
  | 'last'
  | 'only'
  | 'odd'
  | 'even'
  | 'first-of-type'
  | 'last-of-type'
  | 'only-of-type'
  | 'empty'
  | 'disabled'
  | 'enabled'
  | 'checked'
  | 'indeterminate'
  | 'default'
  | 'required'
  | 'valid'
  | 'invalid'
  | 'in-range'
  | 'out-of-range'
  | 'placeholder-shown'
  | 'autofill'
  | 'read-only'
  | 'before'
  | 'after'
  | 'first-letter'
  | 'first-line'
  | 'marker'
  | 'selection'
  | 'file'
  | 'backdrop'
  | 'placeholder'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'max-sm'
  | 'max-md'
  | 'max-lg'
  | 'max-xl'
  | 'max-2xl'
  | 'dark'
  | 'portrait'
  | 'landscape'
  | 'motion-safe'
  | 'motion-reduce'
  | 'contrast-more'
  | 'contrast-less'
  | 'print'
  | 'aria-checked'
  | 'aria-disabled'
  | 'aria-expanded'
  | 'aria-hidden'
  | 'aria-pressed'
  | 'aria-readonly'
  | 'aria-required'
  | 'aria-selected'
  | 'open'

 interface MyObject {
   before?: string
   state?: string
   category?: string
   css?: string
 }