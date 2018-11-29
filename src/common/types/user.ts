import { UUID } from './common';

export enum UserRole {
  normal = 'normal',
  admin = 'admin'
}

export interface IUserInfo {
  username: string;
  role: UserRole;
  createAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserInfo {
  id: UUID;
  password: string;
  salt: string;
}

export interface ILoginInfo {
  username: string;
  password: string;
  email?: string;
}
