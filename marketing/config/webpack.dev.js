const { merge } = require('webpack-merge'); // used to merge 2 different webpack configs into 1
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config

const devConfig = {
	mode: 'development',
	devServer: {
		port: 8091,
		historyApiFallback: {
			index: 'index.html'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
}

// Merge common and dev configs
module.exports = merge(commonConfig, devConfig);
