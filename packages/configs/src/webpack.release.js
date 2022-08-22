const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const path = require('path')
module.exports = (options) => {
	return merge(baseConfig, {
		output: {
			filename: 'js/[name]_[contenthash:8].js',
			path: path.resolve(__dirname, `../../../release/${options.packageName}`),
			publicPath: './',
		},
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, './postcss.config.js'),
								},
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, './postcss.config.js'),
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name]_[contenthash:8].css',
			}),
			new Dotenv({
				path: path.resolve(__dirname, `../../../packages/${options.packageName}/.env.production`),
			}),
		],
	})
}
