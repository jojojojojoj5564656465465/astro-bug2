import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
	namespace astroHTML.JSX {
		type HTMLAttributes = AttributifyAttributes
	}
}
