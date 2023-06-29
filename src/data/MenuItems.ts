/**
 * MENU DES URL QUI VA ETRE SUR LA HOME PAGE EN COMPONENT ET NAVBAR
 *
 * @interface menuItems
 * @typedef {menuItems}
 */
interface menuItems {
	/**
	 * NOM de la page de destitation
	 *
	 * @type {string}
	 */
	title: string
	/**
	 * url de la page de destination
	 *
	 * @type {string}
	 */
	url: string
	/**
	 * Icon dans la navbar ou bouton
	 *
	 * @type {?string}
	 */
	icon?: string
}
/**
 * Description placeholder
 *
 * @type {menuItems[]}
 */
export const MenuItems: menuItems[] = [
	{
		title: 'Kobido',
		url: '/kobido'
	},
	{
		title: 'Tarifs',
		url: '/pricing'
	},
	{
		title: 'Le Chiromassage',
		url: '/le-chiromassage'
	},
	{
		title: 'Gua-Sha',
		url: '/gua-sha'
	},
	{
		title: 'Osteoplastie',
		url: '/osteoplastie'
	},
	{
		title: 'Formation',
		url: '/formation'
	}
].filter(Boolean)
