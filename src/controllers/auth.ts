import { Request, Response } from 'express'
import AuthService from '@services/auth/auth.login'

class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    const result = await AuthService.exec({ email, password })

    res.status(200).json(result)
  }
}

export default new AuthController()
