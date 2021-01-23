const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackNodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ],
    },
    plugins: [
      new InjectManifest({
        swSrc: './src/service-worker',
        swDest: 'sw.js',
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        include: ['main.js']
      })
    ],
  },

  {
    name: 'server',
    target: 'node',
    entry: './src/server.tsx',
    output: {
      publicPath: '/',
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
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'styles.css' }),
      new CopyWebpackPlugin({ patterns: [ { from: 'public' } ] })
    ],
  }
]
