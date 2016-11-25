// adds support to process karma config with ts-node
require('ts-node/register')

// exports karma config defined in typescript
module.exports = require('./config/karma.conf.ts').getKarmaConfig;
