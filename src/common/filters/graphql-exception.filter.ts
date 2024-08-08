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
export class GraphqlExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GraphqlExceptionFilter.name);

  catch(exception: any, host: any) {
    // this.logger.error(exception.stack);

    const context = GqlExecutionContext.create(host);
    const gqlContext = context.getContext();

    const isProduction = process.env.NODE_ENV === 'production';

    let errorMsg = isProduction ? 'Internal server error' : exception.message;
    console.log({ errorMsg });

    if (exception instanceof ValidationError) {
      switch (exception.type) {
        case 'ModelValidation':
        case 'RelationExpression':
        case 'UnallowedRelation':
        case 'InvalidGraph':
          errorMsg = isProduction ? 'Validation error' : exception.message;
          // gqlContext.response = {
          //   errors: [new ApolloError(errorMsg, 'VALIDATION_ERROR')],
          // };
          throw new ApolloError(errorMsg, 'VALIDATION_ERROR');
        default:
          errorMsg = isProduction
            ? 'Unknown validation error'
            : exception.message;
          // gqlContext.response = {
          //   errors: [new ApolloError(errorMsg, 'VALIDATION_ERROR')],
          // };
          throw new ApolloError(errorMsg, 'VALIDATION_ERROR');
      }
    } else if (exception instanceof NotNullViolationError) {
      errorMsg = isProduction ? 'Not null violation error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'NOT_NULL_VIOLATION')],
      // };
      throw new ApolloError(errorMsg, 'NOT_NULL_VIOLATION');
    } else if (exception instanceof UniqueViolationError) {
      errorMsg = isProduction ? 'Unique violation error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'UNIQUE_VIOLATION')],
      // };
      throw new ApolloError(errorMsg, 'UNIQUE_VIOLATION');
    } else if (exception instanceof ConstraintViolationError) {
      errorMsg = isProduction
        ? 'Constraint violation error'
        : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'CONSTRAINT_VIOLATION')],
      // };
      throw new ApolloError(errorMsg, 'CONSTRAINT_VIOLATION');
    } else if (exception instanceof DBError) {
      errorMsg = isProduction ? 'Database error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'DB_ERROR')],
      // };
      throw new ApolloError(errorMsg, 'DB_ERROR');
    } else if (exception instanceof DataError) {
      errorMsg = isProduction ? 'Data error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'DATA_ERROR')],
      // };
      throw new ApolloError(errorMsg, 'DATA_ERROR');
    } else if (exception instanceof CheckViolationError) {
      errorMsg = isProduction ? 'Check violation error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'CHECK_VIOLATION')],
      // };
      throw new ApolloError(errorMsg, 'CHECK_VIOLATION');
    } else if (exception instanceof ForeignKeyViolationError) {
      errorMsg = isProduction
        ? 'Foreign key violation error'
        : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'FOREIGN_KEY_VIOLATION')],
      // };
      throw new ApolloError(errorMsg, 'FOREIGN_KEY_VIOLATION');
    } else if (exception instanceof NotFoundError) {
      errorMsg = isProduction ? 'Not found error' : exception.message;
      // gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, 'NOT_FOUND')],
      // };
      throw new ApolloError(errorMsg, 'NOT_FOUND');
    } else {
      throw new ApolloError('errorMsg', 'Invalid operation');
      // console.error('GraphQL Exception 0:', gqlContext);
      // return (gqlContext.response = {
      //   errors: [new ApolloError(errorMsg, '402')],
      // });
    }
  }
}
