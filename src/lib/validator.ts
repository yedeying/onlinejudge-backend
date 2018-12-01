import KoaError from './error';
import { ErrorOption } from '$types';
import { ErrorCode, StatusCode } from '$constants';

const validateError: ErrorOption = {
  code: ErrorCode.PARAMS_INVALID,
  statusCode: StatusCode.UNPROCESSABLE_ENTITY
};

export default class Validator {
  assert(check: boolean | boolean[], msg: string, option: Partial<ErrorOption> = validateError): true {
    if (Array.isArray(check)) {
      check = check.every(subCheck => subCheck);
    }
    if (!check) {
      throw new KoaError(msg, option);
    }
    return true;
  }
}
