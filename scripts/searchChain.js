// Search for a chain made earlier.
// The chain has an externalId of 'informed-consent@0.9.0'
// See createChain.js

var ChainService = require('../build/chain/server/services/chain.server.service').ChainService;

var CONFIG = require('../build/core/server/config/config').CONFIG;
var mongoose = require('mongoose');
require('../build/chain/server/models/chain.server.model');

mongoose.connect(CONFIG.db);

ChainService.init();

function printResponse(response) {
  // eslint-disable-next-line
  console.log('Got Response: ', JSON.stringify(response));
}

ChainService.search({
  external_ids: ['informed-consent@0.9.0']
}, printResponse);

// ChainService.findById({
//   chain_id: 'ea250632b562265711bdc1e9035aa0ad1e9e5f3d223b828d4cbb314fdb52eaee'
// }, printResponse);

// ChainService.enter({
//   chain_id: 'ea250632b562265711bdc1e9035aa0ad1e9e5f3d223b828d4cbb314fdb52eaee',
//   external_ids: [
//     'informed-consent@0.9.0',
//     'Harold T. Pants'
//   ],
//   content: 'Fake content. Fake.'
// }, printResponse);

// ChainService.getEntry({
//   chain_id: 'ea250632b562265711bdc1e9035aa0ad1e9e5f3d223b828d4cbb314fdb52eaee',
//   entry_hash: '0b2ef38ff5221fdbf3be8d18676b6ac6464915b545b401eaaeebda5f2d2ae165'
// }, printResponse);
