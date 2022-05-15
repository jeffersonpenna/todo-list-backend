import { NextFunction, Request, Response } from 'express'

import AppError from '@config/appError'

function interceptAsyncError (err: Error, request: Request, response: Response, next: NextFunction) : Response<JSON> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err}`
  })
}

export default interceptAsyncError
