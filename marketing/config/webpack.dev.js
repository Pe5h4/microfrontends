const { merge } = require('webpack-merge'); // used to merge 2 different webpack configs into 1
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Load module federation plugin
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config
const packageJson = require('../package.json');

const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8091/'
	},
	devServer: {
		port: 8091,
		// historyApiFallback: {
		// 	index: '/index.html'
		// }
		historyApiFallback: true
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'marketing', // Global variable
			filename: 'remoteEntry.js',
			exposes: { // Exposes the file for sharing
				'./MarketingApp': './src/bootstrap'
			},
			// For React it is recommended to set it to true (we want to have only 1 react version across the applications)
			// shared: {
			// 	'react': {
			// 		singleton: true
			// 	},
			// 	'react-dom': {
			// 		singleton: true
			// 	}
			// }
			shared: packageJson.dependencies, // It will use share of the dependencies from package.json between the applications (and it will diminish sizes of dependency sizes)
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
}

// Merge common and dev configs
module.exports = merge(commonConfig, devConfig);
