import KoaError, { ErrorOption } from './error';

const validateError: ErrorOption = {
  code: 1,
  statusCode: 422
};

export const assert = (check: boolean | boolean[], msg: string, option: Partial<ErrorOption> = validateError) => {
  if (Array.isArray(check)) {
    check = check.every(subCheck => subCheck);
  }
  if (!check) {
    throw new KoaError(msg, option);
  }
};

export default class Validator {
  pageId(pageId: string) {
    assert(typeof pageId === 'string', 'expect pageId to be a string');
  }
}
