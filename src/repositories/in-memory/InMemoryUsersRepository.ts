import { User } from '@models/User'
import { IUsersRepository } from '../IUsersRepositories'
import { v4 as uuid } from 'uuid'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create (user: User): Promise<User> {
    Object.assign(user, {
      id: uuid()
    })

    this.users.push(user)
    return user
  }

  async findByEmail (email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

export { UsersRepositoryInMemory }
