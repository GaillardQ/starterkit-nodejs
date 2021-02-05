import * as mySQLUtils from '../../Core/Database/mysql';

export const getAllExamples = async () => {
  return await mySQLUtils.query('SELECT * FROM exercises');
};
