// SGBD Utils
import * as mySQLUtils from '../../Core/Database/Mysql';

export const getAllExamples = async () => {
  return await mySQLUtils.query('SELECT * FROM exercises');
};
