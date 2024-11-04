const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
import "webpack-dev-server";
import webpack from "webpack";

const webpackConfig: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
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
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Add React preset
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
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)/,
                type: "asset/resource",
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
            directory: path.resolve(__dirname, "dist"),
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
};

module.exports = webpackConfig;
