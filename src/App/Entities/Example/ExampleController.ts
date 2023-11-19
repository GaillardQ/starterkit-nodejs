// Node libs
import CreateError from 'http-errors';
// @app/entities
import * as ExampleRepository from './ExampleRepository';

export const list = async (req: any, res: any, next: any) => {
	/* 
		#swagger.tags = ["Example"]
		#swagger.summary = "Récupère la list des exemples"
		#swagger.responses[200] = {
			description: 'Examples list',
			schema: [{
				$ref: '#/definitions/Example'
			}]
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

export const details = async (req: any, res: any, next: any) => {
	/* 
		#swagger.tags = ["Example"]
		#swagger.summary = "Récupère un exemple"
		#swagger.responses[200] = {
			description: 'Example',
			schema: { $ref: '#/definitions/Example' }
		}
		#swagger.responses[404] = {
			description: 'Entité inconnue',
			schema: { $ref: '#/definitions/Error' }
		}
	*/
  try {
    const test = await ExampleRepository.getAnExample(req.params.id);
		if (!test) next(CreateError(404, 'Exemple introuvable'));
    else res.status(200).send(test);
  } catch (e) {
    let message = 'Une erreur est survenue';
    if(e instanceof Error) message = e.message;
    next(CreateError(500, 'Une erreur est survenue'));
  }
};
