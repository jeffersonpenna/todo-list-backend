import { User } from '@models/User'
import { UsersRepositoryInMemory } from '@repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { UserCreateService } from './user.create'

import Messages from '@constants/messages'
import AppError from '@config/appError'

describe('Create user', () => {
  let usersRepository: IUsersRepository
  let userCreateService: UserCreateService

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory()
    userCreateService = new UserCreateService(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const userData: User = {
      firstName: 'Jefferson',
      lastName: 'Penna',
      email: 'penna.jefferson@gmail.com',
      password: 'Senha1234'
    }

    const user = await userCreateService.exec(userData)

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('penna.jefferson@gmail.com')
  })

  it('should not be able to create an existing user', async () => {
    const userData: User = {
      firstName: 'John',
      lastName: 'Wick',
      email: 'johnwick@gmail.com',
      password: 'Senha1234'
    }

    await userCreateService.exec(userData)

    await expect(userCreateService.exec(userData)).rejects.toEqual(
      new AppError(Messages.USER_VALIDATE_DUPLICATED_EMAIL, 409)
    )
  })
})
