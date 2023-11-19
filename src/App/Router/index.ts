// Node libs
import Express from 'express';
// @app/entities
import ExempleRouter from '../Entities/Example/ExampleRouter';

const indexRouter = Express.Router();
indexRouter.use('/example', ExempleRouter);

export default indexRouter;
