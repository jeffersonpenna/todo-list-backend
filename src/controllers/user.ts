import { Request, Response } from 'express'
import { UserCreateService } from '@services/user/user.create'
import { PrismaUsersRepository } from '@repositories/prisma/PrismaUsersRepository'

class UserController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const UsersRepository = new PrismaUsersRepository()

    const { firstName, lastName, email, password } = req.body

    const userCreateService = new UserCreateService(UsersRepository)
    await userCreateService.exec({ firstName, lastName, email, password })

    res.status(201).json()
  }
}

export default new UserController()
