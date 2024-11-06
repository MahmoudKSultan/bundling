const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
import "webpack-dev-server";
import webpack from "webpack";

const webpackConfig: webpack.Configuration = {
	mode: "production",
	entry: path.resolve(__dirname, "src/index.ts"),
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		assetModuleFilename: "[name][ext]",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				// Test for both .js and .jsx files
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"], // Add React preset
					},
				},
			},
			{
				// Add a rule for TypeScript files
				test: /\.(tsx|ts)?$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)/,
				// type: "asset/resource",
				use: [
					{
						options: {
							name: "[name].[ext]",
							outputPath: "assets/images/",
							publicPath: "assets/images/",
						},
						loader: "file-loader?name=[path][name].[ext]!extract-loader!html-loader",
					},
				],
			},
		],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: "Webpack App",
			filename: "index.html",
			template: "src/index.html",
		}),
	],
	devtool: "source-map",
	devServer: {
		port: 3000, // customize the port
		static: {
			directory: path.resolve(__dirname, "src"),
		},
		hot: true, // hot reloading
		open: true, // open the page when server starts
		compress: true, // enable gzip compression
	},
	// usedExport enables tree-shaking feature
	optimization: {
		usedExports: true,
		chunkIds: "named",
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};

module.exports = webpackConfig;
