import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
