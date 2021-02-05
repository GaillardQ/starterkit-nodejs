// Node libs
import createError from 'http-errors';

import * as ExampleRepository from './ExampleRepository';

/**
 * Return the list of examples
 * @param req
 * @param res
 */
export const list = async (req: any, res: any, next: any) => {
  try {
    const test = await ExampleRepository.getAllExamples();
    res.status(200).send(test);
  } catch (e) {
    next(createError(500, 'Une erreur est survenue'));
  }
};
