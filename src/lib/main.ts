import type { OklchString, Oklch } from 'src/types.ts'

export function getResolution() {
	const video = document.getElementById('background-video') as HTMLVideoElement
	return {
		width: video.videoWidth,
		height: video.videoHeight
	}
}

export const convertStringToArray = (input: OklchString): Oklch => {
	const matches = input.match(
		/oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)/
	) as RegExpMatchArray
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
export const ArrayToOklch = ({ l, c, h }: Oklch): OklchString => {
	return `oklch(${l}% ${c} ${h})`
}
