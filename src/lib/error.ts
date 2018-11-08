import { ErrorCode, StatusCode } from '../common/constants';
import { ErrorOption } from '../common/types';

export default class KoaError extends Error {
  public options: ErrorOption = { code: ErrorCode.PARAMS_INVALID, statusCode: StatusCode.OK };

  constructor(message: string, options: Partial<ErrorOption>) {
    super(message);
    this.options = {
      ...this.options,
      ...options
    };
  }
}
