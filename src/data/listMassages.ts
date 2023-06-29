interface Card {
	title: string
	description: string
	image?: Promise<typeof import('*.jpg')>
	slug: 'gua-sha' | 'le-chiromassage' | 'kobito' | 'osteoplastie'
}
