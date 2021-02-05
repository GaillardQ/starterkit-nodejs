// Node libs
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import * as mySQLUtils from './src/App/Core/Database/mysql';

// Routers
import Router from './src/App/Router';

// Main settings
dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST || 'http://localhost';
const DB_HOST = process.env.APP_DB_HOST || 'localhost';
const DB_PORT = process.env.APP_DB_PORT || '3306';
const DB_USER = process.env.APP_DB_USER || 'root';
const DB_PWD = process.env.APP_DB_PWD || 'root';
const DB_NAME = process.env.APP_DB_NAME || 'database';

// App creation
const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at ${HOST}:${PORT}`);
  });
}

// App settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database
mySQLUtils.createMySQLConnection({
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
});

// Main router
Router.forEach(r => {
  app.use(`/${r.path}`, r.router);
});

// Error handlers
app.use(function (req, res, next) {
  next(createError(404, 'Page not found'));
});

app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  const message: { error: string[] } = {
    error: [
      req.app.get('env') === 'development' ? err.message : 'An error occurred',
    ],
  };

  if (req.app.get('env') === 'development') {
    console.log('ERROR', err);
  }
  res.send(message);
});

export default app;
