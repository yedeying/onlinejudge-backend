import { query } from '$lib/db';
import KoaError from '$lib/error';
import { IInsertRes, IInsertParams, IQueryParams, IExecuteRes } from '$types';
import { ErrorCode, StatusCode, EMPTY_RESULT } from '$constants';

export const queryAll = <T, S extends any[]=[]>(
  paramsHandler: (...args: S) => IQueryParams<T> | typeof EMPTY_RESULT | Promise<IQueryParams<T> | typeof EMPTY_RESULT>
) => {
  return async (...args: S): Promise<T[]> => {
    const config = await paramsHandler(...args);
    if (config === EMPTY_RESULT) {
      return [];
    }
    const { sql, params = [], fields, pick, mapper } = config;
    let parsedSql = sql;
    if (fields && sql.includes('{fields}')) {
      parsedSql = sql.replace('{fields}', fields.join(', '));
    }
    let res: any[] = [];
    try {
      res = await query(parsedSql, params) as any[];
    } catch (e) {
      throw new KoaError(e.message || 'server error', {
        ...e.options,
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
};

export const queryOne = <T, S extends any[]>(
  paramsHandler: (...args: S) => IQueryParams<T> | typeof EMPTY_RESULT | Promise<IQueryParams<T> | typeof EMPTY_RESULT>
) => {
  const res = queryAll<T, S>(paramsHandler);
  return async (...args: S): Promise<T | null> => {
    const resArr = await res(...args);
    return resArr.length ? resArr[0] : null;
  };
};

export const insert = <S extends any[]>(paramsHandler: (...args: S) => IInsertParams) => {
  return async (...args: S): Promise<IInsertRes> => {
    const { table, data } = paramsHandler(...args);
    const keys = Object.keys(data);
    const sql = `insert into ?? set ` + keys.map(key => `${key} = ?`).join(', ');
    const params = [table, ...keys.map(key => data[key])];
    const res = await query(sql, params) as IExecuteRes;
    return {
      ...res,
      table,
      data
    };
  };
};
