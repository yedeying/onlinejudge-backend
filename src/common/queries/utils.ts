import { query } from '$lib/db';
import KoaError from '$lib/error';
import { IQueryParams } from '$types';
import { ErrorCode, StatusCode } from '$constants';

export const queryAll = <T, S extends any[] = []>(paramsHandler: (...args: S) => IQueryParams<T>) =>
  async (...args: S): Promise<T[]> => {
    const { sql, params = [], fields, pick, mapper } = paramsHandler(...args);
    let parsedSql = sql;
    if (fields && sql.includes('{fields}')) {
      parsedSql = sql.replace('{fields}', fields.join(', '));
    }
    let res: any[] = [];
    try {
      res = await query(parsedSql, params);
    } catch (e) {
      throw new KoaError('server error', {
        code: ErrorCode.SERVER_ERROR,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR
      });
    }
    if (fields) {
      res = res.map(item => fields.reduce((p: any, field: string) => ({ [field]: item[field], ...p }), {}));
    } else if (pick) {
      res = res.map(item => item[pick]);
    }
    if (mapper) {
      res = res.map(item => mapper(item));
    }
    return res;
  };

export const queryOne = <T, S extends any[]>(paramsHandler: (...args: S) => IQueryParams<T>) => {
  const res = queryAll<T, S>(paramsHandler);
  return async (...args: S): Promise<T | null> => {
    const resArr = await res(...args);
    return resArr.length ? resArr[0] : null;
  };
};
