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
		#swagger.start
		#swagger.tags = ['Example']
		#swagger.path = `/example`
		#swagger.summary = 'Endpoint d\'exemple'
		#swagger.description = 'Liste exemple'
		#swagger.method = 'GET'
		#swagger.produces = ['application/json']
		#swagger.responses[200] = {
			description: 'Examples list',
			schema: [{
				$ref: '#/definitions/Example'
			}]
		}
		#swagger.end
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
