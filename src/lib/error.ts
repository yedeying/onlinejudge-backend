import { ErrorCode, StatusCode } from '$constants';
import { ErrorOption } from '$types';

export default class KoaError extends Error {
  public options: ErrorOption = { code: ErrorCode.PARAMS_INVALID, statusCode: StatusCode.OK };

  constructor(message: string, options?: Partial<ErrorOption>) {
    super(message);
    this.options = {
      ...this.options,
      ...options
    };
  }
}
