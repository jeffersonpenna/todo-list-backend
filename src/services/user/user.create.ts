import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import messages from '../../constants/messages'
import AppError from '../../errors/appError'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

class UserCreateService {
  public exec = async (userToCreate: IUser): Promise<Boolean> => {
    const prisma = new PrismaClient()
    const userByEmail: User | null = await prisma.user.findUnique({
      where: {
        email: userToCreate.email
      }
    })

    if (userByEmail) throw new AppError(messages.USER_VALIDATE_DUPLICATED_EMAIL, 409)

    userToCreate.password = await this.createPasswordHash(userToCreate.password)

    const user: User = await prisma.user.create({
      data: userToCreate
    })

    return user
  }

  private async createPasswordHash (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
}

export default new UserCreateService()
