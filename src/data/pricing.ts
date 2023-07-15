/**
 * Interface pour les options de tarification
 * @interface
 */
interface PricingOption {
	/** Nom of the massage provided */
	name: string
	/** Prix de l'option (peut être un nombre ou une chaîne) could be a range also */
	price: number | string
	/** Description de l'option */
	description: string
	/** Image de l'option (facultatif) */
	img?: string
}

/**
 * Interface pour les types de services
 * @interface
 */
export interface ServiceType {
	/** Titre du service */
	title: string
	/** ID Used to enable the mdx file to select which category to display under their page */
	id: 1 | 2 | 3
	/** Tableau des options de tarification pour le service */
	pricing: PricingOption[]
}

/**
 * Liste des services disponibles
 * @type {ServiceType[]}
 */
export const list: ServiceType[] = [
	{
		title: 'Massage du visage',
		id: 1,
		pricing: [
			{
				name: 'Kobido',
				price: '130/190',
				description:
					'1H/1H30 Le soin contribue à la régénération des cellules de la peau ainsi que des tissus en profondeur'
			},
			{
				name: 'Chiromassage',
				price: 130,
				description:
					'1H Rajeunit et guérit la peau, améliore également l’état émotionnel et et harmonise le corps.'
			},
			{
				name: 'Facelift',
				price: '130/190',
				description:
					'1H/1H30 Combinaison des techniques -Kobido avec les techniques chinoises ( Guasha, Tuina, Acupression)'
			},
			{
				name: 'Massage du visage abonnement',
				price: 575,
				description: '5 seances 1h de massage de votre choix par seances'
			},
			{
				name: '	Massage du visage abonnement',
				price: 1100,
				description: '10 seances 1h de massage de votre choix par seances'
			}
		]
	},
	{
		title: 'Ostéoplastie du visage et de corps',
		id: 2,
		pricing: [
			{
				name: 'Ostéoplastie du visage et de corps',
				price: 150,
				description: '1H'
			},
			{
				name: 'Ostéoplastie + Massage du visage',
				price: 170,
				description: '1H'
			},
			{
				name: 'Ostéoplastie abonnement',
				price: 650,
				description:
					'5 seances 1H d’osteoplastie du visage ou de corps , soit l’ensemble par seance'
			},
			{
				name: 'Ostéoplastie abonnement',
				price: 1150,
				description:
					'10 seances 1H d’osteoplastie du visage ou de corps , soit l’ensemble par seance'
			}
		]
	},
	{
		title: 'Déplacement à domicile',
		id: 3,
		pricing: [
			{
				name: 'Massage du visage',
				price: 200,
				description:
					'Déplacement à domicile est possible si client pocede une table de massage 1H15 par seance'
			},
			{
				name: 'Ostéoplastie du visage et de corps',
				price: 200,
				description:
					'Deplacement a domicile est possible si client pocede une table de massage 1H15 par seance'
			}
		]
	}
]
