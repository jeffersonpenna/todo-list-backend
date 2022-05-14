import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

import interceptAsyncError from './middleware/interceptAsyncError'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ teste: 'teste' })
})

app.use(interceptAsyncError)

export { app }
