const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, './'),
  entry: './app/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
      },
        {
            test: /\.css$/,
            loader: 'css-loader'
        },
      {
        test: /\.scss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: 'inline',
                    plugins: function()  {
                      return [ autoprefixer({ browsers: ['last 3 versions'] }) ]
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    includePaths: [ path.resolve(__dirname, "node_modules") ]
                }
            }
        ],
        include: path.join(__dirname, 'app')
      }
    ],
  },
  plugins: [
     new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
};