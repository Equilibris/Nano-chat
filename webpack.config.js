const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
	ProvidePlugin,
	optimize: { SplitChunksPlugin },
} = require('webpack')
const { enConfig, noConfig } = require('./i18s')
const ejs = require('ejs')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin')

const baseTemplateConfig = {
	include(templateName, data) {
		return ejs.render(
			fs.readFileSync(`./src/templates/${templateName}.ejs`).toString(),
			{
				...baseTemplateConfig,
				...data,
			}
		)
	},
}

/**
 * @type {import('webpack').Configuration }
 */
const config = {
	entry: {
		index: [
			'./src/index.ts',
			'./styles/index.scss',
			'./styles/global-styles.scss',
		],
	},

	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ejs$/i,
				loader: 'ejs-loader',
				options: {
					esModule: true,
					variable: 'data',
				},
			},
			{
				test: /\.module\.scss$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:
								process.env.NODE_ENV === 'production'
									? '[contenthash].css'
									: '[path][name].css',
						},
					},
					'sass-loader',
				],
			},
			{
				test: /(?<!\.module)\.scss$/i,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.js',
			'.scss',
			'.module.scss',
			'.ejs',
			'.html',
		],
		alias: { styles: './styles/' },
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		contentBase: './dist',
	},

	plugins: [
		(compiler) => {
			for (const name in compiler.options.entry) {
				const baseConfig = { template: `public/${name}.ejs`, chunks: [name] }

				const plugins = [
					new HtmlWebpackPlugin({
						filename: `${name}.html`,
						templateParameters: { ...baseTemplateConfig, ...enConfig },
						...baseConfig,
					}),
					new HtmlWebpackPlugin({
						filename: `no/${name}.html`,
						templateParameters: { ...baseTemplateConfig, ...noConfig },
						...baseConfig,
					}),
				]

				plugins.forEach((x) => x.apply(compiler))
			}
		},
		new CopyPlugin({ patterns: [{ from: 'static' }] }),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new ProvidePlugin({ _: 'underscore' }),
	],

	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
}
module.exports = config
