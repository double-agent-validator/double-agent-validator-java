var helpers = require('./helpers');
var path = require('path');

let coverageEnabled = false;
let tsConfigPath = path.join(__dirname, '../src/tsconfig.json');
module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader', //?configFileName=' + tsConfigPath + 'sourceMap=' + !coverageEnabled + ',experimentalDecorators=true,inlineSourceMap=' + coverageEnabled + ',module=commonjs,noEmitHelpers=false,compilerOptions{}=removeComments:true'
      query: {
        tsconfig: tsConfigPath
      }
    }, {
      test: /\.html$/,
      loader: 'html'

    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'null'
    }, {
      test: /\.css$/,
      exclude: helpers.root('src', 'app'),
      loader: 'null'
    }, {
      test: /\.css$/,
      include: helpers.root('src', 'app'),
      loader: 'raw'
    }]
  }
}
