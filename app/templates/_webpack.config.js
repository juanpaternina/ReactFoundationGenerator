var webpack = require('webpack');
const path = require('path');

var config = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/app.js',
  ],
  output: {
    path: __dirname+'/app',
    filename: './bundle.js'
  },
  externals: {
    jquery: 'jQuery'
  },
  devServer: {
    contentBase: "./app",
    historyApiFallback: true,
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
      applicationStyles: 'app/styles/app.scss',
      Actions: 'app/actions/index.js',
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

if(process.env.NODE_ENV === 'production'){
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV )
        }
      }),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true, minimize: true})
    )
}

module.exports = config;
