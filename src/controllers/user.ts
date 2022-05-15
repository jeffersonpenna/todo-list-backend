import { Request, Response } from 'express'

class UserController {
  public create = async (req: Request, res: Response): Promise<void> => {
    res.json({ fim: true })
  }

  public list = async (req: Request, res: Response): Promise<void> => {
    res.json({ fim: true })
  }
}

export default new UserController()
