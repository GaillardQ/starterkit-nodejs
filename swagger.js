const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000',
	definitions: {
    Example: {
      id: 1,
      key: 'Sing / Bass',
			value: 'Fat Mike'
    },
		ExamplesList: [{ $ref: '#/definitions/Example' }]
	}
};

const outputFile = './swagger.json';
const routes =  ['./app.ts']; // , './src/App/**/*Router.ts'

swaggerAutogen(outputFile, routes, doc);