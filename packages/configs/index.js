const { merge } = require('webpack-merge')

function filterConfigs(argv) {
	if (argv.mode !== 'production') {
		return require('./src/webpack.start')
	}
	return require(`./src/webpack.${argv.name}`)
}

module.exports = function (env, argv, options) {
	const configs = filterConfigs(argv)
	return merge(
		configs({
			packageName: options.packageName,
		}),
		options.configureWebpack
	)
}
