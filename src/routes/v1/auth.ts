import express from 'express'
import validate from '@middleware/validate'
import authValidation from '@validations/auth'
import authController from '@controllers/auth'

const router = express.Router()

router
  .route('/')
  .post(validate(authValidation.login()), authController.login)

module.exports = router
