import { UserController } from '../../../core/server/controllers/user.server.core.controller';
import { KeypairController } from '../controllers/keypair.server.controller';

export class KeypairRoutes {
  static init(app) {
    app
      .route('/api/private-key')
      .get(UserController.requiresLogin, KeypairController.getMyPrivateKey);
  }
}
