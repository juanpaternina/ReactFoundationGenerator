var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/app.js',
  ],
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  externals: {
    jquery: 'jQuery'
  },
  devServer: {
    contentBase: "./app"
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      Api: 'app/api/api.js',
      Main: 'app/components/Main/Main.js',
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader","css-loader"],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            includePaths: [
              path.resolve(__dirname, './node_modules/foundation-sites/scss')
            ]
          }
        }]
      }

    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
