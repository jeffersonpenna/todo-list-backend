import express from 'express'
const healthcheckRoutes = require('./healthcheck')
const usersRoutes = require('./users')
const authRoutes = require('./auth')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/healthcheck',
    route: healthcheckRoutes
  },
  {
    path: '/users',
    route: usersRoutes
  },
  {
    path: '/auth',
    route: authRoutes
  }
]

defaultRoutes.map((route) => router.use(route.path, route.route))

module.exports = router
