import { ChainService } from './services/chain.server.service';
import { KeypairService } from './services/keypair.server.service';
import './models';

export class ChainModule {
  static init() {
    ChainService.init();
    KeypairService.init();
  }
}
