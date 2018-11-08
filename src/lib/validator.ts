import KoaError from './error';
import { ErrorOption } from '../common/types';
import { ErrorCode, StatusCode } from '../common/constants';

const validateError: ErrorOption = {
  code: ErrorCode.PARAMS_INVALID,
  statusCode: StatusCode.UNPROCESSABLE_ENTITY
};

export default class Validator {
  protected assert(check: boolean | boolean[], msg: string, option: Partial<ErrorOption> = validateError): true {
    if (Array.isArray(check)) {
      check = check.every(subCheck => subCheck);
    }
    if (!check) {
      throw new KoaError(msg, option);
    }
    return true;
  }
}
