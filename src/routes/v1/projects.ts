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

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser)

module.exports = router
