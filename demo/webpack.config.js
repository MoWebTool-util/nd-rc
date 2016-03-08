var path = require('path')
var webpack = require('webpack')
var cssnano = require('cssnano')

module.exports = {
  context: __dirname,
  debug: true,
  devtool: '#inline-source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: path.join(__dirname, '..'),
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file?limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url?limit=8192'
      }]
  },
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ]
}
