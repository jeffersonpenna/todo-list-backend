import { Project } from '@models/Project'

class Task {
  id?: string
  name: string
  projectId: string
  project?: Project

  private constructor ({
    name,
    projectId
  }: Task) {
    return Object.assign(this, {
      name,
      projectId
    })
  }

  static create ({
    name,
    projectId
  }: Task) {
    const task = new Task({
      name,
      projectId
    })
    return task
  }
}

export { Task }
