import { Request, Response } from 'express'
import UserService from '@services/user/user.create'

class UserController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } = req.body

    await UserService.exec({ firstName, lastName, email, password })

    res.status(201).json()
  }

  public list = async (req: Request, res: Response): Promise<void> => {
    res.json({ fim: true })
  }
}

export default new UserController()
