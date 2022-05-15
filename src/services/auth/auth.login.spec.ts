import { User } from '@models/User'
import { UsersRepositoryInMemory } from '@repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@repositories/IUsersRepositories'
import { AuthLoginService } from './auth.login'
import { UserCreateService } from '../user/user.create'

import Messages from '@constants/messages'
import AppError from '@config/appError'

describe('Create user', () => {
  let usersRepository: IUsersRepository
  let authLoginService: AuthLoginService
  let userCreateService: UserCreateService

  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory()
    userCreateService = new UserCreateService(usersRepository)
    authLoginService = new AuthLoginService(usersRepository)

    const userData: User = {
      firstName: 'Jefferson',
      lastName: 'Penna',
      email: 'penna.jefferson@gmail.com',
      password: 'Senha1234'
    }

    await userCreateService.exec(userData)
  })

  it('should be able to make a login', async () => {
    const loginCrdentials = {
      email: 'penna.jefferson@gmail.com',
      password: 'Senha1234'
    }
    const login = await authLoginService.exec(loginCrdentials)

    expect(login).toHaveProperty('token')
  })

  it('should not be able to login with invalid credentials', async () => {
    const loginCrdentials = {
      email: 'penna.jefferson@gmail.com',
      password: 'Senha12'
    }

    await expect(authLoginService.exec(loginCrdentials)).rejects.toEqual(
      new AppError(Messages.AUTH_INVALID_CREDENTIALS, 401)
    )
  })
})
