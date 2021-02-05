/**
 * Return the list
 * @param req
 * @param res
 */
export const list = (req: any, res: any) =>
  res.status(200).send(['value1', 'value2', 'value3']);
