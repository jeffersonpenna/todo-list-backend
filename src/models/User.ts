class User {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string

  private constructor ({
    firstName,
    lastName,
    email,
    password
  }: User) {
    return Object.assign(this, {
      firstName,
      lastName,
      email,
      password
    })
  }

  static create ({
    firstName,
    lastName,
    email,
    password
  }: User) {
    const user = new User({
      firstName,
      lastName,
      email,
      password
    })
    return user
  }
}

export { User }
