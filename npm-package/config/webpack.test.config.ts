import * as path from 'path';
import * as webpack from 'webpack';

let projectRoot = path.join(__dirname, '../');

export function getTestConfig(debug = false): any {

  let istanbulLoader: any = {
    test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader',
    enforce: 'post',
    exclude: [
      /\.(e2e|spec)\.ts$/,
      /node_modules/
    ],
    query: { 'force-sourcemap': true }
  };
  let webpackConfig = {
    devtool: 'inline-source-map',
    target: 'node',
    node: {
      fs: 'empty',
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
    module: {

      rules: [

        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          exclude: [
            path.resolve(projectRoot, 'node_modules')
          ]
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'source-map-loader',
          exclude: [
            path.resolve(projectRoot, 'node_modules/rxjs'),
            path.resolve(projectRoot, 'node_modules/@angular')
          ]
        },

        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                tsconfig: path.join(__dirname, '../src/tsconfig.json'),
                module: 'commonjs',
                target: 'es5',
                useForkChecker: true
              }
            }
          ],
          exclude: [/\.e2e\.ts$/]
        }
      ]
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|js)($|\?)/i // process .js and .ts files only
      }),
       new webpack.ContextReplacementPlugin( // https://github.com/angular/angular-cli/pull/2362
         /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
         path.join(projectRoot, 'src')
       )
    ],
    /*tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'src/'
    },*/
    // context: path.join(__dirname, '../src'),
    resolve: {
      // root: path.resolve('.', ''),
      extensions: ['.ts', '.js']
    }
  };

  if (!debug) {
    webpackConfig.module.rules.push(istanbulLoader);
  }

  return webpackConfig;
}
