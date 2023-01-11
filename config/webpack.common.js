const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const paths = require('./paths')
const deps = require('../package.json').dependencies

module.exports = {
  entry: [paths.src + '/index.ts'],
  output: {
    path: paths.build,
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    sourceMapFilename: '[file].map[query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/index.html',
      filename: 'index.html',
    }),
    new ModuleFederationPlugin({
      name: 'mfApp1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      remotes: {
        mfHost: 'mfHost@[mfHostUrl]/remoteEntry.js',
        // mfApp2: 'mfApp2@[mfApp2Url]/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router-dom': { singleton: true },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(tsx|js)$/, exclude: /node_modules/, use: ['babel-loader', 'ts-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf)$/, type: 'asset/inline' },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
