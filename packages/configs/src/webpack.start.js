const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = (options) => {
	return merge(baseConfig, {
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
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
				{
					test: /\.less$/,
					use: [
						'style-loader',
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
			],
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new Dotenv({
				path: path.resolve(__dirname, `../../../packages/${options.packageName}/.env`),
			}),
		],
		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			historyApiFallback: true,
			allowedHosts: 'all',
			proxy: {
				'/api': {
					target: '',
					changeOrigin: true,
				},
			},
		},
	})
}
