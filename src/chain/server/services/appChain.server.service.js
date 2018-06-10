import mongoose from 'mongoose';
import { ChainService } from './chain.server.service';

var Chain, appChain;

export class AppChainService {
  static init() {
    Chain = mongoose.model('Chain');
    Chain.findOne({}, (err, chain) => {
      appChain = chain;
    });
  }
  static enter({external_ids, content}, cb) {
    ChainService.enter({
      chain_id: appChain.chain_id,
      external_ids,
      content
    }, cb);
  }
  static searchEntry({external_ids}, cb) {
    ChainService.searchEntry({
      chain_id: appChain.chain_id,
      external_ids
    }, cb);
  }
  static getEntry({entry_hash}, cb) {
    ChainService.searchEntry({
      chain_id: appChain.chain_id,
      entry_hash
    }, cb);
  }
}
