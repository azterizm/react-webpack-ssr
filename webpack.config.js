const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackNodeExternals = require('webpack-node-externals')

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
