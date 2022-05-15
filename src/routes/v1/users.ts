// User Routes
// POST /users

import express from 'express'
import validate from 'src/middleware/validate'
import userValidation from '../../validations/user'
import userController from '@controllers/user'

const router = express.Router()

router
  .route('/')
  .post(validate(userValidation.create()), userController.create)

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser)

module.exports = router
