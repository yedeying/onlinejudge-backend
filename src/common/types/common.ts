import { ErrorCode, StatusCode } from '$constants';

export type UUID = string;

export interface IExecuteRes {
  fieldCount: number;
  affectedRows: number;
  insertId?: number;
  warningCount: number;
  message: string;
  changedRows: number;
}

export interface IInsertRes extends IExecuteRes, IInsertParams {}

export interface IInsertParams {
  table: string;
  data: { [key: string]: string | number };
}

export interface IQueryParams<T> {
  // the sql for query with ?
  sql: string;
  // the params for sql that matchs ?
  params?: (string | number)[];
  // pick fields from result set
  fields?: string[];
  // pick one fields as variable from result set
  pick?: string;
  // transfer rows
  mapper?: (item: any) => T;
}

interface DebugInfo {
  sql?: string;
}

export interface ErrorOption {
  code: ErrorCode;
  statusCode: StatusCode;
  extra?: DebugInfo;
}

export type ReqBody = { [s: string]: any } | null | undefined;
