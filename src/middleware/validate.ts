import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import AppError from 'src/errors/appError'
import pick from '../utils/pick'

interface IValidation {
  params?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
  body?: Joi.ObjectSchema
}

const validate = (schema: IValidation) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')
    throw new AppError(errorMessage, 400)
  }

  Object.assign(req, value)
  return next()
}

export default validate
