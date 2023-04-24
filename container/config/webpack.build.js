const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Load module federation plugin
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // Dynamic domain where our appplication is hosted, will have to be set in CI/CD file

const buildConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js', // Ensure that whenever we build files for production, it will use this template to name them
		publicPath: '/container/latest/' // Path where weback is trying to refer to a files which has been build (it will prepend the filenamse with publicPath)
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: `marketing@${domain}/marketing/remoteEntry.js` // /marketing/remoteEntry.js is a file in marketing folder on our domain
			},
			shared: packageJson.dependencies // Sharing the package dependencies between applications
		})
	]
};

module.exports = merge(commonConfig, buildConfig);
