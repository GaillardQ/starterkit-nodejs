import Express from 'express';

import * as ExampleController from './ExampleController';

const ExampleRouter = Express.Router();

/* GET examples. */
ExampleRouter.get('/', ExampleController.list);

export default ExampleRouter;
