interface Card {
	title: string
	description: string
	image?: Promise<typeof import('*.jpg')>
	slug: 'gua-sha' | 'le-chiromassage' | 'kobito' | 'osteoplastie'
}

export const Card: Array<Card> = [
	{
		title: 'Kobido',
		description:
			'Le massage Kobido est une méthode naturelle parmi les plus efficaces pour ralentir le processus de vieillissement de la peau et obtenir un effet liftant naturel.',
		image: import('@img/images/slider-1.jpg'),
		slug: 'kobito'
	},
	{
		title: 'Gua-Sha',
		description:
			'Le nom même de cette technique ancestrale venue d’Orient trouve son origine dans la contraction de deux hiéroglyphes: “gua” – gratter et “ sha” – mal.',
		image: import('@img/images/slider-1.jpg'),
		slug: 'gua-sha'
	},

	{
		title: 'OSTEOPLASTIE',
		description:
			'Est une technique de modelage manuel du visage et du corps pour rajeunir et corriger la tenue posturale et faciale naturellement.',
		image: import('@img/images/slider-1.jpg'),
		slug: 'osteoplastie'
	},

	{
		title: 'Le Chiromassage',
		description:
			'Il est basé sur la technique proposée au début du XXe siècle par le médecin naturopathe Ferrandis, le fondateur de l’école espagnole de massage, qui vise non seulement l’état physique, mais aussi l’état psycho-émotionnel d’une personne.',
		image: import('@img/images/slider-1.jpg'),
		slug: 'le-chiromassage'
	}
]
