const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const source = __dirname + '/src/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function assetsPath(_path) {
  return path.posix.join('static', _path)
}

module.exports = {
  // TODO hash plugin
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // where to load chunk file
    // publicPath: '/dist/',
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      components: source + 'components',
      router: source + 'router',
      views: source + 'views'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(sass|scss)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('vendor.css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'angular-ui-router-webpack',
      template: 'src/index.template.html'
    })
  ]
};
