import express from 'express'
import validate from '@middleware/validate'
import userValidation from '@validations/user'
import userController from '@controllers/user'

const router = express.Router()

router
  .route('/')
  .post(validate(userValidation.create()), userController.create)

module.exports = router
