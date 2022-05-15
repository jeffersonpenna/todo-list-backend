import { Request, Response } from 'express'
import { AuthLoginService } from '@services/auth/auth.login'
import { PrismaUsersRepository } from '@repositories/prisma/PrismaUsersRepository'

class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    const UsersRepository = new PrismaUsersRepository()
    const { email, password } = req.body

    const authLoginService = new AuthLoginService(UsersRepository)
    const result = await authLoginService.exec({ email, password })

    res.status(200).json(result)
  }
}

export default new AuthController()
