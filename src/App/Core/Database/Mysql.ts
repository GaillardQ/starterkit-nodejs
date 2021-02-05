import Mysql from 'mysql';

let mysqlConnection: Mysql.Connection | undefined = undefined;

export const createMySQLConnection = (params: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) => {
  console.log('params', params);
  mysqlConnection = Mysql.createConnection(params);
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
