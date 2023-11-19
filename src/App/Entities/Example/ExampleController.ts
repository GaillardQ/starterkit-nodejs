// Node libs
import CreateError from 'http-errors';
// @app/entities
import * as ExampleRepository from './ExampleRepository';

/**
 * Return the list of examples
 * @param req
 * @param res
 */
export const list = async (req: any, res: any, next: any) => {
	/* 
		#swagger.auto = false
		#swagger.path = '/example'
		#swagger.method = 'get'
		#swagger.produces = ['application/json']
		#swagger.responses[200] = {
			description: 'Examples list',
			schema: {
				$ref: '#/definitions/ExamplesList'
			}
		}
	*/
  try {
    const test = await ExampleRepository.getAllExamples();
    res.status(200).send(test);
  } catch (e) {
    let message = 'Une erreur est survenue';
    if(e instanceof Error) message = e.message;
    next(CreateError(500, 'Une erreur est survenue'));
  }
};
