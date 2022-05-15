import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import AppError from '../errors/appError'
import Messages from '../constants/messages'

const JWT_SECRET = process.env.JWT_SECRET

function authSession (req: Request, res: Response, next: NextFunction) : void {
  const token = getTokenFromHeader(req)

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    res.locals.token = decoded
    next()
  } catch (error) {
    throw new AppError(Messages.AUTH_INVALID_TOKEN, 401)
  }
}

function getTokenFromHeader (req: Request) : string {
  const { authorization } = req.headers
  return authorization ? authorization.split(/(\s+)/)[2] : ''
}

export default authSession
