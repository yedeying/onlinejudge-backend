import { createPool, MysqlError } from 'mysql';
import dbConfig from '../config/db';

const pool = createPool({
  ...dbConfig,
  connectionLimit: 20
});

export const query = (sql: string, values?: any): Promise<any[]> => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    const handleError = (err: MysqlError | null | undefined, sql?: string) => {
      if (err) {
        if (sql) {
          Object.defineProperty(err, 'sql', {
            value: sql,
            enumerable: false,
            configurable: false,
            writable: false
          });
        }
        connection && connection.release();
        reject(err);
      }
    };

    handleError(err);
    const query = connection.query(sql, values, (err, results) => {
      handleError(err, query.sql);
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
