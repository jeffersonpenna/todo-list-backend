import Joi from 'joi'

class ProjectValidation {
  public static create = () => {
    return {
      body: Joi.object().keys({
        name: Joi.string().min(3).required()
      })
    }
  }
}

export default ProjectValidation
