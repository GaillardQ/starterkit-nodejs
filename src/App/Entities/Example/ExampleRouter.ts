import express from 'express';

import * as ExampleController from './ExampleController';

const exampleRouter = express.Router();

/* GET promocodes listing. */
exampleRouter.get('/', ExampleController.list);

export default exampleRouter;