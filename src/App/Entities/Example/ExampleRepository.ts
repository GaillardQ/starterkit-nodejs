// Node libs
import { RequestContext } from '@mikro-orm/core';
// @app/entities
import { Example } from './ExampleEntity';

export const getAllExamples = async () => await RequestContext.getEntityManager()?.find(Example, {});
