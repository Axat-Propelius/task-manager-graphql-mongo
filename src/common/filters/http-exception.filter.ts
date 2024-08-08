import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);
    const error = {
      statusCode: exception.getStatus(),
      message: (exception.getResponse() as string) || 'Internal server error',
    };

    // Log the error details
    console.error('GraphQL Exception:', error);

    // Return a GraphQL-friendly error format
    return error;
  }
}
