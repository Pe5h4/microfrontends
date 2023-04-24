const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			// Tell webpack what to import to project
			{
				test: /\.m?js$/, // Js files processed by babel
				exclude: /node_modules/, // exclusion
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime'] // enable different features as async/await syntaxes, etc
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html' // Sharing public/index.html file between build and dev environments
		})
	]
};
