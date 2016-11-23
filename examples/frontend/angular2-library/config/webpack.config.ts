require('ts-node/register');
import * as yargs from 'yargs';


import { getBuildConfig} from './webpack.build.config';
import { getTestConfig} from './webpack.test.config';


let argv = yargs.argv;

let config = {};

if (argv.test) {
  // get webpack config for test the project
  config = getTestConfig(); // require('./config/webpack.test.config');
} else {
  // get webpack config for build the project
  config = getBuildConfig('doubleagentvalidator.js', 'DoubleAgentValidator');
}

export default config;
