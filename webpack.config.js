var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebPack = require("html-webpack-plugin");
var htmlWebPackConfig = new htmlWebPack({
	template: "src/index.html",
	filename: "index.html",
	inject: "body"
})
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
	entry: SRC_DIR + "/app/index.js",
	devtool: 'cheap-module-source-map',
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
						"presets": ["react", "es2015", "stage-2", "latest"]
				}
			},
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
          "quiet": true,
        }
			}
		]
	},
	
	devtool: 'source-map',
	devServer: {
		inline: false,
		port: 1010,
    contentBase: "./src",
    hot: true
	},
	plugins: [
		htmlWebPackConfig,
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      warnings: false,
		}),
		new ExtractTextPlugin("bundle.css")
	],
	resolve: {
    extensions: ['.js', '.jsx']
	}
};

module.exports = config;