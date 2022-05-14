import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

import interceptAsyncError from './middleware/interceptAsyncError'
const routes = require('./routes/v1')

const app = express()

app.use(express.json())

// v1 api routes
app.use('/v1', routes)

app.use(interceptAsyncError)

export { app }
