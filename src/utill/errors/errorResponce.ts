export class ErrorResponse {
  public readonly status = "error";

  constructor(
    public message: string,
    public code: number,
    public description?: string
  ) {}


  static voidError(message?: string, code?: number, description?: string) {
    return new ErrorResponse(
      message ?? "Unexpected error",
      code ?? 422,
      description ?? "Unexpected error in the cloud function"
    );
  }


}
