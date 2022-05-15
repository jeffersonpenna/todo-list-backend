import Joi from 'joi'

class UsersValidation {
  public static login = () => {
    return {
      body: Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
      })
    }
  }
}

export default UsersValidation
