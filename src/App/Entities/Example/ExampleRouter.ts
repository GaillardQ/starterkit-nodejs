// Node libs
import Express from 'express';
// @app/entities
import * as ExampleController from './ExampleController';

const ExampleRouter = Express.Router();

/* GET examples. */
ExampleRouter.get('/list', ExampleController.list);
ExampleRouter.get('/details/:id', ExampleController.details);

export default ExampleRouter;
