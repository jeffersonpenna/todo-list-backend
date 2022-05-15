import bcrypt from 'bcryptjs'

import { IUsersRepository } from '@repositories/IUsersRepositories'
import Messages from '@constants/messages'
import AppError from '@config/appError'
import { User } from '@models/User'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

class UserCreateService {
  constructor (private usersRepository: IUsersRepository) {}

  public exec = async ({
    firstName,
    lastName,
    email,
    password
  }: IUser): Promise<User> => {
    const userByEmail = await this.usersRepository.findByEmail(email)

    if (userByEmail) throw new AppError(Messages.USER_VALIDATE_DUPLICATED_EMAIL, 409)

    password = await this.createPasswordHash(password)

    const userToCreate = User.create({
      firstName,
      lastName,
      email,
      password
    })

    const user = await this.usersRepository.create(userToCreate)
    return user
  }

  private async createPasswordHash (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
}

export { UserCreateService }
