import express from 'express';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import connectFlash from 'connect-flash';
import { IndexRoutes } from '../routes/index.server.core.routes';
import { UserRoutes } from '../routes/user.server.core.routes';
import { PartialsRoutes } from '../routes/partials.server.core.routes';
import { AgreementRoutes } from '../../../document/server/routes/agreement.server.routes';
import { SigRequestRoutes } from '../../../document/server/routes/sigRequest.server.routes';
import { EndorsementRoutes } from '../../../document/server/routes/endorsement.server.routes';
import { KeypairRoutes } from '../../../chain/server/routes/keypair.server.routes';
import { moduleList } from '../../../modules';
import { ChainModule } from '../../../chain/server';
import { CONFIG } from './config';
import _ from 'lodash';

export function init() {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: CONFIG.sessionSecret
    })
  );

  app.set('views', _.map(moduleList, module => './build/' + module + '/views'));
  app.set('view engine', 'pug');

  app.use(connectFlash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static('./public'));
  app.use('/lib', express.static('./node_modules'));

  IndexRoutes.init(app);
  UserRoutes.init(app);
  PartialsRoutes.init(app);
  AgreementRoutes.init(app);
  SigRequestRoutes.init(app);
  EndorsementRoutes.init(app);
  KeypairRoutes.init(app);

  ChainModule.init();

  return app;
}
