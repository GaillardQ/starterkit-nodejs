// Node libs
import Dotenv from 'dotenv';
// SGBD utils
import * as mySQLUtils from './Mysql';

Dotenv.config();

const DB_HOST = process.env.APP_DB_HOST || 'localhost';
const DB_PORT = process.env.APP_DB_PORT || '3306';
const DB_USER = process.env.APP_DB_USER || 'root';
const DB_PWD = process.env.APP_DB_PWD || 'root';
const DB_NAME = process.env.APP_DB_NAME || 'database';

let currentSgbd = '';

export const createDatabaseConnection = (sgbd: string) => {
  currentSgbd = sgbd;
  switch (sgbd) {
    case 'mysql': {
      mySQLUtils.createMySQLConnection({
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
      });
    }
  }
};

export const executeQuery = (query: string) => {
  switch (currentSgbd) {
    case 'mysql': {
      return mySQLUtils.query(query);
    }
  }
};
