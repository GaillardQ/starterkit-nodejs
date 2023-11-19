// Node libs
import Express, { 
	NextFunction,
	Request, 
	Response 
} from 'express';
import CreateError from 'http-errors';
import Path from 'path';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';
import Dotenv from 'dotenv';
import { RequestContext } from '@mikro-orm/core';
import { auth } from 'express-oauth2-jwt-bearer';
import swaggerUi from 'swagger-ui-express';
// @app/core
import * as DatabaseUtils from './src/App/Core/Database/Database';
// @app/router
import Router from './src/App/Router';
// Misc
import swaggerDocument from './swagger.json';
import ExampleRouter from './src/App/Entities/Example/ExampleRouter';

// Main settings
Dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST || 'http://localhost';
const AUTH_AUDIENCE = process.env.APP_AUTH_AUDIENCE;
const AUTH_DOMAIN = process.env.APP_AUTH_DOMAIN;

// App creation
const app = Express();

export const init = (async () => {

  // App settings
  app.use(Logger('dev'));
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: false }));
  app.use(CookieParser());
  app.use(Express.static(Path.join(__dirname, 'public')));

  // Database connection
  const em = await DatabaseUtils.createDatabaseConnection();

  app.use((req, res, next) => {
    if (em) {
      RequestContext.create(em, next);
    }
  });

  const authMiddleware = auth({
    audience: AUTH_AUDIENCE,
    issuerBaseURL: AUTH_DOMAIN,
  })

  // Main router
  Router.forEach(r => {
    app.use(`/${r.path}`, r.needAuth ? authMiddleware : (req: Request, res: Response, next: NextFunction) => next(), r.router);
  });
	app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Error handlers
  app.use(function (req, res, next) {
    next(CreateError(404, 'Route not found'));
  });

  app.use(async function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    const message: { error: string[] } = {
      error: [
        req.app.get('env') === 'development' ? err.message : 'Une erreur est survenue',
      ],
    };

    if (req.app.get('env') === 'development') {
      console.log('ERROR', err);
    }
    res.send(message);
  });

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at ${HOST}:${PORT}`);
    });
  }
})();

export default app;
