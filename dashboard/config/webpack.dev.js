const { merge } = require('webpack-merge'); // used to merge 2 different webpack configs into 1
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Load module federation plugin
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config
const packageJson = require('../package.json');

const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8093/' // Publicpath MUST be set in microfrontends dev env to correctly load the path of main.js file
	},
	devServer: {
		port: 8093,
		// historyApiFallback: {
		// 	index: '/index.html'
		// }
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*' // Loading external fonts, avoiding CORS
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'dashboard', // Global variable
			filename: 'remoteEntry.js',
			exposes: { // Exposes the file for sharing
				'./DashboardApp': './src/bootstrap'
			},
			shared: packageJson.dependencies, // It will use share of the dependencies from package.json between the applications (and it will diminish sizes of dependency sizes)
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
}

// Merge common and dev configs
module.exports = merge(commonConfig, devConfig);
