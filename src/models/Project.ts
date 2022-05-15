class Project {
  id?: string
  name: string
  userId: string

  private constructor ({
    name,
    userId

  }: Project) {
    return Object.assign(this, {
      name,
      userId
    })
  }

  static create ({
    name,
    userId
  }: Project) {
    const project = new Project({
      name,
      userId
    })
    return project
  }
}

export { Project }
