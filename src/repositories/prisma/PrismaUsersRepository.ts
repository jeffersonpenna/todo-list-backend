import { prisma } from '@config/database'
import { User } from '@models/User'
import { IUsersRepository } from '../IUsersRepositories'

class PrismaUsersRepository implements IUsersRepository {
  async findByEmail (email: string): Promise<User|null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create ({
    firstName,
    lastName,
    email,
    password
  }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password
      }
    })

    return user
  }
}

export { PrismaUsersRepository }
