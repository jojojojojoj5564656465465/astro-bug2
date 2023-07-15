import { z, defineCollection } from 'astro:content'

export const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		id: z.number(),
		description: z.string(),
		image: z.string()
	})
})

export const collections = {
	massages: postsCollection
}
