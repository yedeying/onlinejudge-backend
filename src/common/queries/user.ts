import { queryOne, insert } from './utils';
import { tables } from '$config/db';
import { IUser, IRegisterInfo } from '$types';
import uuid from 'uuid/v4';

export const fetchUserByName = queryOne<IUser, [string]>(username => ({
  sql: 'select * from ?? where username = ?',
  params: [tables.user, username]
}));

export const fetchUserById = queryOne<IUser, [string]>(id => ({
  sql: 'select * from ?? where id = ?',
  params: [tables.user, id]
}));

export const addUser = insert(({
  username,
  password,
  email,
  salt
}: IRegisterInfo) => ({
  table: tables.user,
  data: {
    id: uuid(),
    username,
    password,
    email: email || '',
    salt
  }
}));
