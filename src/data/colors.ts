import type { OklchString } from 'src/types.ts'

export const Colors = {
	primary: 'oklch(84.91% 0.107 186.4)',
	secondary: 'oklch(35.46% 0.024 188.04)',
	yellow: 'oklch(84.91% 0.107 96.95)',
	calltoaction: 'oklch(75.98% 0.116 20.13)'
} as const satisfies Record<string, OklchString>
