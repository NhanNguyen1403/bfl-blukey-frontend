const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
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
					test: /\.(png|jpe?g|gif)$/i,
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
			new webpack.DefinePlugin({
				"process.env" : {
					"SERVER_URL" : env.WEBPACK_SERVE
						? JSON.stringify('http://localhost:3000')
						: JSON.stringify('http://localhost:3001')
				}
			}),
		]
	}
}