const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
	output: {
		filename: 'js/[name]_[contenthash:8].js',
		path: path.resolve(__dirname, '../dist'),
		assetModuleFilename: 'img/[name]_[hash:8][ext][query]',
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					},
				],
			},
			{
				test: /\.(ts|js|tsx|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript'],
							plugins: ['@vue/babel-plugin-jsx'],
						},
					},
					// 若项目不存在vue单文件可以去掉
					{
						loader: 'ts-loader',
						options: {
							appendTsxSuffixTo: [/\.vue$/],
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new VueLoaderPlugin(),
		new ProgressBarPlugin({
			format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
				mode: 'write-references',
			},
		}),
	],
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js',
		},
	},
}
