require('ts-node/register');
import * as yargs from 'yargs';


import { getBuildConfig} from './webpack.build.config';
import { getTestConfig} from './webpack.test.config';


let argv = yargs.argv;

let config = {};

if (argv.test) {
  // get webpack config for test the project
  config = getTestConfig();
} else {
  // get webpack config for build the project
  config = getBuildConfig('double-agent-validator.umd.js', 'DoubleAgentValidator');
}

export default config;
