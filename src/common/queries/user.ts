import { queryOne } from './utils';
import { tables } from '../../config/db';
import { IUser } from '../types';

export const fetchUserByName = queryOne<IUser, [string]>(username => ({
  sql: 'select * from ?? where username = ?',
  params: [tables.user, username]
}));

export const fetchUserById = queryOne<IUser, [string]>(id => ({
  sql: 'select * from ?? where id = ?',
  params: [tables.user, id]
}));
