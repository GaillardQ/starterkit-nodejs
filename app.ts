// Node libs
import Express from 'express';
import CreateError from 'http-errors';
import Path from 'path';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';
import Dotenv from 'dotenv';
import Passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { RequestContext } from '@mikro-orm/core';
// Project files
import * as DatabaseUtils from './src/App/Core/Database/Database';
import Router from './src/App/Router';

// Main settings
Dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST || 'http://localhost';

// App creation
const app = Express();

export const init = (async () => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at ${HOST}:${PORT}`);
    });
  }

  // App settings
  app.use(Logger('dev'));
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: false }));
  app.use(CookieParser());
  app.use(Express.static(Path.join(__dirname, 'public')));
  Passport.use(
    new Strategy((token: string, done: (...args: any) => any) => {
      /*
      User.findOne({ token: token }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      });
      */
    })
  );

  const em = await DatabaseUtils.createDatabaseConnection();

  app.use((req, res, next) => {
    if (em) {
      RequestContext.create(em, next);
    }
  });

  // Main router
  Router.forEach(r => {
    app.use(`/${r.path}`, r.router);
  });

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
})();

export default app;
