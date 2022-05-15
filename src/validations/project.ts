import Joi from 'joi'

class ProjectValidation {
  public static create = () => {
    return {
      body: Joi.object().keys({
        name: Joi.string().min(3).required()
      })
    }
  }

  public static edit = () => {
    return {
      body: Joi.object().keys({
        name: Joi.string().min(3).required()
      }),
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    }
  }
}

export default ProjectValidation
