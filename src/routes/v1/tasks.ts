import express from 'express'
import validate from '@middleware/validate'
import authSession from '@middleware/authSession'
import taskValidation from '@validations/task'
import taskController from '@controllers/task'

const router = express.Router()

router
  .route('/')
  .post(authSession, validate(taskValidation.create()), taskController.create)

router
  .route('/:id')
  .patch(authSession, validate(taskValidation.edit()), taskController.edit)
  .delete(authSession, validate(taskValidation.delete()), taskController.delete)

module.exports = router
