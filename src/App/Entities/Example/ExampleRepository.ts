// SGBD Utils
import * as DatabaseUtils from '../../Core/Database/Database';

export const getAllExamples = async () => {
  return DatabaseUtils.executeQuery('SELECT * FROM users');
};
