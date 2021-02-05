// Node libs
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
// Routers
import Router from './src/App/Router';
import ExampleRouter from './src/App/Entities/Example/ExampleRouter';

// Main settings
dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST || 'http://localhost';

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

// Main router
Router.forEach(r => {
  app.use(`/${r.path}`, r.router);
});

// Error handlers
app.use(function (req, res, next) {
  next(createError(404));
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
  switch (err.status) {
    case 404: {
      message.error = ['Page not found'];
      break;
    }
  }
  res.send(message);
});

export default app;
