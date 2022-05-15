import express from 'express'
const healthcheckRoutes = require('./healthcheck')
const usersRoutes = require('./users')
const authRoutes = require('./auth')
const projecsRoutes = require('./projects')
const tasksRoutes = require('./tasks')

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
  },
  {
    path: '/projects',
    route: projecsRoutes
  },
  {
    path: '/tasks',
    route: tasksRoutes
  }
]

defaultRoutes.map((route) => router.use(route.path, route.route))

module.exports = router
