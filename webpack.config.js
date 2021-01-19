const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackNodeExternals = require('webpack-node-externals')
const {InjectManifest} = require('workbox-webpack-plugin')

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: './src/client.tsx',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    resolve: {
      extensions: ['.js',  '.jsx', '.json',  '.ts', '.tsx', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
          },
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ],
        }
      ],
    },
    plugins: [
      new InjectManifest({
        swSrc: './src/service-worker',
        swDest: 'sw.js',
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      })
    ],
  },

  {
    name: 'server',
    target: 'node',
    entry: './src/server.tsx',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'build'),
    },
    externals: [webpackNodeExternals()],
    mode: 'development',
    resolve: {
      extensions: ['.js',  '.jsx', '.json',  '.ts', '.tsx', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'styles.css' })
    ],
  }
]
