import Joi from 'joi'

class TaskValidation {
  public static create = () => {
    return {
      body: Joi.object().keys({
        name: Joi.string().min(3).required(),
        projectId: Joi.string().required()
      })
    }
  }

  public static edit = () => {
    return {
      body: Joi.object().keys({
        isDone: Joi.boolean().required()
      }),
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    }
  }

  public static delete = () => {
    return {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    }
  }
}

export default TaskValidation
