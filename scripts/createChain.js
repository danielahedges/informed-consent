var ChainService = require('../build/chain/server/services/chain.server.service').ChainService;

var CONFIG = require('../build/core/server/config/config').CONFIG;
var mongoose = require('mongoose');
require('../build/chain/server/models/chain.server.model');

mongoose.connect(CONFIG.db);

ChainService.init();
ChainService.create({
  external_ids: ['informed-consent@0.9.0'],
  content: 'This chain contains signed informed consent documents'
}, response => {
  /* eslint-disable-next-line */
  console.log('Response: ', JSON.stringify(response));
});
