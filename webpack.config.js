const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ]
            }
        ]//////
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({ filename: 'style.css',
        chunkFilename: "styles.css"}),
        new Dotenv({path:'./.env.local'}),
    ],devServer: {
        port:process.env.PORT | 4000,
        historyApiFallback: true
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
};