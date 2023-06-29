// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Marina Li Masseuse Pro'
export const SITE_DESCRIPTION = 'Masseuse Russe à Paris'

import type { MarkdownInstance } from 'astro'

export interface Frontmatter {
	draft?: boolean
	title: NonNullable<string>
	description?: string
	author?: string
	publishDate: string
	coverSVG?: string
	coverImage?: string
	socialImage?: string
	categories?: string[]
	tags?: string[]
	file?: string
	url?: string
	minutesRead?: string
	extra?: string[]
	section?: string[]
}

export interface TagType {
	tag: string
	count: number
	pages: MarkdownInstance<Frontmatter>[]
}
export type SocialItem = Record<'name' | 'link' | 'icon', string>

type Social = SocialItem[][]

interface SiteMetadata {
	title: string
	description: string
	author: {
		name: string
		twitter: string
		url: string
		email: string
		summary: string
		age: number
	}
	org: {
		name: string
		twitter: string
		url: string
		email: string
		summary: string
	}
	location: string
	latlng: [number, number]
	repository: string
	social: Social
	buildTime: string
}

export const SiteMetadata: SiteMetadata = {
	title: 'Marina Li',
	description: 'Masseuse russe à Paris.',
	author: {
		name: 'Jonathan HAYAT',
		twitter: '@chris1tham',
		url: 'https://christham.net',
		email: 'jonathan.hayat@gmail.com',
		summary: 'Developper engagé pour un bon référencement',
		age: 35
	},
	org: {
		name: 'Hello Tham',
		twitter: '@hellothamcom',
		url: 'https://hellotham.com',
		email: 'info@hellotham.com',
		summary:
			'Hello Tham is a boutique management consulting firm. We specialise in Business and IT strategies, operating models, strategic roadmaps, enterprise architecture, analytics and business process design.'
	},
	location: 'Rivendell, Middle Earth',
	latlng: [-33.86785, 151.20732],
	repository: 'https://github.com/hellotham/hello-astro',
	social: [
		[
			{
				name: 'Email',
				link: 'mailto:info@hellothamcom',
				icon: 'ic:baseline-mail'
			},
			{
				name: 'Télephone',
				link: '06 25 29 33 84',
				icon: 'ic:baseline-phone'
			}
		],
		[
			{
				name: 'Facebook',
				link: 'https://www.facebook.com/massagekobidoparis',
				icon: 'ic:baseline-facebook'
			},
			{
				name: 'Instagram',
				link: 'https://www.instagram.com/w.lasourcedejeunesse/',
				icon: 'ph:instagram-logo'
			},
			{
				name: 'Youtube',
				link: 'https://www.youtube.com/channel/UCVjcOUc_MDHj9szt9DUMFLw',
				icon: 'ph:youtube-logo'
			},
			{
				name: 'Google Maps',
				link: 'https://www.google.com/maps/place/Marina+Li+-+Kobido+Facial+Massage,+Guasha,+MTC-Facelift/@48.8557772,2.3628876,15z/data=!4m6!3m5!1s0x47e671e48cbad06d:0x3b622cc28acb38ee!8m2!3d48.8557772!4d2.3628876!16s%2Fg%2F11smzkmbxy',
				icon: 'mdi:google-my-business'
			}
		]
	],
	buildTime: new Date().toString()
}

export const Logo = '../svg/astro/logomark-light.svg'
export const LogoImage = '../images/astro/full-logo-light.png'
export const FeaturedSVG = '../svg/undraw/undraw_design_inspiration.svg'
export const DefaultSVG = '../svg/undraw/undraw_my_feed.svg'
export const DefaultImage = '../images/undraw/undraw_my_feed.png'

export const NavigationLinks = [
	{ name: 'Home', href: '' },
	{ name: 'About', href: 'about' },
	{ name: 'Contact', href: 'contact' },
	{ name: 'Blog', href: 'blog' },
	{ name: 'Docs', href: 'doc/introduction' },
	{ name: 'test', href: 'doc/test' }
]

export const CategoryDetail = [
	{
		category: 'instructions',
		coverSVG: '../svg/undraw/undraw_instruction_manual.svg',
		socialImage: '../images/undraw/undraw_instruction_manual.png',
		description: 'Guidelines on using this starter.'
	},
	{
		category: 'information',
		coverSVG: '../svg/undraw/undraw_instant_information.svg',
		socialImage: '../images/undraw/undraw_instant_information.png',
		description: 'Information articles.'
	}
]

export function categoryDetail(category: string | undefined) {
	const details = CategoryDetail.filter((cat) => cat.category === category)

	if (details.length === 1) {
		return details[0]
	}
	return {
		category: 'General',
		coverSVG: '../svg/undraw/undraw_instant_information.svg',
		socialImage: '../images/undraw/undraw_instant_information.png',
		description: `Category ${category}`
	}
}
export const AuthorDetail = [
	{
		name: 'Chris Tham',
		description: 'Hello World',
		contact: 'chris@christham.net',
		image: '../images/authors/Chris Tham.jpg'
	}
]

export const DefaultAuthor = {
	name: 'Hello Astro',
	image: '../images/authors/default.png',
	contact: 'info@hellotham.com',
	description: 'Astronaut'
}

export function authorDetail(author: string | undefined) {
	const details = AuthorDetail.filter((person) => person.name === author)

	if (details.length === 1) {
		return details[0]
	}
	return DefaultAuthor
}

export const PAGE_SIZE = 6

export const COMMUNITY_INVITE_URL = 'https://astro.build/chat'

export type Sidebar = Record<string, { text: string; link: string }[]>

export const SIDEBAR: Sidebar = {
	'Section Header': [
		{ text: 'Introduction', link: 'doc/introduction' },
		{ text: 'Page 2', link: 'doc/page-2' },
		{ text: 'Page 3', link: 'doc/page-3' }
	],
	'Another Section': [{ text: 'Page 4', link: 'doc/page-4' }]
}
