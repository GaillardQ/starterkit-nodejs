export default {
	entities: ['./build/src/App/**/*Entity.js'],
	entitiesTs: ['./src/App/**/*Entity.ts'],
  dbName: process.env.APP_DB_NAME,
  type: process.env.APP_DB_SGBD,
	driverOptions: {
		connection: {
			host: process.env.APP_DB_HOST,
			port: process.env.APP_DB_PORT,
			user: process.env.APP_DB_USER,
			password: process.env.APP_DB_PWD
		}
	},
	migrations: {
    tableName: 'orm_migrations',
    path: './src/App/Migrations'
	},
	seeder: {
    path: './src/App/Entities/**/',
  },
};