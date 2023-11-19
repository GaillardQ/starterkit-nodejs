// Node libs
import Express from 'express';
// @app/entities
import * as ExampleController from './ExampleController';

const ExampleRouter = Express.Router();

/* GET examples. */
ExampleRouter.get('/', ExampleController.list);

export default ExampleRouter;
