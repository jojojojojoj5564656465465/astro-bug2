/** @type {import("@types/stylelint").Options} */
module.exports = {
	extends: ['stylelint-config-html/astro', 'stylelint-config-recommended'],
	plugins: [
		/* 	"stylelint-scss", */
	],
	overrides: [
		{
			files: ['**/*.{astro,html}'],
			customSyntax: 'postcss-html'
		},
		{
			files: ['src/**/*.{scss,css}'],
			customSyntax: 'postcss-scss'
		}
	],
	ignoreFiles: [
		'**/*.js',
		'coverage/**/*',
		'cypress-coverage/**/*',
		'jest-coverage/**/*',
		'node_modules/**/*'
	],
	rules: {
		'selector-nested-pattern': '^&',
		'at-rule-no-unknown': null,
		'declaration-property-value-no-unknown': true,
		'no-duplicate-selectors': true,
		'color-no-hex': true,
		'no-descending-specificity': true,
		'no-duplicate-selectors': true,
		'selector-pseudo-class-no-unknown': [
			true,
			{ ignorePseudoClasses: ['global', 'nth-last-col'] }
		]
	},
	ignoreFiles: ['node_modules/*'],
	defaultSeverity: 'warning'
}
