const { merge } = require('webpack-merge'); // used to merge 2 different webpack configs into 1
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Load module federation plugin
const commonConfig = require('./webpack.common'); // obtain configuration from webpack.common config

const packageJson = require('../package.json');

// Container is a host and wants to make use of shared (exposed) modules of our app
const devConfig = {
	mode: 'development',
	devServer: {
		port: 8090,
		// historyApiFallback: {
		// 	index: '/index.html'
		// }
		historyApiFallback: true
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:8091/remoteEntry.js', // marketing name mathces with the name of marketing in module federation plugin
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
		})
	]
}

// Merge common and dev configs
module.exports = merge(commonConfig, devConfig);
