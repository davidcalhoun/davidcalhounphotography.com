const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("./package.json");
const postcssCustomMedia = require("postcss-custom-media");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const reactRegexp = /[\\/]node_modules[\\/](react|react-dom|react-is)[\\/]/;
const materialRegexp = /[\\/]node_modules[\\/](@material-ui)[\\/]/;

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  let config = {
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      publicPath: "/",
      chunkFilename: "js/[name].[contenthash:8].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: "url-loader",
              options: {
                mimetype: "image/png",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            /**
             * Note: this creates specificity problems between dev builds (all inline styles)
             * and prod builds (mix of inline [used by deps] and CSS stylesheet).
             */
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: devMode
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[local]--[hash:base64:5]",
                  context: path.resolve(__dirname, "src"),
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                options: {
                  sourceMap: "inline",
                },
                plugins: () => [
                  postcssCustomMedia({
                    importFrom: path.resolve(__dirname, "src/shared.css"),
                  }),
                  require("autoprefixer"),
                ],
              },
            },
          ],
        },
        {
          test: /\.(txt)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {},
    },
    devServer: {
      contentBase: "./dist",
      open: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html", // output
        inject: true,
        appMountId: "app",
        templateParameters: {
          title: "David Calhoun Photography", // TODO: get from shared const file
        },
        minify: false,
        chunks: [
          "satellite",
          "react",
          "mapbox",
          "material",
          "vendor",
          "runtime",
          "main",
        ],
        chunksSortMode: "manual", // manual: sort in the order of the chunks array
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
      }),
    ],
    optimization: {
      runtimeChunk: "single",
      moduleIds: "hashed", // makes sure hashes don't change unexpectedly
      splitChunks: {
        minSize: 0,
        minChunks: 1,
        maxAsyncRequests: 1000,
        maxInitialRequests: 1000,
        cacheGroups: {
          react: {
            test: reactRegexp,
            name: "react",
            chunks: "all",
            enforce: true,
          },
          material: {
            test: materialRegexp,
            name: "material",
            chunks: "all",
            enforce: true,
          },
          vendor: {
            test(mod) {
              // exclude anything outside node modules
              if (!mod.context.includes("node_modules")) {
                return false;
              }

              // exclude other explicit chunk deps
              if (
                reactRegexp.test(mod.context) ||
                materialRegexp.test(mod.context)
              ) {
                return false;
              }

              // return all other node modules
              return true;
            },
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },
  };

  if (argv.hot) {
    // Hack: cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "[name].[hash].js";
  }

  // if (argv.mode === "production") {
  //   config.plugins.push(new BundleAnalyzerPlugin());
  // }

  return config;
};
