// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   NotFoundException,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(NotFoundException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: NotFoundException, host: ArgumentsHost) {
//     const context = host.switchToHttp();
//     const response = context.getResponse<Response>();
//     const request = context.getRequest<Request>();
//     const status = exception.getStatus();

//     response.status = status; // Fix the error by setting the status code directly on the response object

//     response.json({
//       statusCode: status,
//       time: new Date().toISOString(),
//     });
//   }
// }