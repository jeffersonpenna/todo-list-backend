import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => res.json({ status: 'green2' }))

module.exports = router
