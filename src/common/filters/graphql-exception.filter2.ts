import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import {
  CheckViolationError,
  ConstraintViolationError,
  DataError,
  DBError,
  ForeignKeyViolationError,
  NotFoundError,
  NotNullViolationError,
  UniqueViolationError,
  ValidationError,
} from 'objection';

@Catch()
export class GraphqlExceptionFilter2 implements ExceptionFilter {
  private readonly logger = new Logger(GraphqlExceptionFilter2.name);

  catch(exception: any, host: any) {
    this.logger.error(exception.stack);

    const context = GqlExecutionContext.create(host);
    const { req } = context.getContext();

    // Determine the error message and code
    let errorMsg = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof ValidationError) {
      errorMsg = 'Validation error';
      errorCode = 'VALIDATION_ERROR';
    } else if (exception instanceof NotNullViolationError) {
      errorMsg = 'Not null violation error';
      errorCode = 'NOT_NULL_VIOLATION';
    } else if (exception instanceof UniqueViolationError) {
      errorMsg = 'Unique violation error';
      errorCode = 'UNIQUE_VIOLATION';
    } else if (exception instanceof ConstraintViolationError) {
      errorMsg = 'Constraint violation error';
      errorCode = 'CONSTRAINT_VIOLATION';
    } else if (exception instanceof DBError) {
      errorMsg = 'Database error';
      errorCode = 'DB_ERROR';
    } else if (exception instanceof DataError) {
      errorMsg = 'Data error';
      errorCode = 'DATA_ERROR';
    } else if (exception instanceof CheckViolationError) {
      errorMsg = 'Check violation error';
      errorCode = 'CHECK_VIOLATION';
    } else if (exception instanceof ForeignKeyViolationError) {
      errorMsg = 'Foreign key violation error';
      errorCode = 'FOREIGN_KEY_VIOLATION';
    } else if (exception instanceof NotFoundError) {
      errorMsg = 'Not found error';
      errorCode = 'NOT_FOUND';
    } else {
      errorMsg = 'Custom error';
      errorCode = 'INTERNAL_SERVER_ERROR';
    }
    // Throw an ApolloError to let Apollo Server handle the response
    throw new ApolloError(errorMsg, errorCode);
  }
}
