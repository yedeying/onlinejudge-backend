import * as fs from 'fs';
import * as path from 'path';

const db = {
  host: '127.0.0.1',
  user: 'root',
  password: 'yedeying',
  database: 'newoj'
};

const extraDbPath = path.resolve('__dirname', '../runtime/db.json');
if (fs.existsSync(extraDbPath)) {
  const extra = fs.readFileSync(extraDbPath, { encoding: 'utf8' });
  try {
    const extraConfig = JSON.parse(extra);
    Object.assign(db, extraConfig);
  } catch (e) {
    // pass
  }
}

export const tables = {
  problem: 'problem',
  user: 'user',
  status: 'status'
};

export default db;
