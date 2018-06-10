import { AgreementController } from '../controllers/agreement.server.controller';
import { UserController } from '../../../core/server/controllers/user.server.core.controller';

export class AgreementRoutes {
  static init(app) {
    AgreementController.init();
    app
      .route('/api/agreements')
      .get(UserController.requiresLogin, AgreementController.list)
      .post(UserController.requiresLogin, AgreementController.create);

    app.route('/api/agreements/:agreementId')
      .get(UserController.requiresLogin, AgreementController.read)
      .put(UserController.requiresLogin, AgreementController.update);
    // No way to delete.

    app.param('agreementId', AgreementController.agreementById);
  }
}
