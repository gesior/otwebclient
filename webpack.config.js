let webpack = require('webpack');
let path = require('path');

let babelOptions =  {
  "presets": "es2015"
};

module.exports = {
  entry:
  {
    index: './init.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (module, count) {
        // creates a common vendor js file for libraries in node_modules
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    })
  ]
}
