// eslint-disable-next-line @typescript-eslint/no-var-requires
const PresetEnv = require('postcss-preset-env')
module.exports = {
	plugins: [
		PresetEnv({
			features: {
				'nesting-rules': true
			},
			stage: 0,
			autoprefixer: {
				cascade: false,
				grid: 'autoplace'
			},
			browsers: 'last 2 versions'
		})
	]
}
