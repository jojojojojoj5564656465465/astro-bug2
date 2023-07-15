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
