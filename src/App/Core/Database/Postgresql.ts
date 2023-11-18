// Node libs
import { 
  MikroORM,
  type EntityManager, 
  type PostgreSqlDriver 
} from '@mikro-orm/postgresql';

export const createPostgreSQLConnection = async (params: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./build/src/App/**/*Entity.js'],
    entitiesTs: ['./src/App/**/*Entity.ts'],
    dbName: params.database,
    type: 'postgresql',
    driverOptions: {
      connection: {
        host: params.host,
        port: params.port,
        user: params.user,
        password: params.password
      }
    }
  });
  return orm.em;
};
