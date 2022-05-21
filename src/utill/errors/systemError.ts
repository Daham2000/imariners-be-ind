import { ErrorResponse } from "./errorResponce";

export class SystemError extends Error {
  constructor(private msg: string) {
    super(msg);
    Object.setPrototypeOf(this, SystemError.prototype);
  }

  get error(): ErrorResponse {
    return ErrorResponse.voidError(this.msg);
  }
}
