import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Messages from '@constants/messages'
import AppError from '@config/appError'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { User } from '@models/User'

const JWT_SECRET = process.env.JWT_SECRET

interface IAuth {
  email: string
  password: string
}

interface IAuthResponse {
  token: string
}

class AuthLoginService {
  constructor (private usersRepository: IUsersRepository) {}

  public exec = async (userCredentials: IAuth): Promise<IAuthResponse> => {
    const userByEmail = await this.usersRepository.findByEmail(userCredentials.email)

    if (!userByEmail) throw new AppError(Messages.AUTH_INVALID_CREDENTIALS, 401)

    const isValidPassword = await bcrypt.compare(userCredentials.password, userByEmail.password)

    if (!isValidPassword) throw new AppError(Messages.AUTH_INVALID_CREDENTIALS, 401)

    const token = this.generateAuthToken(userByEmail)

    return { token }
  }

  private generateAuthToken (user: User): string {
    console.log(JWT_SECRET, '-----------------------')

    const payload = {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`
    }

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: 60 * 60
    })

    return token
  }
}

export { AuthLoginService }
