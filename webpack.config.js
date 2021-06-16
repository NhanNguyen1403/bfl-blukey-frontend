const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');


module.exports = env => {
	console.log(path.join(__dirname))
	return {
		mode: env.WEBPACK_SERVE ? 'development' : 'production',
		entry: './src/index.js',
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'index.bundle.js',
		},
		devServer: {
			port: 3000,
			watchContentBase: true,
		},
		module: {
			rules: [
				{
					test: /.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.(png|jpe?g|gif|ico)$/i,
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				},
			]
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				inject: "body",
				title: "tools",
				template: path.resolve(__dirname, 'public/index.html')
			}),
			new FaviconsWebpackPlugin(path.resolve(__dirname, 'public/favicon.png')),
			new Dotenv({
				path: path.join(__dirname, '/src/.env'),
				safe: true,
				allowEmptyValues: true,
				systemvars: true,
				silent: true,
				defaults: false
			})
		]
	}
}
