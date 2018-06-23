import { EndorsementController } from '../controllers/endorsement.server.controller';
import { UserController } from '../../../core/server/controllers/user.server.core.controller';

export class EndorsementRoutes {
  static init(app) {
    EndorsementController.init();
    app
      .route('/api/endorsements')
      .get(
        UserController.requiresLogin,
        EndorsementController.listMyEndorsements
      )
      .post(UserController.requiresLogin, EndorsementController.create);

    app
      .route('/api/endorsements/:endorsementId')
      .get(UserController.requiresLogin, EndorsementController.read);

    app.param('endorsementId', EndorsementController.endorsementById);
  }
}
