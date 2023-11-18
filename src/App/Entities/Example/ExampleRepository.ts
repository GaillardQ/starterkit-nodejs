// SGBD Utils
import { RequestContext } from '@mikro-orm/core';
// @app/example
import { Example } from './ExampleEntity';

export const getAllExamples = async () => await RequestContext.getEntityManager()?.find(Example, {});
