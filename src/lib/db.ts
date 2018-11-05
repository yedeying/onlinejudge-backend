import { createConnection } from 'mysql';
import dbConfig from '../config/db';

export interface DbInstance {
  query: (sql: string, values?: any) => Promise<any[]>;
  end: () => void;
}

export const initDb = (): DbInstance => {
  const connection = createConnection(dbConfig);
  connection.connect();
  return {
    query: (sql: string, values?: any) => new Promise((resolve, reject) => {
      const query = connection.query(sql, values, (err, results) => {
        const sql = query.sql;
        if (err) {
          if (sql) {
            err.sql = sql;
          }
          reject(err);
        }
        results && sql && Object.defineProperty(results, 'sql', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: sql
        });
        resolve(results);
      });
    }),
    end: () => connection.end()
  };
};

export default initDb;
