const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js'
	},
	resolve: {
		extensions: ['.js', '.vue']
	}, // Webpack should know that we attempt to load up a vue files
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
				use: [
					{loader: 'file-loader'}
				]
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.scss|\.css$/,
				use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
			},
			// Tell webpack what to import to project
			{
				test: /\.m?js$/, // Js files processed by babel
				exclude: /node_modules/, // exclusion
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime'] // enable different features as async/await syntaxes, etc
					}
				}
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
};
