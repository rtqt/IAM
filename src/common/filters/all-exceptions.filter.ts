import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    } else if (exception && (exception as any).code === 'P2002') {
      httpStatus = HttpStatus.CONFLICT;
    } else if (exception && (exception as any).code === 'P2025') {
      httpStatus = HttpStatus.NOT_FOUND;
    }

    let errorResponse: string | object = 'Internal server error';
    
    if (exception instanceof HttpException) {
      errorResponse = exception.getResponse();
    } else if (exception && (exception as any).code === 'P2002') {
      errorResponse = 'Unique constraint failed on the database';
    } else if (exception && (exception as any).code === 'P2025') {
      errorResponse = 'Record not found in the database';
    }

    const message =
      typeof errorResponse === 'string'
        ? [errorResponse]
        : (errorResponse as any).message || [errorResponse];

    let errorStr = 'Internal Server Error';
    if (exception instanceof HttpException) {
      errorStr = exception.name;
    } else if (exception && (exception as any).code) {
      errorStr = 'Prisma Client Error';
    }

    const responseBody = {
      statusCode: httpStatus,
      error: errorStr.replace('Exception', ''),
      message: Array.isArray(message) ? message : [message],
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
