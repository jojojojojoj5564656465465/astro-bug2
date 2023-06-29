import type { OklchString, Oklch } from 'src/types.ts'

class SuperColor {
	constructor(color, strong) {
		this.color = color
		this.strong = strong
	}

	convertStringToArray() {
		const matches = this.color.match(/oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)/)

		if (!matches) {
			throw new Error('Invalid input Color format')
		} else {
			const [, l, c, h] = matches
			if (~~h >= 360) {
				throw new Error('h color > 360')
			}
			return {
				l: parseFloat(l),
				c: parseFloat(c),
				h: parseFloat(h)
			}
		}
	}
}
