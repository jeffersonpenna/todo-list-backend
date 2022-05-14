import express from 'express'
const healthcheckRoutes = require('./healthcheck')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/healthcheck',
    route: healthcheckRoutes
  }
]

defaultRoutes.map((route) => router.use(route.path, route.route))

module.exports = router
