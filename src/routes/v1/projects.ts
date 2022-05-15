// Project Routes
// POST projects
// GET projects
// GET projects/:id
// PUT projects/:id
// DELETE projects/:id
// User Routes
// POST /users

import express from 'express'
import validate from 'src/middleware/validate'
import authSession from 'src/middleware/authSession'
import projectValidation from '../../validations/project'
import projectController from '@controllers/project'

const router = express.Router()

router
  .route('/')
  .post(authSession, validate(projectValidation.create()), projectController.create)
  .get(authSession, projectController.list)
  .put(authSession, validate(projectValidation.edit()), projectController.edit)

router
  .route('/:id')
  .put(authSession, validate(projectValidation.edit()), projectController.edit)
  .delete(authSession, validate(projectValidation.delete()), projectController.delete)

module.exports = router
