import { SigRequestController } from '../controllers/sigRequest.server.controller';
import { UserController } from '../../../core/server/controllers/user.server.core.controller';

export class SigRequestRoutes {
  static init(app) {
    SigRequestController.init();
    app
      .route('/api/sigRequests')
      .get(UserController.requiresLogin, SigRequestController.list)
      .post(UserController.requiresLogin, SigRequestController.create);

    app
      .route('/api/sigRequests/:sigRequestId')
      .get(
        UserController.requiresLogin,
        SigRequestController.userHasReadPermission,
        SigRequestController.read
      )
      .put(
        UserController.requiresLogin,
        SigRequestController.userHasReadPermission,
        SigRequestController.update
      )
      .delete(
        UserController.requiresLogin,
        SigRequestController.userHasReadPermission,
        SigRequestController.delete
      );
    app.param('sigRequestId', SigRequestController.sigRequestById);
  }
}
