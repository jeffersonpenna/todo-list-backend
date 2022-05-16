import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import 'dotenv/config'

import interceptAsyncError from './middleware/interceptAsyncError'

const routes = require('./routes/v1')

const app = express()

app.use(express.json())

const allowlist = ['http://localhost:3001']
const corsOptionsDelegate = function (req, callback) {
  const corsOptions = {
    methods: 'GET,PUT,PATCH,POST,DELETE',
    origin: false
  }

  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))

app.use('/api/v1', routes)

app.use(interceptAsyncError)

export { app }
