import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import messages from '../../constants/messages'
import AppError from '../../errors/appError'

const JWT_SECRET = process.env.JWT_SECRET

interface IAuth {
  email: string
  password: string
}

interface IAuthResponse {
  token: string
}

class AuthLoginService {
  public exec = async (userCredentials: IAuth): Promise<IAuthResponse> => {
    const prisma = new PrismaClient()
    const userByEmail: User | null = await prisma.user.findUnique({
      where: {
        email: userCredentials.email
      }
    })

    if (!userByEmail) throw new AppError(messages.AUTH_INVALID_CREDENTIALS, 401)

    const isValidPassword = await bcrypt.compare(userCredentials.password, userByEmail.password)

    if (!isValidPassword) throw new AppError(messages.AUTH_INVALID_CREDENTIALS, 401)

    const token = this.generateAuthToken(userByEmail)

    return { token }
  }

  private generateAuthToken (user: User): string {
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

export default new AuthLoginService()
