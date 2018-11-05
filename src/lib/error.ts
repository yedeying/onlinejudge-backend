export interface ErrorOption {
  code: number;
  statusCode: number;
}

export default class KoaError extends Error {
  public options: ErrorOption = { code: 1, statusCode: 200 };

  constructor(message: string, options: Partial<ErrorOption>) {
    super(message);
    this.options = {
      ...this.options,
      ...options
    };
  }
}
