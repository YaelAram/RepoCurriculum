const HttpCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

type HttpCode = (typeof HttpCodes)[keyof typeof HttpCodes];

export class CustomHttpError extends Error {
  constructor(
    public readonly httpCode: HttpCode,
    public readonly message: string,
    public readonly payload?: any,
  ) {
    super(message);
  }

  getJson() {
    return { error: this.message, issues: this.payload };
  }

  static BadRequest(message: string, payload?: any) {
    return new CustomHttpError(HttpCodes.BAD_REQUEST, message, payload);
  }

  static Unauthorized(message: string, payload?: any) {
    return new CustomHttpError(HttpCodes.UNAUTHORIZED, message, payload);
  }

  static Forbidden(message: string, payload?: any) {
    return new CustomHttpError(HttpCodes.FORBIDDEN, message, payload);
  }

  static NotFound(message: string, payload?: any) {
    return new CustomHttpError(HttpCodes.NOT_FOUND, message, payload);
  }

  static ServerError(message: string, payload?: any) {
    return new CustomHttpError(HttpCodes.SERVER_ERROR, message, payload);
  }
}
