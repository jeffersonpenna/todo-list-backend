
import express from 'express'
import validate from '@middleware/validate'
import authSession from '@middleware/authSession'
import projectValidation from '@validations/project'
import projectController from '@controllers/project'

const router = express.Router()

router
  .route('/')
  .post(authSession, validate(projectValidation.create()), projectController.create)
  .get(authSession, projectController.list)

router
  .route('/:id')
  .put(authSession, validate(projectValidation.edit()), projectController.edit)
  .delete(authSession, validate(projectValidation.delete()), projectController.delete)

module.exports = router
