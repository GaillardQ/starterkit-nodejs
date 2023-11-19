// Node libs
import Dotenv from 'dotenv';
// @app/core
import * as mySQLUtils from './Mysql';
import * as postgreSQLUtils from './Postgresql';

Dotenv.config();

export const SGBD_MYSQL = 'mysql';
export const SGBD_POSTGRESQL = 'postgresql';

const DB_HOST = process.env.APP_DB_HOST || 'localhost';
const DB_PORT = process.env.APP_DB_PORT || '3306';
const DB_USER = process.env.APP_DB_USER || 'root';
const DB_PWD = process.env.APP_DB_PWD || 'root';
const DB_NAME = process.env.APP_DB_NAME || 'database';

export const createDatabaseConnection = async () => {
  switch (process.env.APP_DB_SGBD) {
    /*
    case SGBD_MYSQL: {
      mySQLUtils.createMySQLConnection({
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
      });
    }
    */
    case SGBD_POSTGRESQL: {
      return await postgreSQLUtils.createPostgreSQLConnection({
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
      });
    }
    default: return null;
  }
};
