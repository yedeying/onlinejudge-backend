import { createPool, format, MysqlError } from 'mysql';
import dbConfig from '$config/db';
import { IExecuteRes, ErrorOption } from '$types';
import KoaError from './error';
import { ErrorCode, StatusCode } from '$constants';

const pool = createPool({
  ...dbConfig,
  connectionLimit: 20
});

export const query = (sql: string, values?: any): Promise<any[] | IExecuteRes> => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    const handleError = (err: MysqlError, sql?: string) => {
      const errorOption: ErrorOption = {
        code: ErrorCode.SERVER_ERROR,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR
      };
      if (sql) {
        errorOption.extra = { sql };
      }
      connection && connection.release();
      reject(new KoaError(err.message, errorOption));
    };

    if (err) {
      handleError(err);
      return;
    }
    connection.query(sql, values, (err, results) => {
      if (err) {
        const parsedSql = format(sql, values);
        handleError(err, parsedSql || sql);
        return;
      }
      results && sql && Object.defineProperty(results, 'sql', {
        value: sql,
        enumerable: false,
        configurable: false,
        writable: false
      });
      connection && connection.release();
      resolve(results);
    });
  });
});

export default query;
