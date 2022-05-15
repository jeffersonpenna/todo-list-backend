import Joi from 'joi'

class UserValidation {
  public static create = () => {
    return {
      body: Joi.object().keys({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
      })
    }
  }
}

export default UserValidation
