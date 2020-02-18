const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const packageJson = require("./package.json");

const isDev = process.env.NODE_ENV === "development";

function transformManifestFile(payload) {
    let p = JSON.parse(payload);
    return JSON.stringify(p);
}

module.exports = {
    mode: isDev ? "development" : "production",
    entry: {
        polyfill: "@babel/polyfill", // enables async-await
        popup: "./src/popup.tsx",
        options: "./src/options.tsx"
    },
    output: {
        filename: "js/[name].js", // relative to the outputPath (defaults to / or root of the site)
        library: "github2jira"
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{ loader: "babel-loader" }, { loader: "ts-loader" }]
            },
            {
                test: /\.(js|mjs|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, "src"),
                use: ["style-loader"]
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                query: {
                    modules: true,
                    localIdentName: "[name]__[local]___[hash:base64:5]"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new webpack.DefinePlugin({
            RELEASE_VERSION: JSON.stringify(packageJson.version),
            BUILD_NUMBER: JSON.stringify(packageJson.build_number)
        }),
        new HtmlWebpackPlugin({
            filename: "popup.html",
            template: "public/popup.html",
            chunks: ["popup"],
        }),
        new HtmlWebpackPlugin({
            filename: "options.html",
            template: "public/options.html",
            chunks: ["options"],
        }),
        new CopyWebpackPlugin([
            {
                from: "src/manifest-firefox.json",
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: "src/manifest.json",
            }
        ])
    ],
    devServer: {
        /* headers: {
		'Content-Security-Policy': "script-src 'self' * 'unsafe-inline' 'unsafe-eval'; connect-src 'self' *; "
	},
    */
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./public"),
        watchContentBase: true, // initiate a page refresh if static content changes
        proxy: [
            // allows redirect of requests to webpack-dev-server to another destination
            {
                context: ["/api", "/server"], // can have multiple
                target: "http://127.0.0.1:3000", // server and port to redirect to
                secure: false,
                changeOrigin: true
            }
        ],
        port: 4040, // port webpack-dev-server listens to, defaults to 8080
        overlay: {
            // Shows a full-screen overlay in the browser when there are compiler errors or warnings
            warnings: false, // defaults to false
            errors: false // defaults to false
        }
    }
};
