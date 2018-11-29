import { ErrorCode, StatusCode } from '$constants';

export type UUID = string;

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

export interface ErrorOption {
  code: ErrorCode;
  statusCode: StatusCode;
}

export type ReqBody = { [s: string]: any } | null | undefined;
