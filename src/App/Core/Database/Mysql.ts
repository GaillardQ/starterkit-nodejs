import mysql from 'mysql';

let mysqlConnection: mysql.Connection | undefined = undefined;

export const createMySQLConnection = (params: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) => {
  mysqlConnection = mysql.createConnection(params);
  mysqlConnection.connect(err => {
    if (err) throw err;
    console.log(`[db]: Server connected to database ${params.database}`);
  });
};

export const query = (sql: string) => {
  if (mysqlConnection) {
    return new Promise((resolve, reject) => {
      mysqlConnection?.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  return null;
};
