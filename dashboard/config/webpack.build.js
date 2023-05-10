const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Load module federation plugin
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config
const packageJson = require('../package.json'); // Obtain package json content


const buildConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/dashboard/latest/'
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'dashboard',
			filename: 'remoteEntry.js',
			exposes: {
				'./DashboardApp': './src/bootstrap' // Exposes for remote
			},
			shared: packageJson.dependencies
		})
	]
}

module.exports = merge(commonConfig, buildConfig);
