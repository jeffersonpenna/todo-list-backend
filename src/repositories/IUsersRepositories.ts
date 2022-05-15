import { User } from '@models/User'

interface IUsersRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository }
